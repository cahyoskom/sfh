const m_class = require('../../models/m_class');
const { sha256 } = require('../../common/sha');
const query = require('../../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
var config = require('../../config/app.config');

module.exports = function (router) {
  var tablename;
  async function getTable(req, res, next) {
    tablename = req.query.table;

    if (!tablename) {
      res.status(422).json({ error: 22, message: 'Table name not found' });
      return;
    }
    next();
  }

  /*******************
   * GET /
   *  params :
   *      table => nama table
   *      <field> => filtering using
   *                  ex. id=1&nama=rolis&nama=kartiko => WHERE id=1 AND nama IN ('rolis', 'kartiko')
   *
   **********************/
  router.get('/', getTable, async function (req, res) {
    const model = require('../../models/' + tablename);

    var filter = {};
    for (var q of Object.keys(req.query)) {
      if (q === 'table') continue;
      filter[q] = req.query[q];
    }

    var data = await model().findAll({ where: filter });

    res.json({ data: data });
  });

  /*******************
   * PUT /
   *  params :
   *      table => nama table
   *
   *  body :
   *      {
   *          field_1 : value_1,
   *          field_2 : value_2,
   *          ...
   *          field_n : value_n,
   *      }
   **********************/

  router.put('/', async function (req, res) {
    const model = require('../../models/' + tablename);

    var new_obj = {};
    for (var q of Object.keys(req.query)) {
      if (q === 'table') continue;
      new_obj[q] = req.body[q];
    }

    new_obj.created_date = moment().format();
    new_obj.created_by = req.user.user_name;

    try {
      var datum = await model().create(new_obj);
      res.json({ data: datum });
    } catch (err) {
      res.status(411).json({ error: 11, message: err.message });
    }
  });

  /*******************
   * DEL /
   *  params :
   *      table => nama table
   *      <field> => filtering ex. id=1
   *      delete => true for hard delete (optional)
   *
   **********************/
  router.delete('/', async function (req, res) {
    const model = require('../../models/' + tablename);

    var filter = {};
    for (var q of Object.keys(req.query)) {
      if (q === 'table') continue;
      if (q === 'delete') continue;
      filter[q] = req.query[q];
    }

    if (req.query.delete === 'true') {
    } else {
      model_task.update({ status: -1 }, { where: filter });
    }

    res.json({ message: 'Data has been deleted.' });
  });
};
