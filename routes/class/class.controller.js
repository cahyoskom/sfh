const m_class = require('../../models/m_class');
const { sha256 } = require('../../common/sha');
const query = require('../../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
var config = require('../../config/app.config');

module.exports = function (router) {
  router.get('/', async function (req, res) {
    const model_class = m_class();
    var data = await model_class.findAll();

    res.json({ data: data });
  });

  router.get('/:id', async function (req, res) {
    const model_class = m_class();
    var datum = await model_class.findOne({
      where: { class_id: req.params.id }
    });

    res.json({ data: datum });
  });

  router.put('/', async function (req, res) {
    const model_class = m_class();
    var new_obj = {
      class_level: req.body.class_level,
      class_parallel: req.body.class_parallel,
      class_name: req.body.class_name,
      status: 1,
      created_date: moment().format(),
      created_by: req.user.user_name
    };
    try {
      var datum = await model_class.create(new_obj);
      res.json({ data: datum });
    } catch (err) {
      res.status(411).json({ error: 11, message: err.message });
    }
  });

  router.delete('/:id', async function (req, res) {
    const model_task = m_class();
    model_task.update({ status: -1 }, { where: { class_id: req.params.id } });

    res.json({ message: 'Data has been deleted.' });
  });
};
