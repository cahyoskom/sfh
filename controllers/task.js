const moment = require('moment');
const fs = require('fs');
const { Op } = require('sequelize');
const formidable = require('formidable');

const { query } = require('../models/query');
const m_param = require('../models/m_param');
const t_class_task = require('../models/t_class_task');
const t_class_task_file = require('../models/t_class_task_file');
const t_class_task_collection = require('../models/t_class_task_collection');
const t_class_subject = require('../models/t_class_subject');
const t_class_member = require('../models/t_class_member');
const t_class_task_collection_file = require('../models/t_class_task_collection_file');
const { sha256 } = require('../common/sha');
const MoveFile = require('../common/move');
const { beginTransaction } = require('../database');
const {
  DELETED,
  DEACTIVE,
  ACTIVE,
  PUBLISHED,
  FINISHED,
  SUBMIITTED,
  ARCHIVED
} = require('../enums/task-status.enums');
const { check } = require('prettier');

exports.findAll = async function (req, res) {
  var sql = `SELECT t.sec_user_id, t.id, t.t_class_id, t.title, t.notes, t.start_date, t.finish_date, 
          t.publish_date, COUNT(tc.id) as countSubmitted
          FROM t_class_task t
          LEFT JOIN t_class_task_collection tc ON tc.t_class_task_id = t.id AND tc.status = 1
          WHERE t.status = 1 AND t.t_class_id = :class_id
          `;

  if (!!req.query.search) {
    sql = sql + ` AND t.title COLLATE UTF8_GENERAL_CI LIKE '%` + req.query.search + `%'`;
  }
  var start_date = '';
  var finish_date = '';
  if (!!req.query.startDate) {
    start_date = moment(moment(req.query.startDate).add(1, 'day')).format();
    sql = sql + ` AND t.start_date > :start_date`;
  }
  if (!!req.query.finishDate) {
    finish_date = moment(moment(req.query.finishDate).add(1, 'day')).format();
    sql = sql + ` AND t.finish_date < :finish_date`;
  }

  sql = sql + ` GROUP BY t.id`;

  data = await query(sql, {
    class_id: req.query.class,
    start_date: start_date,
    finish_date: finish_date
  });

  res.json({
    data: data
  });
};

exports.getClassTaskInfo = async function (req, res) {
  // get total students of class
  const model_class_member = t_class_member();
  var students = await model_class_member.findAndCountAll({
    where: {
      t_class_id: req.params.id,
      status: ACTIVE,
      sec_group_id: 3
    }
  });

  //authorization check
  var checkUser = await model_class_member.findOne({
    where: {
      t_class_id: req.params.id,
      status: ACTIVE,
      sec_user_id: req.user.id,
      sec_group_id: { [Op.or]: [1, 2, 3] }
    }
  });
  var isStudent = false;
  var hasAuthority = false;
  if (checkUser) {
    if (checkUser.sec_group_id === 3) {
      isStudent = true;
    }
    if (checkUser.sec_group_id === 1 || checkUser.sec_group_id === 2) {
      hasAuthority = true;
    }
  }
  res.json({
    isStudent: isStudent,
    hasAuthority: hasAuthority,
    totalStudents: students.count
  });
};

