const moment = require('moment');
const fs = require('fs');
const formidable = require('formidable');
const t_class_task = require('../models/t_class_task');
const t_class_task_file = require('../models/t_class_task_file');
const t_class_task_collection = require('../models/t_class_task_collection');
const m_param = require('../models/m_param');
const { query } = require('../models/query');
const { sha256 } = require('../common/sha');
const MoveFile = require('../common/move');
const { ACTIVE, DELETED } = require('../enums/status.enums');
const m_subject = require('../models/m_subject');
const t_class_member = require('../models/t_class_member');
const { Op } = require('sequelize');

exports.findAll = async function (req, res) {
  // let filter = {};
  // let where = [];

  // if (!!req.query.class) {
  //   filter.class_id = req.query.class;
  // }

  // if (!!req.query.subject) {
  //   filter.subject_id = req.query.subject;
  //   where.push('s.subject_id IN (:subject_id)');
  // }

  // if start_date specified, by default finish_date=start_date, unless finish_date is specified
  // if start_date not specified, then finish_date will be skipped.
  // if (!!req.query.start_date) {
  //   filter.start_date = req.query.start_date;
  //   filter.finish_date = filter.start_date;
  //   if (!!req.query.finish_date) {
  //     filter.finish_date = req.query.finish_date;
  //   }
  //   where.push(
  //     '((start_date <= :start_date && :start_date <= finish_date) || (start_date <= :finish_date && :finish_date <= finish_date) || (:start_date <= start_date && finish_date <= :finish_date))'
  //   );
  // }

  var sql = `SELECT t.sec_user_id, t.id, t.t_class_id, t.title, t.notes, t.start_date, t.finish_date, 
  t.publish_date, s.name as subjectName, COUNT(tc.id) as countSubmitted
  FROM t_class_task t
  JOIN m_subject s ON s.id=t.m_subject_id AND s.status=1
  LEFT JOIN t_class_task_collection tc ON tc.t_class_task_id = t.id AND tc.status = 1
  WHERE t.status = 1 AND t.t_class_id = :class_id
  GROUP BY t.id`;

  // if (Object.keys(filter).length > 0) {
  //   sql = sql + ' AND ' + where.join(' AND ');
  // }

  // if (!!req.query.search) {
  //   filter.search = req.query.search;
  //   sql =
  //     sql +
  //     `AND t.title COLLATE UTF8_GENERAL_CI LIKE '%@search%'`
  // }
  const model_class_member = t_class_member();
  var students = await model_class_member.findAndCountAll({
    where: {
      t_class_id: req.query.class,
      status: ACTIVE,
      sec_group_id: 3
    }
  });

  var checkUser = await model_class_member.findOne({
    where: {
      t_class_id: req.query.class,
      status: ACTIVE,
      sec_user_id: req.user.id,
      sec_group_id: { [Op.or]: [1, 2, 3] }
    }
  });
  var data = [];
  var isStudent = false;
  if (checkUser) {
    data = await query(sql, {
      class_id: req.query.class,
      search: req.query.search
    });
    if (checkUser.sec_group_id == 3) {
      isStudent = true;
    }
  }

  res.json({
    data: data,
    isStudent: isStudent,
    totalStudents: students.count
  });
};

exports.findOne = async function (req, res) {
  const model_task = t_class_task();
  var datum = await model_task.findOne({ where: { id: req.params.id } });
  var files = await t_class_task_file().findAll({
    where: { t_class_task_id: req.params.id }
  });
  var result = datum.toJSON();
  result.files = files;
  res.json({ data: result });
};

exports.findOneInclCollection = async function (req, res) {
  const model_task = t_class_task();
  var task = await model_task.findOne({ where: { task_id: req.params.id } });

  if (!task) {
    res.status(411).json({ error: 11, message: 'Id needed.' });
    return;
  }

  var sql = `SELECT
    s.student_no, s.student_name, c.task_collection_id,submitted_date, c.status
  FROM (SELECT * from t_student WHERE class_id = :class_id AND status=1) s
  LEFT JOIN (SELECT * FROM t_class_task_collection WHERE task_id = :task_id) c ON c.student_id=s.student_id`;

  var data = await query(sql, {
    class_id: task.class_id,
    task_id: task.task_id
  });

  res.json({ data: data });
};

