const express = require('express');

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'password',
  },
  secure: true,
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();
const port = process.env.PORT || 5000;

route.post('/email', (req, res) => {
  const {name, email, text} = req.body;
  const mailData = {
    from: 'paolojulian.github.io@noreply',
    to: 'paolovincentarch@gmail.com',
    subject: 'Portfolio Email',
    text: 'Test'
  }

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: 'Mail sent!' })
  })
})

app.use('/v1', route);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