exports.findOne = async function (req, res) {
  const model_task = t_class_task();
  var datum = await model_task.findOne({ where: { id: req.params.id, status: ACTIVE } });
  if (!datum) {
    res.status(411).json({ error: 11, message: 'Task tidak ditemukan' });
    return;
  }
  var result = datum.toJSON();
  var files = await t_class_task_file().findAll({
    where: { t_class_task_id: req.params.id, status: ACTIVE }
  });
  result.files = files;
  if (datum.t_class_subject_id) {
    var subject = await t_class_subject().findOne({
      where: { id: datum.t_class_subject_id }
    });
    result.subject = subject.name;
  } else {
    result.subject = '';
  }

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
  FROM (SELECT * from t_student WHERE class_id = :class_id AND status = ${ACTIVE}) s
  LEFT JOIN (SELECT * FROM t_class_task_collection WHERE task_id = :task_id) c ON c.student_id=s.student_id`;

  var data = await query(sql, {
    class_id: task.class_id,
    task_id: task.task_id
  });

  res.json({ data: data });
};

exports.create = async function (req, res) {
  const model_task = t_class_task();
  const model_subject = t_class_subject();
  var subject_id = null;
  if (req.body.subject) {
    var existed_subject = await model_subject.findOne({
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
      var datum = await model_subject.create(new_obj);
      subject_id = datum.id;
    }
  }
  var new_obj = {
    sec_user_id: req.user.id,
    t_class_id: req.body.class_id,
    t_class_subject_id: subject_id,
    title: req.body.title,
    notes: req.body.notes,
    start_date: req.body.start_date,
    finish_date: req.body.finish_date,
    publish_date: moment().format(),
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.email
  };
  try {
    var task = await model_task.create(new_obj);

    res.json({ data: task });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_task = t_class_task();
  const model_subject = t_class_subject();
  const transaction = await beginTransaction();
  var subject_id = null;
  if (req.body.subject) {
    var existed_subject = await model_subject.findOne({
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
        var datum = await model_subject.create(new_obj, { transaction });
        subject_id = datum.id;
      } catch (err) {
        res.status(411).json({ error: 11, message: err.message });
      }
    }
  }
  var update_obj = {
    t_class_subject_id: subject_id,
    title: req.body.title,
    notes: req.body.notes,
    weight: req.body.weight,
    start_date: req.body.start_date,
    finish_date: req.body.finish_date,
    status: ACTIVE,
    updated_date: moment().format(),
    updated_by: req.user.email
  };
  try {
    var datum = await model_task.update(update_obj, {
      where: { id: req.body.task_id },
      transaction
    });
    await transaction.commit();
    res.json({ message: 'Tugas berhasil diubah.' });
  } catch (err) {
    await transaction.rollback();
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
      status = ARCHIVED;
      break;
    case 'published':
      status = PUBLISHED;
      break;
    case 'finished':
      status = FINISHED;
      break;
    default:
      status = DEACTIVE;
  }

  if (status === DEACTIVE) {
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
  const form = formidable();
  const task_id = req.params.id;

  var task = await t_class_task().findOne({ where: { id: req.params.id } });
  if (!task) {
    res.status(404).json({ error: 31, message: 'Tugas tidak ditemukan.' });
    return;
  }

  let { fields, files } = await new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files: files.files });
    });
  });

  var parameter = m_param();
  var UPLOAD_DIR = await parameter.findOne({
    attributes: ['value'],
    where: { name: 'UPLOAD_DIR' }
  });
  var upload_dir = UPLOAD_DIR.value + '/task_' + task_id + '/';
  if (!fs.existsSync(upload_dir)) {
    fs.mkdirSync(upload_dir);
  }
  let filename = upload_dir + files.name;
  try {
    var write = await MoveFile(files.path, filename);
    let new_file = {
      t_class_task_id: task_id,
      filename: files.name,
      ext: filename.split('.').pop(),
      mime_type: files.type,
      location: filename,
      sequence: 0, //todo ambil dari terakhir
      status: ACTIVE
    };

    var task_file = await t_class_task_file().findOne({
      where: { t_class_task_id: task_id, filename: files.name }
    });
    if (!task_file) {
      // belum ada, insert baru
      try {
        task_file = await t_class_task_file().create(new_file);
      } catch (err) {
        res.status(411).json({ error: 11, message: err.message });
      }
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
    res.json({ data: task_file });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.uploadTaskLink = async function (req, res) {
  const task_id = req.params.id;
  const name = req.body.task_name;
  const links = req.body.links;
  const transaction = await beginTransaction();
  for (link of links) {
    var new_link = {
      t_class_task_id: task_id,
      filename: name,
      status: ACTIVE,
      link: link,
      created_date: moment().format(),
      created_by: req.user.id
    };
    try {
      var datum = await t_class_task_file().create(new_link, { transaction });
    } catch (err) {
      await transaction.rollback();
      res.status(411).json({ error: 11, message: err.message });
    }
  }
  await transaction.commit();
  res.json({ message: 'Tautan berhasil diunggah' });
};

exports.delete = async function (req, res) {
  const model_task = t_class_task();
  try {
    var update = await model_task.update({ status: DELETED }, { where: { id: req.params.id } });
    res.json({ message: 'Data has been deleted.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.deleteFileById = async function (req, res) {
  const model_task = t_class_task_file();
  try {
    var update = await model_task.update(
      { status: DELETED },
      { where: { id: req.params.file_id } }
    );
    res.json({ message: 'Data has been deleted.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
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

exports.submitTask = async function (req, res) {
  const task_id = req.body.task_id;
  var task = await t_class_task().findOne({ where: { id: task_id } });
  if (!task) {
    res.status(404).json({ error: 31, message: 'Task tidak ditemukan.' });
    return;
  }
  // var task_collection = await t_class_task_collection().findOne({
  //   where: { sec_user_id: req.user.id, t_class_task_id: task.id, status: ACTIVE }
  // });

  new_obj = {
    t_class_task_id: task_id,
    sec_user_id: req.user.id,
    submitted_date: moment().format(),
    content: req.body.comment,
    status: ACTIVE,
    created_date: moment().format()
  };

  const transaction = await beginTransaction();
  try {
    // if (task_collection) {
    //     new_obj.updated_by = req.user.email
    //   new_obj.updated_date = moment().format();
    //     var update = await t_class_task_collection().update(new_obj, { transaction });
    //   }
    var task_collection = await t_class_task_collection().create(new_obj, { transaction });
    const submitted_link = req.body.link;
    if (submitted_link.length > 0) {
      for (let link of submitted_link) {
        let new_link = {
          t_class_task_collection_id: task_collection.id,
          filename: task.title,
          status: 1,
          link: link
        };
        var save_link = await t_class_task_collection_file().create(new_link, { transaction });
      }
    }
    await transaction.commit();
    res.json({ data: task_collection });
  } catch (err) {
    await transaction.rollback();
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.submitTaskFile = async function (req, res) {
  const form = formidable({ multiples: true });
  const task_collection_id = req.params.id;

  var task_collection = await t_class_task_collection().findOne({
    where: { id: req.params.id }
  });
  let result = [];
  if (!task_collection) {
    res.status(404).json({ error: 31, message: 'Task collection tidak ditemukan.' });
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
  var upload_dir = UPLOAD_DIR.value + '/task_collection_' + task_collection_id + '/';
  if (!fs.existsSync(upload_dir)) {
    fs.mkdirSync(upload_dir);
  }
  for (const element of files) {
    let filename = upload_dir + element.name;
    await MoveFile(element.path, filename);
    let new_file = {
      t_class_task_collection_id: task_collection_id,
      filename: element.name,
      ext: filename.split('.').pop(),
      mime_type: element.type,
      location: filename,
      sequence: 0, //todo ambil dari terakhir
      status: 1
    };

    var task_file = await t_class_task_collection_file().findOne({
      where: { t_class_task_collection_id: task_collection_id, filename: element.name }
    });
    if (!task_file) {
      // belum ada, insert baru
      task_file = await t_class_task_collection_file().create(new_file);
    } else {
      // todo, update ganti updated date
      new_file.updated_date = moment().format();
      new_file.updated_by = req.user.email;
      try {
        var update = await t_class_task_collection_file().update(new_file, {
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
