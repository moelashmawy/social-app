const config = {
  target: "serverless",
  env: {
    apiEndpoint: process.env.API_ENDPOINT || "http://localhost:5000/graphql"
  }
};

module.exports = config;
