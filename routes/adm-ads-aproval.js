const adm_ads_aproval = require('../controllers/adm-ads-aproval-controller');

module.exports = function (router) {
  router.get('/adm-ads-aproval', adm_ads_aproval.findAll);
};
