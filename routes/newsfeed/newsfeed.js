const news = require('../../controllers/newsfeed');

module.exports = function (router) {
  router.get('/', news.findAll);
  router.put('/', news.create);
  //   router.post('/', ntf.isRead);
  //   router.put('/create-user', ntf.createUser);
  //   router.post('/update-default', ntf.updateDefaults);
};
