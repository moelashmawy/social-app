import User from "./../../models/User";
import {
  signupvalidatation,
  updateProfileValidation
} from "./../../middlewares/validation/userValidation";
import { loginValidatation } from "./../../middlewares/validation/userValidation";
import * as jwt from "jsonwebtoken";
import { userAuth, adminAuth } from "../../middlewares/auth";
import { GraphQLError } from "graphql";

// handle image upload
let resultUrl = "";
const cloudinaryUpload = async ({ stream }) => {
  const cloudinary = require("cloudinary");
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.v2.uploader.upload_stream(function (error, result) {
        if (result) {
          resultUrl = result.secure_url;
          resolve(resultUrl);
        } else {
          reject(error);
        }
      });

      stream.pipe(streamLoad);
    });
  } catch (err) {
    throw new Error(`Failed to upload profile picture ! Err:${err.message}`);
  }
};

const processUpload = async (upload: any) => {
  const { createReadStream } = await upload;
  const stream = createReadStream();

  await cloudinaryUpload({ stream });
  return resultUrl;
};

const userResolver = {
  Query: {
    // current user query
    me: async (_: any, __: any, { req }) => {
      try {
        await userAuth(req);

        let myId = req.user.userId;

        let me = User.findById(myId)
          .populate({
            path: "friendsPending",
            model: "NewUser"
          })
          .populate({
            path: "bookmarks",
            model: "NewUser"
          })
          .exec();

        return {
          ok: true,
          user: me
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },

    // all users query
    users: async (_: any, __: any, { req }) => {
      try {
        await userAuth(req);

        let allUsers = await User.find()
          .populate({
            path: "friendsPending",
            model: "NewUser"
          })
          .populate({
            path: "friends",
            model: "NewUser"
          })
          .exec();

        return {
          ok: true,
          users: allUsers
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },

    // one user query
    userInfo: async (_: any, { userName }, { req }) => {
      try {
        //await userAuth(req);

        let user = await User.findOne({ userName: userName })
          .populate({
            path: "friendsPending",
            model: "NewUser"
          })
          .populate({
            path: "friends",
            model: "NewUser"
          })
          .exec();

        return {
          user: user,
          ok: true
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },

    // fetch friends requests
    friendRequests: async (_: any, args: any, { req }) => {
      try {
        await userAuth(req);

        const myId = req.user.userId;

        const user = await User.findOne({ userName: args.userName })
          .populate({
            path: "friendsPending",
            model: "NewUser"
          })
          .populate({
            path: "friends",
            model: "NewUser"
          })
          .exec();

        return {
          friends: user.friendsPending,
          ok: true
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  },

  /* User: {
    contactInfo: async (parent: any) => {
      let me = await User.findById(parent.id).exec();
      console.log(me);

      return me.contactInfo;
    }
  }, */

  Mutation: {
    //signup mutation
    signUp: async (_: any, args: any, context: any) => {
      try {
        // 1- validate input data
        await signupvalidatation.validate(args);

        // 2- create new user and save it in the DB
        const newUser = new User({
          userName: args.userName,
          email: args.email,
          password: args.password,
          verifyPassword: args.verifyPassword,
          firstName: args.firstName,
          lastName: args.lastName,
          role: "user",
          gender: args.gender,
          country: args.country
        });

        const user = newUser.save();

        // 3- sign a new token with the required data
        const token = jwt.sign(
          { userId: newUser.id, role: newUser.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1y"
          }
        );

        // 4- set a cookies with the token value and it's httpOnly
        context.res.cookie("token", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
          secure: true,
          domain: "huhuhu.vercel.app", //"localhost", //
          path: "/"
        });

        return { ok: true, user, successMessage: "Registered Successfully" };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },
    //******************************************
    //*********** login mutation ***************
    //******************************************
    login: async (_: any, args: any, context: any) => {
      try {
        //1- validate input data
        await loginValidatation.validate(args);

        // 2- find user
        const userName = args.userName;
        const user = await User.findOne({ userName: userName });

        if (!user) {
          return {
            ok: false,
            error: "no such user"
          };
        }

        // 3- sign a new token
        const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1y"
          }
        );

        // 4- set a cookies with the token value and it's httpOnly
        context.res.cookie("token", token, {
          expires: new Date(Date.now() + 18000000),
          httpOnly: true,
          secure: true,
          domain: "huhuhu.vercel.app", //"localhost", //
          path: "/"
        });

        return { ok: true, user, successMessage: "Logged in Successfully" };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },
    //logout Mutation
    logout: async (_: any, __: any, { res }) => {
      res.clearCookie("token", {
        domain: "huhuhu.vercel.app", //"localhost", //
        path: "/"
      });

      return {
        ok: true
      };
    },
    // Delete user mutation
    deleteUser: async (_: any, args: any, { req }) => {
      try {
        // 1- authenticate user
        await adminAuth(req);

        // 2- find user
        const id = args.id;
        await User.findByIdAndDelete(id);

        return {
          ok: true,
          successMessage: "Deleted Successfully"
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },
    // Delete user mutation
    uploadProfilePictures: async (_: any, { file }: any, { req }) => {
      try {
        // 1- Authenticate user
        await userAuth(req);

        let myId = req.user.userId;

        // 2- Get the uploaded pictures url, and update the user's pictures in the DB
        await Promise.all(file.map(processUpload)).then(res => {
          const newPics: any = res;

          User.findByIdAndUpdate(
            { _id: myId },
            { $push: { pictures: { $each: newPics } } },
            { useFindAndModify: false, upsert: true }
          ).exec();
        });

        return {
          ok: true,
          successMessage: "Pictures uploaded to your account"
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },
    // delete profile picture
    deleteProfilePicture: async (_: any, { name }, { req }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        let myId = req.user.userId;

        // 2- find pic and delete
        User.findByIdAndUpdate(
          { _id: myId },
          { $pull: { pictures: name } },
          { useFindAndModify: false, upsert: true }
        ).exec();

        return {
          ok: true,
          successMessage: "Picture was deleted"
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message
        };
      }
    },

    // choose profile picture
    chooseProfilePicture: async (_: any, { name }, { req }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        let myId = req.user.userId;

        // 2- find pic and delete
        User.findByIdAndUpdate(
          { _id: myId },
          { $set: { avatarUrl: name } },
          { useFindAndModify: false, upsert: true }
        ).exec();

        return {
          ok: true,
          successMessage: "Profile photo was updated"
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message
        };
      }
    },
    // update User info
    updateProfileInfo: async (_: any, args: any, { req }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        // 2- validate inputs
        await updateProfileValidation.validate(args);

        let myId = req.user.userId;

        // 3- find the user and update the given fields
        User.findByIdAndUpdate(
          { _id: myId },
          { $set: args },
          { useFindAndModify: false, upsert: true }
        ).exec();

        return {
          ok: true,
          successMessage: "Profile updated Successfully"
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },
    // add friend
    addFriend: async (_: any, { id }, { req }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        let myId = req.user.userId;

        //2- check if the 2 accounts are already friends
        const user = await User.findOne({ _id: myId }).exec();
        if (user?.friends.includes(id)) {
          throw new GraphQLError("You're already friends");
        }

        // if they aren't friends
        // 3- find the friend you wanna add and update its pending friends array
        await User.findByIdAndUpdate(
          { _id: id },
          { $push: { friendsPending: myId } },
          { useFindAndModify: false }
        ).exec();

        return {
          ok: true,
          successMessage: "Friends Request sent"
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },
    // accept friend request
    acceptFriend: async (_: any, { id }, { req }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        let myId = req.user.userId;

        // 2- find the friend you wanna add and update its pending friends array
        await User.findOneAndUpdate(
          { _id: myId },
          { $push: { friends: id }, $pull: { friendsPending: id } }
        ).exec();

        // 3- update my friends list
        await User.findOneAndUpdate({ _id: id }, { $push: { friends: myId } }).exec();

        return {
          ok: true,
          successMessage: "You're now friends"
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message
        };
      }
    },
    // delete friend
    deleteFriend: async (_: any, { id }, { req }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        let myId = req.user.userId;

        // 2- update my friends list
        await User.findOneAndUpdate({ _id: myId }, { $pull: { friends: id } }).exec();

        // 3- update the other friend friends list
        await User.findOneAndUpdate({ _id: id }, { $pull: { friends: myId } }).exec();

        return {
          ok: true,
          successMessage: "You're not friends anymore"
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message
        };
      }
    },
    // add bookmark
    addBookmark: async (_: any, { id }, { req }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        let myId = req.user.userId;

        // 2- check if the user already in bookmarks
        const user = await User.findOne({ _id: myId }).exec();
        if (user?.bookmarks.includes(id)) {
          throw new GraphQLError("Already in your bookmarks");
        }

        // 3- find the friend you wanna add and update its pending friends array
        await User.findByIdAndUpdate(
          { _id: myId },
          { $push: { bookmarks: id } },
          { useFindAndModify: false }
        ).exec();

        return {
          ok: true,
          successMessage: "Added to bookmarks",
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          successMessage: null
        };
      }
    },
    // delete bookmark
    deleteBookmark: async (_: any, { id }, { req }) => {
      try {
        // 1- authenticate user
        await userAuth(req);

        let myId = req.user.userId;

        // 3- find the friend you wanna add and update its pending friends array
        await User.findByIdAndUpdate(
          { _id: myId },
          { $pull: { bookmarks: id } },
          { useFindAndModify: false }
        ).exec();

        return {
          ok: true,
          successMessage: "Deleted from bookmarks",
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          successMessage: null
        };
      }
    }
  }
};

export default userResolver;
