const { version } = require('../package.json');
const auth = require('../controllers/authentication');
const authGoogle = require('../controllers/google-auth');
const registration = require('../controllers/registration');
const school = require('../controllers/school');
const classController = require('../controllers/class');
const audit = require('../controllers/audit');
const todo = require('../controllers/todo');

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
  router.get('/confirmation', function (req, res) {
    // When you missing react app url that setted in env.APP_BASEURL,
    // this path url used for fallback a link that sent to email.
    // But, another /activating will blocked because POST method.
    const { q, code } = req.query;
    if (q == 'activating' && code) {
      return res.redirect(`/activating/${code}`);
    }
    res.status(401).end();
  });
  router.get('/check_email', registration.checkEmail);
  router.get('/school_invitation', school.acceptInvitation);
  router.get('/class_invitation', classController.acceptInvitation);
  router.get('/audit_trail', audit.getData);
  router.get('/is_admin', function (req, res) {
    let is_admin = false;
    if (req.user.is_admin == 1) {
      is_admin = true;
    }

    res.json({ data: is_admin });
  });
  // router.get('/tableguru', todo.findAll);
  // router.get('/todomurid', todo.findAll);
};
