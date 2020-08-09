const school = require('../../controllers/school');

module.exports = function (router) {
  router.get('/', school.findAll);
  router.get('/class_list', school.getAllClass);
  router.get('/:id', school.findOne);
  router.post('/', school.update);
  router.put('/', school.create);
  router.delete('/:id', school.delete);
  router.post('/connect_class', school.connectClass);
  router.put('/create_class', school.createClass);
  router.post('/approval/:classId', school.approval);
};
