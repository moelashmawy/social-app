import { GraphQLServer, PubSub } from "graphql-yoga";
import { connectDb } from "./db/index";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import path = require("path");
require("dotenv").config();
const express = require("express");

const pubsub = new PubSub();

// Creating our graphQL server with the schema defined
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ request, response }) => {
    return {
      req: request,
      res: response,
      token: request?.headers?.token, //request?.headers ? request.headers.token : null,
      pubsub
    };
  }
});

// database connection
connectDb();

server.use("/static", express.static(path.join(__dirname, "static")));

if (process.env.NODE_ENV == "production") {
  // set static folder
  server.use(express.static(path.join(__dirname, "client", "build")));

  server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Server connection options
const options = {
  port: process.env.PORT || 5000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/graphql",
  cors: {
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:3000"]
        : ["https://social-app-morning.herokuapp.com"] // your frontend url.
  }
};

// starting the server on port 5000
server.start(options, () => {
  console.log(`Server is running on http://localhost:${options.port}`);
});
