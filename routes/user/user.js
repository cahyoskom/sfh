const user = require('../../controllers/user');

module.exports = function (router) {
  router.get('/', user.findAll);
  router.get('/:id', user.findOne);
  router.delete('/:id', user.delete);
  router.put('/', user.create);
  router.post('/:id', user.update);
};
