const admMApp = require('../../controllers/admMApp');

module.exports = function (router) {
  router.get('/', admMApp.findAll);
  router.get('/:id', admMApp.findOne);
  router.delete('/:id', admMApp.delete);
  router.post('/:id', admMApp.update);
  router.put('/', admMApp.create);
};
