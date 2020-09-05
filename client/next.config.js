const config = {
  target: "serverless",
  env: {
    apiEndpoint:
      "/graphql" || "http://localhost:5000/graphql" || "https://huhuhu.vercel.app/graphql"
  }
};

module.exports = config;
