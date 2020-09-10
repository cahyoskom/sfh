const t_class_task_collection = require('../models/t_class_task_collection');
const t_class_task_collection_file = require('../models/t_class_task_collection_file');
const fs = require('fs');
const { query } = require('../models/query');
const TASK_STATUS = require('../enums/status.enums');
const moment = require('moment');
const m_param = require('../models/m_param');
const formidable = require('formidable');
const GROUP_ENUMS = require('../enums/group.enums');
const MoveFile = require('../common/move');
const { Op } = require('sequelize');

async function GetCollectionForStudent(student, filter = {}) {
  var sql = `SELECT * FROM (
    SELECT t.task_id, t.status AS task_status, t.title, notes, start_date, finish_date, publish_date,
      s.subject_name,
      COALESCE(tc.task_collection_id, 0) AS task_collection_id, 
      COALESCE(tc.status,0) AS collection_status
    FROM t_class_task t
    JOIN t_class_subject s ON s.subject_id=t.subject_id
    LEFT JOIN (SELECT * FROM t_class_task_collection WHERE student_id = :student_id) tc ON tc.task_id=t.task_id
    WHERE t.class_id = :class_id AND t.status > 0 AND s.status = 1
  ) t`;
  var param = {
    class_id: student.student_class_id,
    student_id: student.student_id
  };

  return await query(sql, param, filter);
}

exports.findAll = async function (req, res) {
  var filter = {};

  // if start_date specified, by default finish_date=start_date, unless finish_date is specified
  // if start_date not specified, then finish_date will be skipped.
  if (!!req.query.collection_status) {
    filter.collection_status = req.query.collection_status;
  }
  if (!!req.query.start_date) {
    let start_date = req.query.start_date;
    let finish_date = start_date;
    if (!!req.query.finish_date) {
      finish_date = req.query.finish_date;
    }

    filter[Op.or] = [
      {
        [Op.and]: [
          { start_date: { [Op.lte]: start_date } },
          { finish_date: { [Op.gte]: start_date } }
        ]
      },
      {
        [Op.and]: [
          { start_date: { [Op.lte]: finish_date } },
          { finish_date: { [Op.gte]: finish_date } }
        ]
      },
      {
        [Op.and]: [
          { start_date: { [Op.gte]: start_date } },
          { finish_date: { [Op.lte]: finish_date } }
        ]
      }
    ];
  }

  if (!!req.user.roles[GROUP_ENUMS.PARTICIPANT]) {
    // student
    var cols = await GetCollectionForStudent(req.user.roles[GROUP_ENUMS.PARTICIPANT][0], filter);
  } else {
    // not student
    if (!!req.query.class) {
      filter.class_id = req.query.class;
    }
  }
  res.json({ data: cols });
};

exports.findOne = async function (req, res) {
  const model_task = t_class_task_collection();
  var datum = await model_task.findOne({
    where: { task_collection_id: req.params.id }
  });
  var files = await t_class_task_collection_file().findAll({
    where: { task_collection_id: req.params.id }
  });
  var result = datum.toJSON();
  result.files = files;
  res.json({ data: result });
};

exports.create = async function (req, res) {
  if (!req.user.roles[GROUP_ENUMS.PARTICIPANT]) {
    res.status(401).json({ error: 10, message: 'Not a student' });
    return;
  }
  var new_obj = {
    task_id: req.body.task_id,
    student_id: req.user.roles[GROUP_ENUMS.PARTICIPANT][0].student_id,
    status: 1,
    created_date: moment().format(),
    created_by: req.user.user_name
  };
  try {
    var datum = await t_class_task_collection().create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.setStatus = async function (req, res) {
  let new_status = 1;
  var update_obj = {
    updated_date: moment().format(),
    updated_by: req.user.user_name
  };
  if (req.params.status == 'submit') {
    status = 4;
    update_obj.submitted_date = moment().format();
  }
  update_obj.status = status;

  try {
    var datum = await t_class_task_collection().update(update_obj, {
      where: {
        task_collection_id: req.body.task_collection_id
      }
    });
    res.json({
      message: 'Data has been updated.'
    });
  } catch (err) {
    res.status(411).json({
      error: 11,
      message: err.message
    });
  }
};

exports.upload = async function (req, res) {
  const form = formidable({
    multiples: true
  });
  const task_collection_id = req.params.id;

  var task_collection = await t_class_task_collection().findOne({
    where: {
      task_collection_id: req.params.id
    }
  });
  let result = [];
  if (!task_collection) {
    res.status(404).json({
      error: 31,
      message: 'Task Collection not found.'
    });
    return;
  }

  let { fields, files } = await new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      if (!Array.isArray(files.files)) {
        resolve({
          fields,
          files: [files.files]
        });
      } else {
        resolve({
          fields,
          files: files.files
        });
      }
    });
  });

  if (files.length == 0) {
    res.status(421).json({
      error: 21,
      message: 'Files not found'
    });
  }

  let task_id = task_collection.task_id;
  var parameter = m_param();
  var UPLOAD_DIR = await parameter.findOne({
    attributes: ['value'],
    where: { name: 'UPLOAD_DIR' }
  });
  var upload_dir =
    UPLOAD_DIR.value + '/task_' + task_id + '/collection/' + task_collection_id + '/';
  if (!fs.existsSync(upload_dir)) {
    fs.mkdirSync(upload_dir, {
      recursive: true
    });
  }
  for (const element of files) {
    let filename = upload_dir + element.name;
    await MoveFile(element.path, filename);
    let new_file = {
      task_collection_id: task_collection_id,
      filename: element.name,
      ext: filename.split('.').pop(),
      mime_type: element.type,
      location: filename,
      sequence: 0, //todo ambil dari terakhir
      status: 1,
      created_date: moment().format(),
      created_by: req.user.user_name
    };

    var task_collection_file = await t_class_task_collection_file().findOne({
      where: {
        task_collection_id: task_collection_id,
        filename: element.name
      }
    });
    if (!task_collection_file) {
      // belum ada, insert baru
      task_collection_file = await t_class_task_collection_file().create(new_file);
    } else {
      // todo, update ganti updated date
    }

    result.push(task_collection_file);
  }

  res.json({ data: result });
};

exports.download = async function (req, res) {
  var file = await t_class_task_collection_file().findOne({
    where: {
      task_collection_file_id: req.params.file_id
    }
  });

  if (!!file) {
    var task_collection_id = file.task_collection_id;

    var coll = await t_class_task_collection().findOne({
      where: {
        task_collection_id: task_collection_id
      }
    });

    if (!coll) {
      res.status(404).json({
        error: 34,
        message: 'No collection found.'
      });
      return;
    }
    var task_id = coll.task_id;
    var upload_dir = UPLOAD_DIR + '/task_' + task_id + '/collection/' + task_collection_id + '/';
    var filename = upload_dir + file.filename;
    if (!fs.existsSync(filename)) {
      res.status(404).json({
        error: 24,
        message: 'File is missing. It shoud existed though.'
      });
      return;
    }
    res.download(filename);
  } else {
    res.status(404).json({
      error: 24,
      message: 'File not found'
    });
  }
};
