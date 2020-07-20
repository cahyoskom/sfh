const group = require('../../controllers/group');

module.exports = function (router) {
  router.get('/', group.findAll);
  router.get('/:id', group.findOne);
  router.put('/', group.create);
};
