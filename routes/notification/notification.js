const ntf = require('../../controllers/notification');

module.exports = function (router) {
  router.get('/', ntf.findAll);
  router.put('/', ntf.create);
  router.post('/', ntf.isRead);
  router.post('/read-id', ntf.isReadById);
  router.put('/create-user', ntf.createUser);
  router.post('/update-default', ntf.updateDefaults);
  router.get('/default-setting', ntf.defaultSetting);
  router.get('/get-setting-kelas', ntf.getSettingKelas);
  router.get('/get-setting-sekolah', ntf.getSettingSchool);
  router.get('/find-class', ntf.findClass);
  router.get('/find-school', ntf.findSchool);
  router.post('/update-master', ntf.updateMasterNotification);
  router.delete('/delete/:id', ntf.deleteNotification);
};
