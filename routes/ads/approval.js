const Aproval = require('../../controllers/ads-approval');

module.exports = function (router) {
  router.get('/', Aproval.findAll); //list ads
  router.get('/pratinjau/:id', Aproval.findOne); //Detail ads
};
