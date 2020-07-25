import { GraphQLServer } from "graphql-yoga";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

// Creating our graphQL server with the schema defined
const server = new GraphQLServer({ typeDefs, resolvers });

// starting the server on port 5000
server.start({ port: 5000 }, () => {
  console.log("Server is running on http://localhost:5000");
});
