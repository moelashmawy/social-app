import { GraphQLServer } from "graphql-yoga";
import { connectDb } from "./db";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import path from 'path'
import express from 'express'

// Creating our graphQL server with the schema defined
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ request, response }) => {
    return {
      req: request,
      res: response,
      token: request.headers.token
    };
  }
});

// database connection
connectDb();

// serve static assets if in production (heroku configuration)
if (process.env.NODE_ENV !== "production") require("dotenv").config();

if (process.env.NODE_ENV == "production") {
  // set static folder
  server.express.use(express.static(path.join(__dirname, "client", "build")));

  server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Server connection options
const options = {
  port: 5000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/graphql",
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"] // your frontend url.
  }
};

// starting the server on port 5000
server.start(options, () => {
  console.log("Server is running on http://localhost:5000");
});
