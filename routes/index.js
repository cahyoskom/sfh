const authentication = require('../controllers/authentication');
const config = require('../config/app.config');
const googleAuth = require('../controllers/google-auth');
const { auth } = require('google-auth-library');

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.end('v.' + config.version);
  });
  router.post('/login', authentication.login);
  router.post('/google-oauth', googleAuth.googleLogin)
  router.get('/check_token/:token', authentication.checkToken);
  router.post('/newPassword', authentication.newPassword);
  router.post('/updatePassword/:code',authentication.updatePassword);
};
