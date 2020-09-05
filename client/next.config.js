const config = {
  target: "serverless",
  env: {
    apiEndpoint: "/graphql" || "http://localhost:5000/graphql"
  }
};

module.exports = config;
