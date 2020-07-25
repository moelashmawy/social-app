import db from "./../dummy";

const messageResolver = {
  Query: {
    messages: () => db.messages
  },
  Message: {
    user: (message: { user: string }) => db.users.find(user => user.id === message.user)
  }
};

export default messageResolver;
