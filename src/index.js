const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const serverless = require("serverless-http");
const app = express();
const route = express.Router();

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "youremail@gmail.com",
    pass: "password",
  },
  secure: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

route.post("/email", (req, res) => {
  const { name, email, text } = req.body;
  const mailData = {
    from: "paolojulian.github.io@noreply",
    to: "paolovincentarch@gmail.com",
    subject: "Portfolio Email",
    text: "Test",
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail sent!" });
  });
});

app.use("/v1", route);

module.exports = app;
module.exports.handler = serverless(app);
