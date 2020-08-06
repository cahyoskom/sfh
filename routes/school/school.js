const school = require("../../controllers/school");

module.exports = function (router) {
  router.get("/", school.findAll);
  router.get("/:id", school.findOne);
  router.get("/code/:code", school.findByCode);
  router.post("/:id", school.update);
  router.put("/", school.create);
  router.delete("/:id", school.delete);
};
