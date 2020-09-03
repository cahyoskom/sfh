const todo = require('../../controllers/todo');

module.exports = function (router) {
  router.get('/', todo.findAll);
  router.delete('/:id', todo.delete);
  router.put('/', todo.create);
};
