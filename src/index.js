require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const app = express();
const router = require("./routes/v1/index");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/.netlify/functions/index", router);

module.exports = app;
module.exports.handler = serverless(app);
