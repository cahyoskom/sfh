const user = require('../../controllers/user');

module.exports = function (router) {
  router.get('/', user.findAll);
  router.get('/:id', user.findOne);
  router.put('/', user.create);
  router.delete('/:id', user.delete);
};
