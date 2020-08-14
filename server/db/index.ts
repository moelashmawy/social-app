import * as mongoose from "mongoose";

const db = mongoose.connection;

export const connectDb = () => {
  // Database configuration
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  db.on("error", console.error.bind(console, "error: unable to connect to database"));
  db.once("open", function () {
    console.log("Conncted to database successfully...");
  });
};

export const disconnectDb = () => {
  if (!db) {
    return;
  }

  mongoose.disconnect();
};
