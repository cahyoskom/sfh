const profile = require("../../controllers/profile");

module.exports = function (router) {
  router.get("/", profile.getProfile);
  router.get("/:id", profile.findOne);
  router.put("/", profile.update);
};
