const { env } = process;
const nodemailer = require('nodemailer');

module.exports = async function ({ to, subject, text }) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: env.MAIL_SECURE,
      auth: { user: env.MAIL_USERNAME, pass: env.MAIL_PASSWORD }
    });

    let options = {
      from: env.MAIL_SENDER,
      to,
      subject,
      text
    };

    transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log('Failed sending email with error: ' + error);
        reject(false); // or use resolve(false) if you won't to have error handling.
      } else {
        console.log('Email sent: ' + info.response);
        resolve(true);
      }
    });
  });
};
