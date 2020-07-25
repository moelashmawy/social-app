import db from "./../dummy";

const userResolver = {
  Query: {
    users: () => db.users,
    user: (parent: any, args: { id: string }) =>
      db.users.find(user => user.id === args.id)
  }
};

export default userResolver;
