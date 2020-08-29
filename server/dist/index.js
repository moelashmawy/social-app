"use strict";
exports.__esModule = true;
var graphql_yoga_1 = require("graphql-yoga");
var db_1 = require("./db");
var typeDefs_1 = require("./schema/typeDefs");
var resolvers_1 = require("./schema/resolvers");
var path_1 = require("path");
var express_1 = require("express");
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
// serve static assets if in production (heroku configuration)
if (process.env.NODE_ENV !== "production")
    require("dotenv").config();
if (process.env.NODE_ENV == "production") {
    // set static folder
    server.express.use(express_1["default"].static(path_1["default"].join(__dirname, "client", "build")));
    server.get("*", function (req, res) {
        res.sendFile(path_1["default"].join(__dirname, "client", "build", "index.html"));
    });
}
// Server connection options
var options = {
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
server.start(options, function () {
    console.log("Server is running on http://localhost:5000");
});
