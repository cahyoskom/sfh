const ntf = require('../../controllers/notification');

module.exports = function (router) {
  router.get('/', ntf.findAll);
  router.put('/', ntf.create);
  router.post('/', ntf.isRead);
  router.put('/create-user', ntf.createUser);
  router.post('/update-default', ntf.updateDefaults);
  router.get('/default-setting', ntf.defaultSetting);
  router.get('/get-setting-kelas', ntf.getSettingKelas);
  router.get('/get-setting-sekolah', ntf.getSettingSchool);
  router.get('/find-kelas', ntf.findKelas);
};
