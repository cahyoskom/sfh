const { version } = require('../package.json');
const auth = require('../controllers/authentication');
const authGoogle = require('../controllers/google-auth');
const registration = require('../controllers/registration');

module.exports = function (router) {
  router.all('/', async function (req, res) {
    const param = require('../models/m_param')();
    const slug = await param.findOne({
      attributes: ['value', 'description'],
      where: { name: 'SLUG' }
    });
    res.end(slug.value + ' v.' + version);
  });
  router.post('/login', auth.login);
  router.post('/login_google', authGoogle.googleLogin);
  router.get('/check_token/:token', auth.checkToken);
  router.put('/registration', registration.create);
  router.get('/activating/:code', registration.activating);
  router.post('/request_activation', registration.requestActivation);
  router.post('/forgot_password', registration.forgotPassword);
  router.post('/update_password/:code', registration.updatePassword);
};
