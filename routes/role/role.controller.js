const m_class_member = require('../../models/m_class_member');
const moment = require('moment');
const TASK_STATUS = require('../../enums/status.enums');
const ROLES = require('../../common/roles');

module.exports = function (router) {
  router.get('/', async function (req, res) {
    var filter = {};
    var where = [];

    if (!!req.query.user_id) {
      filter.user_id = req.query.user_id;
    }

    if (!!req.query.group_id) {
      filter.group_id = req.query.group_id;
    }

    var data = await m_class_member().findAll({ where: filter });

    res.json({ data: data });
  });

  router.get('/:id', async function (req, res) {
    var datum = await m_class_member().findOne({
      where: { user_role_id: req.params.id }
    });
    res.json({ data: datum });
  });

  router.get('/user/:id', async function (req, res) {
    var roles = await ROLES.get(req.params.id);

    res.json({ data: roles });
  });

  router.put('/', async function (req, res) {
    var new_obj = {
      user_id: req.body.user_id,
      group_id: req.body.group_id,
      class_id: req.body.class_id,
      subject_id: req.body.subject_id,
      student_id: req.body.student_id,
      status: 1,
      created_date: moment().format(),
      created_by: req.user.user_name
    };
    try {
      var datum = await m_class_member().create(new_obj);
      res.json({ data: datum });
    } catch (err) {
      res.status(411).json({ error: 11, message: err.message });
    }
  });

  router.post('/:id', async function (req, res) {
    var update_obj = {
      user_id: req.body.assignor_id,
      group_id: req.body.class_id,
      class_id: req.body.class_id,
      subject_id: req.body.subject_id,
      student_id: req.body.title,
      status: TASK_STATUS.ACTIVE,
      updated_date: moment().format(),
      updated_by: req.user.user_name
    };
    try {
      var datum = await m_class_member().update(update_obj, {
        where: { user_role_id: req.params.id }
      });
      res.json({ message: 'Data has been updated.' });
    } catch (err) {
      res.status(411).json({ error: 11, message: err.message });
    }
  });

  router.delete('/:id', async function (req, res) {
    m_class_member().update(
      { status: TASK_STATUS.DELETED },
      { where: { user_role_id: req.params.id } }
    );

    res.json({ message: 'Data has been deleted.' });
  });
};
