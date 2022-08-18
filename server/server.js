const app = require("./app");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

//Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Server shutting down due to uncaught exception");
  process.exit(1);
});

//Setting up config file
dotenv.config({ path: 'server/.env'});

//Connecting to database
mongoose.connect(process.env.DB_LOCAL_URI).then((con) => {
  console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT}`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.error("Server shutting down due to Unhandled Promise Rejection");
  server.close(() => process.exit(1));
});
