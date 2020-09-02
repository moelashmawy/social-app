import { userAuth } from "../../middlewares/auth";
import Chat from "../../models/Chat";
import Message from "../../models/Message";

/* const subscribers = [];
const onMessagesUpdates = fn => subscribers.push(fn); */

const CHAT_CHANNEL = "CHAT_CHANNEL";

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
    sendMessage: async (parent: any, { text, user, chat }, { req, res, pubsub }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        console.log(req.user);

        const userId = req.user.userId;

        // 2- create new message
        const newMessage = new Message({ text: text, user: user, chat: chat });
        const mess = await newMessage.save();

        // 3- update the messages array with the new message id
        await Chat.findByIdAndUpdate(
          chat,
          { $push: { messages: newMessage._id } },
          { useFindAndModify: false }
        );

        const currentChat = await Chat.findById(chat)
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

        pubsub.publish(CHAT_CHANNEL, { userChats: { ok: true, chat: currentChat } });

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

  /************** Subscription ***********/
  Subscription: {
    userChats: {
      subscribe: (parent, args, { req, res, pubsub }) => {
        return pubsub.asyncIterator(CHAT_CHANNEL);
      }
    }
  }
};

export default chatResolver;
