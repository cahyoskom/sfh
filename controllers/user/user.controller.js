const sec_user = require('../../models/sec_user');
const { sha256 } = require('../../common/sha');
const query = require('../../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
var config = require('../../config/app.config');

module.exports = function (router) {
  router.get('/', async function (req, res) {
    const model_user = sec_user();
    var users = await model_user.findAll();

    res.json({ data: users });
  });

  router.get('/:user_id', async function (req, res) {
    const model_user = sec_user();
    var user = await model_user.findOne({
      where: { user_id: req.params.user_id }
    });

    res.json({ data: user });
  });

  router.put('/', async function (req, res) {
    const model_user = sec_user();
    var new_user = {
      user_name: req.body.user_name,
      email: req.body.email,
      password: sha256(req.body.user_name + req.body.password),
      status: 1,
      created_date: moment().format(),
      created_by: req.user.user_name
    };
    try {
      var user = await model_user.create(new_user);
      res.json({ data: user });
    } catch (err) {
      res.status(411).json({ error: 11, message: err.message });
    }
  });
};
