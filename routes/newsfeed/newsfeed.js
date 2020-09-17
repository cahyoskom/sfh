const news = require('../../controllers/newsfeed');

module.exports = function (router) {
  router.get('/', news.findAll);
  router.put('/', news.create);
  router.put('/create-comment', news.createComment);
  //   router.put('/create-user', ntf.createUser);
};
