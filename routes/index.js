const authentication = require('../controllers/authentication');
const config = require('../config/app.config');

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.end('v.' + config.version);
  });
  router.post('/login', authentication.login);
  router.get('/check_token/:token', authentication.checkToken);
};
