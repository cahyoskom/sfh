const audit = require('../../controllers/audit');

module.exports = function (router) {
  router.get('/', audit.getData);
};
