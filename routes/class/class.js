const cls = require('../../controllers/class');

module.exports = function (router) {
  router.get('/', cls.findAll);
  router.get('/:id', cls.findOne);
  router.post('/:id', cls.update);
  router.put('/', cls.create);
  router.delete('/:id', cls.delete);
  router.put('/duplicate/:id', cls.duplicate);
};
