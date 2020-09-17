const admMSpot = require('../../controllers/admMSpot');

module.exports = function (router) {
  router.get('/', admMSpot.findAll);
  router.get('/:id', admMSpot.findOne);
  router.delete('/:id', admMSpot.delete);
  router.post('/:id', admMSpot.update);
  router.put('/', admMSpot.create);
};
