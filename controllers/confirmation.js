const sec_confirmation = require('../models/sec_confirmation');
const mailer = require('../common/mailer');
const { ACTIVE } = require('../enums/status.enums');

exports.sendEmail = async function (transaction, { subject, to_addr, content, datum }) {
  const model_confirmation = sec_confirmation();
  const confirmation = await model_confirmation.create(
    {
      ...datum,
      is_sent: 0,
      status: ACTIVE,
      sender_addr: process.env.MAIL_USERNAME
    },
    { transaction }
  );
  if (!confirmation) return confirmation;

  const email = await mailer({
    to: to_addr,
    text: content,
    subject
  });
  if (!email) return email;

  confirmation.is_sent = 1;
  const resave = await confirmation.save({ transaction });
  if (!resave) return resave;

  console.log('Email confirmation:', { subject, to_addr, content, datum, response: email });

  return true;
};
