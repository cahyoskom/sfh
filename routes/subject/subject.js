const subject = require('../../controllers/subject');

module.exports = function (router) {
  router.get('/', subject.findAll);
  router.get('/:id', subject.findOne);
  router.put('/', subject.create);
};
