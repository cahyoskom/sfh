const ntf = require('../../controllers/notification');

module.exports = function (router) {
  router.get('/', ntf.findAll);
  router.put('/', ntf.create);
  router.post('/', ntf.isRead);
  router.put('/create-user', ntf.createUser);
  router.post('/update-default', ntf.updateDefaults);
};
