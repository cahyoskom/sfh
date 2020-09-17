const admMAppPage = require('../../controllers/admMAppPage');

module.exports = function (router) {
  router.get('/', admMAppPage.findAll);
  router.get('/:id', admMAppPage.findOne);
  router.delete('/:id', admMAppPage.delete);
  router.post('/:id', admMAppPage.update);
  router.put('/', admMAppPage.create);
};
