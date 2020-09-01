import { userAuth } from "../../middlewares/auth";
import Chat from "../../models/Chat";
import Message from "../../models/Message";

const messageResolver = {
  /*  Query: {
    oneChatMessages: (_, { chatId }) => Message.find({ chat: chatId })
  }, */
  /* Message: {
    user: (paren: { user: string }) => db.users.find(user => user.id === paren.user)
  }  */
  /* Mutation: {
    sendMessage: async (parent: any, { text, user, chat }, { req, res }) => {
      try {
        // 1- authenticate user
        userAuth(req);

        const { userId } = req.user;

        if (!chat) {
          const newChat = new Chat();
          await newChat.save();

          const newMessage = new Message({ text: text, user: user, chat: newChat._id });
          await newMessage.save();
        }

        return {
          ok: true
        };
      } catch (error) {
        return {
          ok: false
        };
      }
    }
  } */
};

export default messageResolver;
