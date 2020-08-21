const m_class = require('../models/m_class');
const m_class_member = require('../models/m_class_member');
const m_subject = require('../models/m_subject');
const m_school = require('../models/m_school');
const t_task = require('../models/t_task');
const t_task_file = require('../models/t_task_file');
const t_task_collection = require('../models/t_task_collection');
const t_task_collection_file = require('../models/t_task_collection_file');
const sec_group = require('../models/sec_group');
const sec_user = require('../models/sec_user');

const { beginTransaction } = require('../database');
const { sha256 } = require('../common/sha');
const query = require('../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
const { ACTIVE, DELETED } = require('../enums/status.enums');
const enums = require('../enums/group.enums');
const crypto = require('crypto');

exports.classMemberLinkStatus = async function (req, res) {
  const userId = req.body.user;
  const classId = req.body.class;
  const model_class_member = m_class_member();
  let rel = await model_class_member.findOne({
    where: {
      status: ACTIVE,
      sec_user_id: userId,
      m_class_id: classId
    }
  });
  if (!rel) {
    res.status(401).json({ message: 'tidak ada pengguna tersebut di kelas ini' });
    return;
  }
  const request = req.body.request;
  if (request == 'setujui') {
    if (rel.link_status != 1) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update({ link_status: 0 }, { where: { id: rel.id } });
      if (!datum[0]) {
        res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      res.json({ message: 'Permintaan gabung disetujui' });
    } catch (err) {
      res.status(401).json({ message: err });
    }
  } else if (request == 'tolak') {
    if (rel.link_status != 1) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { link_status: 0, status: DELETED },
        { where: { id: rel.id } }
      );
      if (!datum[0]) {
        res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      res.json({ message: 'Permintaan gabung ditolak' });
    } catch (err) {
      res.status(401).json({ message: err });
    }
  } else if (request == 'aktifkan') {
    if (rel.link_status != 3) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update({ link_status: 0 }, { where: { id: rel.id } });
      if (!datum[0]) {
        res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      res.json({ message: 'Member diaktifkan' });
    } catch (err) {
      res.status(401).json({ message: err });
    }
  } else if (request == 'nonaktifkan') {
    if (rel.link_status != 0) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update({ link_status: 3 }, { where: { id: rel.id } });
      if (!datum[0]) {
        res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      res.json({ message: 'Member dinonaktifkan' });
    } catch (err) {
      res.status(401).json({ message: err });
    }
  } else if (request == 'batalkan') {
    if (rel.link_status != 2) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { link_status: 0, status: DELETED },
        { where: { id: rel.id } }
      );
      if (!datum[0]) {
        res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      res.json({ message: 'Permintaan gabung dibatalkan' });
    } catch (err) {
      res.status(401).json({ message: err });
    }
  } else if (request == 'keluarkan') {
    if (rel.link_status != 0) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update({ status: DELETED }, { where: { id: rel.id } });
      if (!datum[0]) {
        res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      res.json({ message: 'Berhasil dikeluarkan' });
    } catch (err) {
      res.status(401).json({ message: err });
    }
  }
};

exports.member = async function (req, res) {
  const classId = req.params.id;
  const model_class = m_class();
  const model_class_member = m_class_member();
  const model_user = sec_user();
  const link_status_enums = [
    'Disetujui',
    'Menunggu persetujuan',
    'Undangan terkirim',
    'Dinonaktifkan'
  ];

  let data = {};

  //hasAuthority
  let hasAuthority = false;
  if (req.user) {
    hasAuthority = await checkAuthority(req.user.id);
  }
  data['hasAuthority'] = hasAuthority;

  //Students
  let studentsData = [];
  let students;
  if (hasAuthority) {
    students = await model_class_member.findAll({
      where: {
        m_class_id: classId,
        status: ACTIVE,
        sec_group_id: enums.STUDENT
      }
    });
  } else {
    students = await model_class_member.findAll({
      where: {
        m_class_id: classId,
        status: ACTIVE,
        sec_group_id: enums.STUDENT,
        link_status: 0
      }
    });
  }

  for (i in students) {
    let iuser = await model_user.findOne({
      where: {
        id: students[i].sec_user_id,
        status: ACTIVE
      }
    });
    let user = JSON.parse(JSON.stringify(iuser));

    user['role'] = students[i].sec_group_id;
    user['link_status'] = link_status_enums[students[i].link_status];
    studentsData.push(user);
  }
  data['students'] = studentsData;

  // Teachers

  let teachersData = [];
  let teachers = await model_class_member.findAll({
    where: {
      m_class_id: classId,
      status: ACTIVE,
      sec_group_id: 2
    }
  });
  for (i in teachers) {
    let iuser = await model_user.findOne({
      where: {
        id: teachers[i].sec_user_id,
        status: ACTIVE
      }
    });
    let user = JSON.parse(JSON.stringify(iuser));

    user['role'] = teachers[i].sec_group_id;
    user['link_status'] = link_status_enums[teachers[i].link_status];
    teachersData.push(user);
  }
  data['teachers'] = teachersData;

  res.json(data);
  return;
};

