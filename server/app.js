const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Importing routes
app.use("/api/v1", require("./routes/event"));
app.use("/api/v1", require("./routes/user"));

module.exports = app;