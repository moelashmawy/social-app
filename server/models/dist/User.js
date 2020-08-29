"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var avatars_1 = require("./avatars");
var Schema = mongoose.Schema;
// our user schema
var UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pictures: { type: Array },
    avatarUrl: { type: String },
    role: { type: String, required: true },
    birthday: { type: String },
    friendsPending: { type: [Schema.Types.ObjectId], ref: "NewUser" },
    friends: { type: [Schema.Types.ObjectId], ref: "NewUser" },
    messages: { type: [Schema.Types.ObjectId], ref: "Message" },
    chats: { type: [Schema.Types.ObjectId], ref: "Chat" },
    gender: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    status: { type: String },
    speakLanguages: { type: Array, "default": [] },
    learnLanguages: { type: Array, "default": [] },
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
    hobbies: { type: Array, "default": [] },
    music: { type: Array, "default": [] },
    books: { type: Array, "default": [] },
    movies: { type: Array, "default": [] },
    tvShows: { type: Array, "default": [] }
}, { timestamps: true });
// encrypt the password before it's saved in the database
UserSchema.pre("save", function (next) {
    var user = this;
    if (!user.password) {
        next;
    }
    else {
        if (user.gender == "male") {
            var random = Math.floor(Math.random() * avatars_1.maleAvatars.length);
            var randomMaleAvatar = avatars_1.maleAvatars[random];
            user.avatarUrl = randomMaleAvatar;
        }
        else {
            var random = Math.floor(Math.random() * avatars_1.femaleAvatars.length);
            var randomFemaleAvatar = avatars_1.femaleAvatars[random];
            user.avatarUrl = randomFemaleAvatar;
        }
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                throw new Error(err);
            }
            else {
                bcrypt.hash(user.password, salt, function (err, hashed) {
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
var NewUser = mongoose.model("NewUser", UserSchema);
exports["default"] = NewUser;
