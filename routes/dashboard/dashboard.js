const dashboard = require('../../controllers/dashboard');

module.exports = function (router) {
  router.get('/', dashboard.findOne);
};
