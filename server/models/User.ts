import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { maleAvatars, femaleAvatars } from "./avatars";

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  pictures: Array<string>;
  avatarUrl: string;
  role: string;
  birthday: string;
  friends: Array<any>;
  messages: Array<any>;
  chats: Array<any>;
  gender: string;
  country: string;
  city: string;
  status: string;
  speakLanguages: Array<string>;
  learnLanguages: Array<string>;
  education: string;
  job: string;
  relationship: string;
  contactInfo: Array<any>;
  aboutMe: string;
  hobbies: Array<string>;
  music: Array<string>;
  books: Array<string>;
  movies: Array<string>;
  tvShows: Array<string>;
}

// our user schema
const UserSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pictures: { type: Array },
    avatarUrl: { type: String },
    role: { type: String, required: true },
    birthday: { type: String },
    friends: { type: [Schema.Types.ObjectId], ref: "NewUser" },
    messages: { type: [Schema.Types.ObjectId], ref: "Message" },
    chats: { type: [Schema.Types.ObjectId], ref: "Chat" },
    gender: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    status: { type: String },
    speakLanguages: { type: Array, default: [] },
    learnLanguages: { type: Array, default: [] },
    education: { type: String },
    job: { type: String },
    relationship: { type: String },
    contactInfo: {
      skype: String,
      facebook: String,
      snapchat: String,
      instagram: String,
      website: String
    },
    aboutMe: { type: String },
    hobbies: { type: Array, default: [] },
    music: { type: Array, default: [] },
    books: { type: Array, default: [] },
    movies: { type: Array, default: [] },
    tvShows: { type: Array, default: [] }
  },
  { timestamps: true }
);

// encrypt the password before it's saved in the database
UserSchema.pre<IUser>("save", function (next: mongoose.HookNextFunction): void {
  const user: any = this;

  if (!user.password) {
    next;
  } else {
    if (user.gender == "male") {
      const random = Math.floor(Math.random() * maleAvatars.length);
      const randomMaleAvatar = maleAvatars[random];
      user.avatarUrl = randomMaleAvatar;
    } else {
      const random = Math.floor(Math.random() * femaleAvatars.length);
      const randomFemaleAvatar = femaleAvatars[random];
      user.avatarUrl = randomFemaleAvatar;
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
  }
});

const NewUser = mongoose.model<IUser>("NewUser", UserSchema);
export default NewUser;
