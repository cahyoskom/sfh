const collection = require('../../controllers/collection');

module.exports = function (router) {
  router.get('/', collection.findAll);
  router.get('/:id', collection.findOne);
  router.put('/', collection.create);
  router.post('/:status', collection.setStatus);
  router.put('/:id/files', collection.upload);
  router.get('/download/:file_id', collection.download);
};
