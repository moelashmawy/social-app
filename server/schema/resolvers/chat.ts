import { userAuth } from "../../middlewares/auth";
import Chat from "../../models/Chat";
import Message from "../../models/Message";

const subscribers = [];
const onMessageUpdate = fn => subscribers.push(fn);

const chatResolver = {
  Query: {
    userChats: async (_, args, { req, res }) => {
      try {
        await userAuth(req);

        const userId = req.user.userId;

        const chats = await Chat.find({
          users: {
            $in: userId
          }
        })
          .populate({
            path: "users",
            model: "NewUser"
          })
          .populate({
            path: "messages",
            model: "Message",
            populate: {
              path: "user",
              model: "NewUser"
            }
          })
          .exec();

        return {
          ok: true,
          chats: chats
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  },
  Mutation: {
    //create new chat
    createNewChat: async (parent: any, { users }, { req, res }) => {
      try {
        userAuth(req);

        const newChat = await new Chat({ users: users }).save();

        return {
          ok: true,
          chat: newChat,
          successMessage: "Started new chat"
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },

    // send message
    sendMessage: async (parent: any, { text, user, chat }, { req, res }) => {
      try {
        // 1- authenticate user
        userAuth(req);

        //const { userId } = req.user;

        // 2- create new message
        const newMessage = new Message({ text: text, user: user, chat: chat });
        await newMessage.save();

        // 3- update the messages array with the new message id
        await Chat.findByIdAndUpdate(
          chat,
          { $push: { messages: newMessage._id } },
          { useFindAndModify: false }
        );

        subscribers.forEach(fn => fn());

        return {
          ok: true,
          successMessage: "Message sent"
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  },

  /** Subscription */
  Subscription: {
    userChats: async (parent, args, { pubsub, req, res }) => {
      await userAuth(req);

      const userId = req.user.userId;

      const chats = await Chat.find({
        users: {
          $in: userId
        }
      })
        .populate({
          path: "users",
          model: "NewUser"
        })
        .populate({
          path: "messages",
          model: "Message",
          populate: {
            path: "user",
            model: "NewUser"
          }
        })
        .exec();

      const channel = Math.random().toString(36).substring(2, 15); // random channel name

      onMessageUpdate(() => {
        pubsub.publish(channel, { chats });
      });

      setTimeout(() => {
        pubsub.publish(channel, { chats });
      }, 0);

      return pubsub.asyncIterator(channel);
    }
  }
};

export default chatResolver;
