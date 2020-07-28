import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import * as mongoose from "mongoose";

// Database configuration
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error: unable to connect to database"));
db.once("open", function () {
  console.log("Conncted to database successfully...");
});

// Creating our graphQL server with the schema defined
const server = new GraphQLServer(schema);

// Server connection options
const options = {
  port: 5000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/graphql"
};

// starting the server on port 5000
server.start(options, () => {
  console.log("Server is running on http://localhost:5000");
});
