const sec_user = require('../models/sec_user');
const sec_token = require('../models/sec_token');
const moment = require('moment');
const USER_STATUS = require('../enums/status.enums');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function checkUser(email) {
  const model_user = sec_user();
  var user = await model_user.findOne({
    where: {
      email: email,
      status: USER_STATUS.ACTIVE
    }
  });
  return user;
}

async function setToken(tokenId, userId) {
  var token = await sec_token().findAll({
    where: { sec_user_id: userId, status: USER_STATUS.ACTIVE }
  });
  if (token.length > 0) {
    // token exists, delete
    sec_token().update(
      { status: USER_STATUS.DELETED },
      { where: { sec_user_id: userId } }
    );
  }
  var new_token = {
    token: tokenId,
    sec_user_id: userId,
    status: USER_STATUS.ACTIVE,
    valid_until: moment().add(process.env.TOKEN_VALIDITY_TIME, 'm').format()
  };
  var curr_token = await sec_token().create(new_token);
  return curr_token;
}

exports.googleLogin = async function (req, res) {
  const { tokenId } = req.body;
  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const { email_verified, name, email, picture } = response.payload;
  if (email_verified) {
    var user = await checkUser(email);
    if (!user) {
      //create new sec_user
      const model_user = sec_user();
      var new_user = {
        name: name,
        email: email,
        password: '',
        avatar: picture,
        status: USER_STATUS.ACTIVE,
        is_email_validated: true,
        created_date: moment().format(),
        created_by: 'SYSTEM',
        auth_provider: 1,
        auth_profile_id: email,
        auth_data: JSON.stringify(response)
      };
      try {
        user = await model_user.create(new_user);
      } catch (err) {
        res.status(401).json({ error: null, message: err.message });
        return;
      }
    }
    var token = await setToken(tokenId, user.id);
    var result = {
      user: {
        user_id: user.id,
        email: user.email,
        is_email_validated: user.is_email_validated,
        name: user.name
      },
      token: token.token,
      token_validity: token.valid_until
    };
    res.json(result);
  } else {
    //if not verified
    res.status(401).json({ message: 'Email belum terverifikasi' });
  }
};
