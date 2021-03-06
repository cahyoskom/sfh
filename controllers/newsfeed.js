const t_class = require('../models/t_class');
const t_class_forum = require('../models/t_class_forum');
const t_class_forum_mention = require('../models/t_class_forum_mention');
const t_class_forum_comment = require('../models/t_class_forum_comment');
const t_class_forum_comment_mention = require('../models/t_class_forum_comment_mention');

const { query } = require('../models/query');

const moment = require('moment');

const { ACTIVE, DELETED, DEACTIVE } = require('../enums/status.enums');

exports.findAll = async (req, res) => {
  sqlQuery = `select t_class_forum.id, t_class_forum.published_datetime, t_class_forum.content, t_class_forum.status AS class_status, sec_user.name, sec_user.username, sec_user.status, sec_user.avatar,t_class.name AS class_name, t_class.status from t_class_forum INNER JOIN sec_user INNER JOIN T_CLASS where sec_user.id = t_class_forum.sec_user_id AND t_class_forum.status= :status AND t_class_forum.t_class_id = t_class.id AND t_class.id = :id`;

  var data = await query(sqlQuery, {
    status: ACTIVE,
    id: req.query.id
  });
  res.json({ data: data });
};

exports.create = async (req, res) => {
  const model_class = t_class_forum();
  const model_mention_class = t_class_forum_mention();

  var new_post = {
    t_class_id: req.body.t_class_id,
    sec_user_id: req.user.id,
    published_datetime: moment().format(),
    content: req.body.content,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.name
  };

  try {
    var datmen = [];
    var datum = await model_class.create(new_post);

    if (req.body.mentionedPeoples.length != 0) {
      req.body.mentionedPeoples.map(people => {
        var new_mention = {
          t_class_forum_id: datum.dataValues.id,
          sec_user_id: people.id,
          status: ACTIVE,
          created_date: moment().format(),
          created_by: req.user.name
        };
        var temp = model_mention_class.create(new_mention);
        datmen.push(temp);
      });
    }
    res.json({ data_post: datum, data_mention: datmen });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.createComment = async (req, res) => {
  const model_forum_comment = t_class_forum_comment();
  const model_forum_comment_mention = t_class_forum_comment_mention();

  var new_comment_post = {
    t_class_forum_id: req.body.t_class_forum_id,
    sec_user_id: req.user.id,
    published_datetime: moment().format(),
    content: req.body.content,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.name
  };

  try {
    var datmen = [];
    var datum = await model_forum_comment.create(new_comment_post);
    if (req.body.mentionedPeoples.length != 0) {
      req.body.mentionedPeoples.map(people => {
        var new_mention = {
          t_class_forum_comment_id: datum.dataValues.id,
          sec_user_id: people[0],
          status: ACTIVE,
          created_date: moment().format(),
          created_by: req.user.name
        };
        var temp = model_forum_comment_mention.create(new_mention);
        datmen.push(temp);
      });
    }

    res.json({
      data_post: datum,
      data_mention: datmen
    });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};
