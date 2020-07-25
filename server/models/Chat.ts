import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    users: { type: [Schema.Types.ObjectId], ref: "User" },
    messages: { type: [Schema.Types.ObjectId], ref: "Message" }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
