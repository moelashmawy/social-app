import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pictures: { type: Array },
    role: { type: String, required: true },
    friends: { type: [Schema.Types.ObjectId], ref: "User" },
    chats: { type: [Schema.Types.ObjectId], ref: "Chat" }
  },
  { timestamps: true }
);

const NewUser = mongoose.model("NewUser", UserSchema);
export default NewUser;
