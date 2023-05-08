const nodemailer = require("nodemailer");
require('dotenv').config();

// mail transporter using domain mail
var domainTransporter = nodemailer.createTransport({
  service: "smtp",
  host: "citynect.in",
  port: 465,
  auth: {
    user: "info@citynect.in",
    pass: "]mO=1w92gTJm",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// mail transporter using gmail
var gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  host: "host",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
  },
})

var sendCustomEmailService = (mailOptions, callBack) => {
  gmailTransporter.sendMail(mailOptions, (err, res) => {
    // Error while sending mail
    if(err) {
      console.log("ERROR WHILE SENDING EMAIL");
      console.log(err);
    }
    else {
      console.log("Email sent successfully to : ", mailOptions.to);
    }
  })
}

module.exports = sendCustomEmailService;