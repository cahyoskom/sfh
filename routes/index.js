const authentication = require('../controllers/authentication');
const config = require('../config/app.config');
const googleAuth = require('../controllers/google-auth')

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.end('v.' + config.version);
  });
  router.post('/login', authentication.login);
  router.post('/login_google', googleAuth.googleLogin)
  router.get('/check_token/:token', authentication.checkToken);
};
