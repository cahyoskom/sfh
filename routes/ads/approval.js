const Aproval = require('../../controllers/ads-approval');

module.exports = function (router) {
  router.get('/approval', Aproval.findAll);
};
