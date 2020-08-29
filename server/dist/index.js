"use strict";
exports.__esModule = true;
var graphql_yoga_1 = require("graphql-yoga");
var db_1 = require("./db");
var typeDefs_1 = require("./schema/typeDefs");
var resolvers_1 = require("./schema/resolvers");
// require .env conf
require("dotenv").config();
// Creating our graphQL server with the schema defined
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: typeDefs_1["default"],
    resolvers: resolvers_1["default"],
    context: function (_a) {
        var request = _a.request, response = _a.response;
        return {
            req: request,
            res: response,
            token: request.headers.token
        };
    }
});
// database connection
db_1.connectDb();
// Server connection options
var options = {
    port: process.env.PORT || 5000,
    endpoint: "/graphql",
    subscriptions: "/subscriptions",
    playground: "/graphql",
    cors: {
        credentials: true,
        origin: ["http://localhost:3000"] // your frontend url.
    }
};
// starting the server on port 5000
server.start(options, function () {
    console.log("Server is running on http://localhost:5000");
});
