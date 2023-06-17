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
  const { name, email, message } = req.body;
  if (!email || !name || !message) {
    return res.status(400).json({ message: "Form is incomplete" });
  }
  const mailData = {
    from: email,
    to: "paolojulian.personal@gmail.com",
    subject: "Somebody wants to hire you!",
    text: message,
    html: `
    <div>
      <p style="font-weight:base; color: #475569">
        ${message}
      </p>
      <div class="stack"> 
        <h2 style="font-weight: medium; font-size: 1rem;">${name}</h2>
        <h4 style="font-weight: base; font-size: 0.8rem;">${email}</h4>
      </div>
    </div>
    <style>
    .stack {
      display: flex;
      flex-direction: column;
    }
    .stack > * + * {
      margin-top: 0;
    }
    </style>
    `,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: `Message delivered to ${info.accepted}` });
  });
});

module.exports = router;
