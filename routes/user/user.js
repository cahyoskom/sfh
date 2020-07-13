const user = require('../../controllers/user');

module.exports = function (router) {
  router.get('/', user.findAll);
  router.get('/:user_id', user.findOne);
  router.put('/', user.create);
};