exports.findAll = async function (req, res) {
  const model_class = m_class();
  var data = await model_class.findAll();

  res.json({ data: data });
};

async function checkAuthority(userId) {
  const model_class_member = m_class_member();
  const model_sec_group = sec_group();
  var member = await model_class_member.findAll({
    where: {
      sec_user_id: userId,
      status: ACTIVE,
      sec_group_id: { [Op.or]: [1, 2] }
    }
  });
  if (member.length > 0) {
    return true;
  }
  return false;
}

async function deleting(classId, transaction) {
  // delete class within id from classId
  const model_class = m_class();
  const datum = await model_class.update(
    { status: DELETED },
    { where: { id: classId, status: ACTIVE }, transaction }
  );
  //------------------------------------------------------------------------

  if (!datum[0]) return;

  // delete related class member within m_class_id from classId
  const model_class_member = m_class_member();
  const classmemberFilter = {
    m_class_id: classId
  };
  const classmemberIds = await model_class_member
    .findAll({
      attributes: ['id'],
      where: classmemberFilter,
      transaction
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting class member ids for next process:', classmemberIds);
  await model_class_member.update({ status: DELETED }, { where: classmemberFilter, transaction });
  //------------------------------------------------------------------------

  // delete related subject within m_class_id from classId
  const model_subject = m_subject();
  const subjectFilter = {
    m_class_id: classId
  };
  const subjectIds = await model_subject
    .findAll({
      attributes: ['id'],
      where: subjectFilter,
      transaction
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting subject ids for next process:', subjectIds);
  await model_subject.update({ status: DELETED }, { where: subjectFilter, transaction });
  //------------------------------------------------------------------------

  // delete related task within m_class_id from classId
  const model_task = t_task();
  const taskFilter = {
    m_class_id: classId
  };
  const taskIds = await model_task
    .findAll({
      attributes: ['id'],
      where: taskFilter,
      transaction
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting task ids for next process:', taskIds);
  await model_task.update({ status: DELETED }, { where: taskFilter, transaction });
  //------------------------------------------------------------------------

  // delete related task file within t_task_id from previous process when getting task ids
  const model_task_file = t_task_file();
  const taskfileFilter = {
    t_task_id: { [Op.in]: taskIds }
  };
  const taskfileIds = await model_task_file
    .findAll({
      attributes: ['id'],
      where: taskfileFilter,
      transaction
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting task file ids for next process:', taskfileIds);
  await model_task_file.update({ status: DELETED }, { where: taskfileFilter, transaction });
  //------------------------------------------------------------------------

  // delete related task collection within t_task_id from previous process when getting task ids
  const model_task_collection = t_task_collection();
  const taskcollectionFilter = {
    t_task_id: { [Op.in]: taskIds }
  };
  const taskcollectionIds = await model_task_collection
    .findAll({
      attributes: ['id'],
      where: taskcollectionFilter,
      transaction
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting task collection ids for next process:', taskcollectionIds);
  await model_task_collection.update(
    { status: DELETED },
    { where: taskcollectionFilter, transaction }
  );
  //------------------------------------------------------------------------

  // delete related task collection file within t_task_id from previous process when getting task ids
  const model_task_collection_file = t_task_collection_file();
  const taskcollectionfileFilter = {
    t_task_collection_id: {
      [Op.in]: taskcollectionIds
    }
  };
  await model_task_collection_file.update(
    { status: DELETED },
    {
      where: taskcollectionfileFilter,
      transaction
    }
  );

  return true;
}

exports.findOne = async function (req, res) {
  const model_class = m_class();
  var datum = await model_class.findOne({
    where: { id: req.params.id, status: ACTIVE }
  });
  if (!datum) {
    res.status(401).json({ message: 'Kelas tidak ditemukan.' });
    return;
  }

  var hasAuthority = await checkAuthority(req.user.id);

  res.status(200).json({ data: datum, hasAuthority: hasAuthority });
};

exports.create = async function (req, res) {
  const model_class = m_class();
  let schoolId;
  if (req.body.schoolCode) {
    let check_school = await m_school().findOne({
      where: { code: req.body.schoolCode }
    });
    if (!check_school) {
      res.status(411).json({ error: 11, message: 'kode sekolah tidak ditemukan' });
      return;
    } else schoolId = check_school.id;
  }
  let loop = true;
  while (loop) {
    var code = crypto.randomBytes(3).toString('hex');
    let check_code = await m_class().findOne({
      where: { code: code }
    });
    if (!check_code) loop = false;
  }
  var new_obj = {
    m_school_id: schoolId,
    code: code,
    name: req.body.name,
    note: req.body.note,
    description: req.body.description,
    status: 1,
    created_date: moment().format(),
    created_by: req.user.name
  };

  try {
    var datum = await model_class.create(new_obj);
    var new_member = {
      m_class: datum.id,
      sec_user_id: req.user.id,
      sec_group_id: 1,
      status: ACTIVE,
      link_status: 0
    };
    var member = await m_class_member().create(new_member);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.duplicate = async function (req, res) {
  const model_class = m_class();
  var datum = await model_class.findOne({
    where: { id: req.params.id, status: ACTIVE }
  });
  if (!datum) {
    res.status(401).json({ message: 'Kelas tidak ditemukan.' });
    return;
  }
  var new_obj = {
    m_school_id: datum.m_school_id,
    code: datum.code,
    name: datum.name,
    note: datum.note,
    description: datum.description,
    status: ACTIVE,
    created_date: moment().format()
    //created_by: req.user.name,
  };
  try {
    var savedDuplicate = await model_class.create(new_obj);
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
    return;
  }
  const model_class_member = m_class_member();
  let members = await model_class_member.findAll({
    where: {
      status: ACTIVE,
      m_class_id: datum.id
    }
  });
  if (members.length == 0) {
    return;
  }
  console.log(members);
  for (const indexMember in members) {
    member = members[indexMember];
    var new_member = {
      m_class_id: savedDuplicate.id,
      sec_user_id: member.sec_user_id,
      sec_group_id: member.sec_group_id,
      status: ACTIVE
    };
    try {
      var savedMember = await model_class_member.create(new_member);
    } catch (err) {
      console.log(err);
    }
  }
  res.json({ data: savedDuplicate });
  return;
};

exports.join = async function (req, res) {
  const model_class_member = m_class_member();
  var new_obj = {
    m_class_id: req.body.m_class_id,
    sec_user_id: req.body.sec_user_id,
    sec_group_id: req.body.sec_group_id,
    status: 1,
    created_date: moment().format(),
    created_by: req.body.name
  };
  try {
    var datum = await model_class_member.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_class = m_class();
  var update_obj = {
    m_school_id: req.body.m_school_id,
    code: req.body.code,
    name: req.body.name,
    note: req.body.note,
    description: req.body.description,
    updated_date: moment().format(),
    updated_by: req.body.name
  };
  try {
    var datum = await model_class.update(update_obj, {
      where: { id: req.params.id, status: ACTIVE }
    });
    if (!datum[0]) {
      res.status(411).json({ message: 'Kelas tidak ditemukan.' });
      console.log('class not found');
      return;
    }
    var updatedDatum = await model_class.findOne({
      where: { id: req.params.id, status: ACTIVE }
    });
    res.json({ message: 'Data has been updated.', data: updatedDatum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  const transaction = await beginTransaction();

  try {
    let message = 'Data has been deleted.';
    const process = await deleting(req.params.id, transaction);
    await transaction.commit();

    if (!process) {
      message = 'Kelas tidak ditemukan.';

      return res.status(411).json({ message });
    }

    res.json({ message });
  } catch (error) {
    console.log('ROLLBACK!', error);
    await transaction.rollback();

    res.status(411).json({ message: 'Failed delete class' });
  }
};
exports.userClasses = async function (req, res) {
  if (!req.user) {
    res.status(411).json({ message: 'Mohon login terlebih dahulu' });
  }
  const user = req.user;
  let memberData = await m_class_member().findAll({
    where: { sec_user_id: user.id, status: ACTIVE }
  });
  data = [];
  for (i in memberData) {
    let getclass = await m_class().findOne({
      where: { id: memberData[i].m_class_id, status: ACTIVE }
    });
    let classData = JSON.parse(JSON.stringify(getclass));
    let ownerMember = await m_class_member().findOne({
      where: { m_class_id: getclass.id, sec_group_id: 1, status: ACTIVE }
    });
    let owner = await sec_user().findOne({
      where: { id: ownerMember.sec_user_id, status: ACTIVE }
    });
    classData['owner'] = owner.name;
    data.push(classData);
  }
  res.json({ data: data });
  return;
};
