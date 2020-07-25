import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    users: { type: [Schema.Types.ObjectId], ref: "User" },
    body: { type: String, required: true }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
