import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  //pictures: Array;
  role: string;
  //friends: Array;
  //chats: Array;
}

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

// encrypt the password before it's saved in the database
UserSchema.pre<IUser>("save", function (next: mongoose.HookNextFunction): void {
  const user: any = this;

  if (!user.password) {
    next;
  }

  bcrypt.genSalt(10, function (err: any, salt: string): void {
    if (err) {
      throw new Error(err);
    } else {
      bcrypt.hash(user.password, salt, function (err: any, hashed: string) {
        if (err) {
          return next(err);
        }
        user.password = hashed;
        next();
      });
    }
  });
});

const NewUser = mongoose.model<IUser>("NewUser", UserSchema);
export default NewUser;