exports.create = async function (req, res) {
  const model_task = t_class_task();
  const model_subject = m_subject();
  var subject_id;
  var existed_subject = model_subject.findOne({
    where: { name: req.body.subject, t_class_id: req.body.class_id, status: ACTIVE }
  });
  if (existed_subject) {
    //subject already existed
    subject_id = existed_subject.id;
  } else {
    //create new subject
    var new_obj = {
      name: req.body.subject,
      t_class_id: req.body.class_id,
      status: ACTIVE,
      created_date: moment().format(),
      created_by: req.user.email
    };
    try {
      var datum = await model_subject.create(new_obj);
      subject_id = datum.id;
    } catch (err) {
      res.status(411).json({ error: 11, message: err.message });
    }
  }
  var new_obj = {
    sec_user_id: req.body.user_id,
    t_class_id: req.body.class_id,
    m_subject_id: subject_id,
    title: req.body.title,
    notes: req.body.notes,
    weight: req.body.weight,
    start_date: req.body.start_date,
    finish_date: req.body.finish_date,
    publish_date: req.body.publish_date,
    status: 1,
    created_date: moment().format(),
    created_by: req.user.user_name
  };
  try {
    var datum = await model_task.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_task = t_class_task();
  const model_subject = m_subject();
  var subject_id;
  var existed_subject = model_subject.findOne({
    where: { name: req.body.subject, t_class_id: req.body.class_id, status: ACTIVE }
  });
  if (existed_subject) {
    //subject already existed
    subject_id = existed_subject.id;
  } else {
    //create new subject
    var new_obj = {
      name: req.body.subject,
      t_class_id: req.body.class_id,
      status: ACTIVE,
      created_date: moment().format(),
      created_by: req.user.email
    };
    try {
      var datum = await model_subject.create(new_obj);
      subject_id = datum.id;
    } catch (err) {
      res.status(411).json({ error: 11, message: err.message });
    }
  }
  var update_obj = {
    sec_user_id: req.body.user_id,
    t_class_id: req.body.class_id,
    m_subject_id: subject_id,
    title: req.body.title,
    notes: req.body.notes,
    weight: req.body.weight,
    start_date: req.body.start_date,
    finish_date: req.body.finish_date,
    publish_date: req.body.publish_date,
    status: ACTIVE,
    updated_date: moment().format(),
    updated_by: req.user.user_name
  };
  try {
    var datum = await model_task.update(update_obj, {
      where: { task_id: req.body.task_id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.setStatus = async function (req, res) {
  var id = req.body.task_id;
  if (!id) {
    res.status(411).json({ error: 11, message: 'Id needed.' });
    return;
  }

  let update_obj = {};
  let status = ACTIVE;

  switch (req.params.status) {
    case 'archived':
      status = 5;
      break;
    case 'published':
      status = 2;
      break;
    case 'finished':
      status = 3;
      break;
    default:
      status = 0;
  }

  if (status === 0) {
    res.status(411).json({ error: 11, message: 'Status out of range.' });
    return;
  }

  update_obj = {
    status: status,
    updated_date: moment().format(),
    updated_by: req.user.user_name
  };

  try {
    var datum = await t_class_task().update(update_obj, {
      where: { task_id: req.body.task_id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.upload = async function (req, res) {
  const form = formidable({ multiples: true });
  const task_id = req.params.id;

  var task = await t_class_task().findOne({ where: { task_id: req.params.id } });
  let result = [];
  if (!task) {
    res.status(404).json({ error: 31, message: 'Task not found.' });
    return;
  }

  let { fields, files } = await new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      if (!Array.isArray(files.files)) {
        resolve({ fields, files: [files.files] });
      } else {
        resolve({ fields, files: files.files });
      }
    });
  });

  if (files.length == 0) {
    res.status(421).json({ error: 21, message: 'Files not found' });
  }

  var parameter = m_param();
  var UPLOAD_DIR = await parameter.findOne({
    attributes: ['value'],
    where: { name: 'UPLOAD_DIR' }
  });
  var upload_dir = UPLOAD_DIR.value + '/task_' + task_id + '/';
  if (!fs.existsSync(upload_dir)) {
    fs.mkdirSync(upload_dir);
  }
  for (const element of files) {
    let filename = upload_dir + element.name;
    await MoveFile(element.path, filename);
    let new_file = {
      t_class_task_id: task_id,
      filename: element.name,
      ext: filename.split('.').pop(),
      mime_type: element.type,
      location: filename,
      sequence: 0, //todo ambil dari terakhir
      status: 1
    };

    var task_file = await t_class_task_file().findOne({
      where: { task_id: task_id, filename: element.name }
    });
    if (!task_file) {
      // belum ada, insert baru
      task_file = await t_class_task_file().create(new_file);
    } else {
      // todo, update ganti updated date
      new_file.updated_date = moment().format();
      new_file.updated_by = req.user.email;
      try {
        var update = await t_class_task_file().update(new_file, {
          where: { id: task_file.id }
        });
      } catch (err) {
        res.status(411).json({ error: 11, message: err.message });
      }
      task_file = new_file;
    }

    result.push(task_file);
  }

  res.json({ data: result });
};

exports.delete = async function (req, res) {
  const model_task = t_class_task();
  model_task.update({ status: TASK_STATUS.DELETED }, { where: { task_id: req.params.id } });

  res.json({ message: 'Data has been deleted.' });
};

exports.deleteFileById = async function (req, res) {
  const model_task = t_class_task_file();
  model_task.update(
    { status: TASK_STATUS.DELETED },
    { where: { task_file_id: req.params.file_id } }
  );

  res.json({ message: 'Data has been deleted.' });
};

exports.download = async function (req, res) {
  var file = await t_class_task_file().findOne({
    where: { task_file_id: req.params.file_id }
  });

  if (!!file) {
    var task_id = file.task_id;
    var parameter = m_param();
    var UPLOAD_DIR = await parameter.findOne({
      attributes: ['value'],
      where: { name: 'UPLOAD_DIR' }
    });
    var upload_dir = UPLOAD_DIR.value + '/task_' + task_id + '/';
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
    res.status(404).json({ error: 24, message: 'File not found' });
  }
};
