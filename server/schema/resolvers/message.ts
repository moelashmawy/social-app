import { userAuth } from "../../middlewares/auth";
import Chat from "../../models/Chat";
import Message from "../../models/Message";

const CHAT_CHANNEL = "CHAT_CHANNEL";

const messageResolver = {
  /**********  Mutations ************/
  Mutation: {
    // send message
    sendMessage: async (_, { text, user, chat }, { req, pubsub }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        const userId = req.user.userId;

        // 2- create new message
        const newMessage = new Message({ text: text, user: user, chat: chat });
        await newMessage.save();

        // 3- update the messages array with the new message id
        await Chat.findByIdAndUpdate(
          chat,
          { $push: { messages: newMessage._id } },
          { useFindAndModify: false }
        );

        // 4- get the current active chat the user send the message in
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

        // 5- publish the current chat send message subscription
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
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator(CHAT_CHANNEL);
      }
    }
  }
};

export default messageResolver;
