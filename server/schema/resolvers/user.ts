import db from "./../dummy";
import User from "./../../models/User";
import { signupvalidatation } from "./../../middlewares/validation/userValidation";
import { loginValidatation } from "./../../middlewares/validation/userValidation";
import { GraphQLError } from "graphql";
import * as jwt from "jsonwebtoken";
import { userAuth, adminAuth } from "../../middlewares/auth";

const userResolver = {
  Query: {
    me: async (_, __, { req, res }) => {
      try {
        await userAuth(req);

        let myId = req.user.userId;

        let me = User.findById(myId).exec();

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
    users: async (parent: any, { id }, { req, res }) => {
      try {
        await userAuth(req);

        return {
          ok: true,
          users: await User.find()
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    },
    userInfo: async (parent: any, { id }, { req, res }) => {
      try {
        await userAuth(req);
        return {
          user: await User.findById(id).exec(),
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
  User: {
    messages: (parent: any) => db.messages.filter(message => message.user === parent.id)
  },
  Mutation: {
    //signup mutation
    signUp: async (_, args: any) => {
      try {
        await signupvalidatation.validate(args);

        const newUser = new User({
          userName: args.userName,
          email: args.email,
          password: args.password,
          verifyPassword: args.verifyPassword,
          firstName: args.firstName,
          lastName: args.lastName,
          role: "user"
        });

        const user = newUser.save();

        const token = jwt.sign(
          { userId: newUser.id, role: newUser.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1y"
          }
        );
        return { ok: true, user, token };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
        //return new GraphQLError(error);
      }
    },
    // login mutation
    login: async (_parent: any, args: any, context: any, _info: any) => {
      try {
        //1- validate
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

        // sign a new token
        const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1y"
          }
        );

        //context.res.setHeader("Set-Cookie", `token=${token}`);
        context.res.cookie("token", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
          secure: true,
          domain: "localhost",
          path: "/"
        });

        //3
        return { ok: true, user, token };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
        //return new GraphQLError(error);
      }
    },
    //logout Mutation
    logout: async (_, __, { req, res }) => {
      res.clearCookie("token", {
        domain: "localhost",
        path: "/"
      });

      return {
        ok: true
      };
    },
    // Delete user mutation
    deleteUser: async (_, args, { req, res }) => {
      try {
        await adminAuth(req);

        // 2- find user
        const id = args.id;
        await User.findByIdAndDelete(id);

        return {
          ok: true
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

export default userResolver;
