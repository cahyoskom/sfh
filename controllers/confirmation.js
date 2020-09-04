const sec_confirmation = require('../models/sec_confirmation');
const mailer = require('../common/mailer');
const { ACTIVE } = require('../enums/status.enums');

async function create(data) {
  const model_confirmation = sec_confirmation();
  return await model_confirmation.create(data);
}

exports.sendEmail = async function ({ subject, to_addr, content, datum }, transaction) {
  console.log('Email confirmation: ', { subject, to_addr, content, datum });
  try {
    const confirmation = await create(
      {
        ...datum,
        status: ACTIVE,
        sender_addr: process.env.MAIL_USERNAME
      },
      { transaction }
    );

    if (!confirmation) throw confirmation;

    const email = await mailer({
      to: to_addr,
      text: content,
      subject
    });

    if (!email) throw email;

    confirmation.is_sent = 1;
    await confirmation.save();

    return true;
  } catch (e) {
    transaction.rollback();
    throw e;
  }
};
