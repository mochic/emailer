'use strict';
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// based off of: https://medium.com/@sgobinda007/send-email-from-your-node-js-application-by-using-mailgun-api-services-bbedc7c45c19
let mailerConfig;
if (process.env.NODE_ENV === 'production') {
  mailerConfig = mg({
    auth: {
      api_key: process.env.EMAILER_MAILGUN_API_KEY,
      domain: process.env.EMAILER_MAILGUN_DOMAIN,
    },
  });
} else {
  mailerConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_MAIL_USERNAME,
      pass: process.env.ETHEREAL_MAIL_PASSWORD,
    },
  };
}

const transport = nodemailer.createTransport(mailerConfig);

const sendEmail = (recipient, message) =>
  new Promise((resolve, reject) =>
    transport.sendMail(
      {
        from: process.env.EMAILER_SENDER_ADDRESS,
        to: recipient,
        subject: message.subject,
        text: message.text,
      },
      (err, info) => (err ? reject(err) : resolve(info))
    )
  );

module.exports = {
  sendEmail,
  mailerConfig,
};
