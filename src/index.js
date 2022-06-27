require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const app = express();
const router = require("./routes/v1/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', (req, res) => {
  res.send('Hello World!');
})
app.use("/v1", router);

module.exports = app;
module.exports.handler = serverless(app);
