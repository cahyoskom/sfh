const role = require('../../controllers/role');

module.exports = function (router) {
  router.get('/', role.findAll);
  router.get('/:id', role.findOne);
  router.get('/user/:id', role.findOneByUser);
  router.put('/', role.create);
  router.post('/:id', role.update);
  router.delete('/:id', role.delete);
};
