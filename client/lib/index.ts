const users = [
  { id: "1", name: "momo", email: "momo@yahoo" },
  { id: "2", name: "lolo", email: "lolo@yahoo" },
  { id: "3", name: "koko", email: "koko@yahoo" }
];

export default {
  users,
  messages: [
    { id: "1", body: "message 1", user: "1" },
    { id: "2", body: "message 2", user: "2" },
    { id: "3", body: "message 3", user: "3" },
    { id: "4", body: "message 4", user: "1" },
    { id: "5", body: "message 5", user: "2" },
    { id: "6", body: "message 6", user: "3" },
    { id: "7", body: "message 7", user: "1" }
  ]
};

export function getAllUsersId() {
  return users.map(user => {
    return {
      params: { id: user.id }
    };
  });
}

export function getUserData(id: string) {
  const user = users.find(user => user.id == id);

  return { user };
}
