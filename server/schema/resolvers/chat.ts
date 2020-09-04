import { userAuth } from "../../middlewares/auth";
import Chat from "../../models/Chat";
import Message from "../../models/Message";

const chatResolver = {
  Query: {
    userChats: async (_, __, { req }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        const userId = req.user.userId;

        // 2- get all chats that contain the user id
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

  /************** Mutations ****************/
  Mutation: {
    //create new chat
    createNewChat: async (_, { users }, { req }) => {
      try {
        // 1- authenticate user
        userAuth(req);

        //2- once the user clicks chat, it starts new chat netween the 2 users
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
    }
  }
};

export default chatResolver;
