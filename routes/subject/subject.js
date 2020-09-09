const subject = require('../../controllers/subject');

module.exports = function (router) {
  router.get('/', subject.findAll);
  router.get('/class/:id', subject.findByClass);
  router.get('/:id', subject.findOne);
  router.put('/', subject.create);
};
