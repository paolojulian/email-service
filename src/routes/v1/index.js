"use strict";
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

router.post("/contact-me", (req, res) => {
  const { name, email, text } = req.body;
  const mailData = {
    to: "paolovincentarch@gmail.com",
    subject: `${name} - Portfolio contact`,
    text: `
        Name: ${name}
        Email: ${email}
        \n
        ${text}
    `,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail sent!" });
  });
});

module.exports = router;
