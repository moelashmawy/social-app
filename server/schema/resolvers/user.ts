import db from "./../dummy";
import NewUser from "./../../models/User";

const userResolver = {
  Query: {
    users: () => NewUser.find(),
    userInfo: (parent: any, { id }) => {
      return NewUser.findById(id);
    }
  },
  User: {
    messages: (parent: any) => db.messages.filter(message => message.user === parent.id)
  },
  Mutation: {
    signUp: (parent: any, { userName, email, password, firstName, lastName, role }) => {
      const newUser = new NewUser({
        userName,
        email,
        password,
        firstName,
        lastName,
        role
      });

      return newUser.save();
    }
  }
};

export default userResolver;
