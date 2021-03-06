const task = require('../../controllers/task');

module.exports = function (router) {
  router.get('/', task.findAll);
  router.get('/info/:id', task.getClassTaskInfo);
  router.get('/:id', task.findOne);
  router.get('/:id/collection', task.findOneInclCollection);
  router.put('/submit', task.submitTask);
  router.put('/submit_file/:id', task.submitTaskFile);
  router.put('/', task.create);
  router.post('/', task.update);
  router.post('/:status', task.setStatus);
  router.put('/:id/files', task.upload);
  router.put('/:id/link', task.uploadTaskLink);
  router.delete('/:id', task.delete);
  router.delete('/:id/files/:file_id', task.deleteFileById);
  router.get('/download/:file_id', task.download);
};
