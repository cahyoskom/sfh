const admMRates = require('../../controllers/admMRates');

module.exports = function (router) {
  router.get('/', admMRates.findAll);
  router.get('/:id', admMRates.findOne);
  router.delete('/:id', admMRates.delete);
  router.post('/:id', admMRates.update);
  router.put('/', admMRates.create);
};
