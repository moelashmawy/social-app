import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "NewUser" },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
    text: { type: String, required: true }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
