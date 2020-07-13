const task = require('../../controllers/task');

module.exports = function (router) {
  router.get('/', task.findAll);
  router.get('/:id', task.findOne);
  router.get('/:id/collection', task.findOneInclCollection);
  router.put('/', task.create);
  router.post('/', task.update);
  router.post('/:status', task.setStatus);
  router.put('/:id/files', task.upload);
  router.delete('/:id', task.delete);
  router.delete('/:id/files/:file_id', task.deleteFileById);
  router.get('/download/:file_id', task.download);
};
