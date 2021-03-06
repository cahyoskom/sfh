const { Op } = require('sequelize');
const moment = require('moment');
const crypto = require('crypto');
const { env } = process;

const query = require('../models/query');
const m_param = require('../models/m_param');
const m_notification_type = require('../models/m_notification_type');
const sec_group = require('../models/sec_group');
const sec_user = require('../models/sec_user');
const sec_confirmation = require('../models/sec_confirmation');
const t_class = require('../models/t_class');
const t_class_member = require('../models/t_class_member');
const t_class_subject = require('../models/t_class_subject');
const t_class_task = require('../models/t_class_task');
const t_class_task_file = require('../models/t_class_task_file');
const t_class_task_collection = require('../models/t_class_task_collection');
const t_class_task_collection_file = require('../models/t_class_task_collection_file');
const t_notification_user = require('../models/t_notification_user');
const t_notification = require('../models/t_notification');
const t_school = require('../models/t_school');

const Confirmation = require('./confirmation');
const { beginTransaction } = require('../database');
const { ACTIVE, DELETED, DEACTIVE } = require('../enums/status.enums');
const { OWNER, MAINTENER, PARTICIPANT } = require('../enums/group.enums');
const { DONE, THEIRREQUEST, SELFREQUEST } = require('../enums/link-status.enums');
const {
  CLASS_CHANGE_INFO,
  CLASS_DEACTIVATE_USER,
  CLASS_ACTIVATE_USER,
  CLASS_ACCEPT_USER,
  CLASS_REJECT_USER,
  CLASS_CANCEL_INVITATION_USER,
  CLASS_REMOVE_USER,
  CLASS_DELETED,
  CLASS_DUPLICATED,
  CLASS_ACCEPT_SCHOOL,
  CLASS_REJECT_SCHOOL,
  CLASS_REMOVE_SCHOOL
} = require('../enums/notification-type.enums');
const t_school_member = require('../models/t_school_member');

async function isNotifNeeded(type, receiver_id, out_id, out_name, transaction) {
  var NOTIFICATION_TYPE = await m_notification_type().findOne({
    attributes: ['id'],
    where: { type: type }
  });

  var user_notif = await t_notification_user().findOne({
    where: {
      m_notification_type_id: NOTIFICATION_TYPE.id,
      sec_user_id: receiver_id,
      out_id: out_id,
      out_name: out_name
    }
  });
  if (!user_notif) {
    user_notif = await t_notification_user().findOne({
      where: {
        m_notification_type_id: NOTIFICATION_TYPE.id,
        sec_user_id: receiver_id,
        out_id: null,
        out_name: null
      }
    });
    if (!user_notif) {
      return null;
    }
  }

  if (user_notif.is_receive_web == 1) {
    return user_notif;
  } else {
    return null;
  }
}

exports.classMemberLinkStatus = async function (req, res) {
  const transaction = await beginTransaction();
  const userId = req.body.user;
  const classId = req.body.class;
  const model_class_member = t_class_member();
  let rel = await model_class_member.findOne({
    where: {
      status: { [Op.or]: [ACTIVE, DEACTIVE] },
      sec_user_id: userId,
      t_class_id: classId
    }
  });
  if (!rel) {
    res.status(401).json({ message: 'tidak ada pengguna tersebut di kelas ini' });
    return;
  }
  const request = req.body.request;
  if (request == 'setujui') {
    if (rel.link_status != THEIRREQUEST) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { link_status: DONE },
        { where: { id: rel.id } },
        { transaction }
      );
      var notif_user = await isNotifNeeded(
        CLASS_ACCEPT_USER,
        userId,
        classId,
        't_class',
        transaction
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: userId,
          out_id: classId,
          out_name: 't_class',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: ACTIVE,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
      if (!datum[0]) {
        await transaction.rollback();
        return res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      await transaction.commit();
      return res.json({ message: 'Permintaan gabung disetujui' });
    } catch (err) {
      await transaction.rollback();
      return res.status(401).json({ message: err });
    }
  } else if (request == 'tolak') {
    if (rel.link_status != THEIRREQUEST) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { link_status: DONE, status: DELETED },
        { where: { id: rel.id } },
        { transaction }
      );
      var notif_user = await isNotifNeeded(
        CLASS_REJECT_USER,
        userId,
        classId,
        't_class',
        transaction
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: userId,
          out_id: classId,
          out_name: 't_class',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: ACTIVE,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
      if (!datum[0]) {
        await transaction.rollback();
        return res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      await transaction.commit();
      return res.json({ message: 'Permintaan gabung ditolak' });
    } catch (err) {
      await transaction.rollback();
      return res.status(401).json({ message: err });
    }
  } else if (request == 'aktifkan') {
    if (rel.link_status != DONE && rel.status != DEACTIVE) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { link_status: DONE, status: ACTIVE },
        { where: { id: rel.id } },
        { transaction }
      );
      var notif_user = await isNotifNeeded(
        CLASS_ACTIVATE_USER,
        userId,
        classId,
        't_class',
        transaction
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: userId,
          out_id: classId,
          out_name: 't_class',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: ACTIVE,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
      if (!datum[0]) {
        await transaction.rollback();
        return res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      await transaction.commit();
      return res.json({ message: 'Member diaktifkan' });
    } catch (err) {
      await transaction.rollback();
      return res.status(401).json({ message: err });
    }
  } else if (request == 'nonaktifkan') {
    if (rel.link_status != DONE && rel.status != DEACTIVE) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { link_status: DONE, status: DEACTIVE },
        { where: { id: rel.id } },
        { transaction }
      );
      var notif_user = await isNotifNeeded(
        CLASS_DEACTIVATE_USER,
        userId,
        classId,
        't_class',
        transaction
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: userId,
          out_id: classId,
          out_name: 't_class',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: ACTIVE,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
      if (!datum[0]) {
        await transaction.rollback();
        return res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      await transaction.commit();
      return res.json({ message: 'Member dinonaktifkan' });
    } catch (err) {
      await transaction.rollback();
      return res.status(401).json({ message: err });
    }
  } else if (request == 'batalkan') {
    if (rel.link_status != SELFREQUEST) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { link_status: DONE, status: DELETED },
        { where: { id: rel.id } },
        { transaction }
      );
      var notif_user = await isNotifNeeded(
        CLASS_CANCEL_INVITATION_USER,
        userId,
        classId,
        't_class'
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: userId,
          out_id: classId,
          out_name: 't_class',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: ACTIVE,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
      if (!datum[0]) {
        await transaction.rollback();
        return res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      const confirm = await sec_confirmation().findOne({
        where: {
          sec_user_id: userId,
          description: {
            [Op.or]: [`CLASS_${classId}_TEACHER_INVITATION`, `CLASS_${classId}_STUDENT_INVITATION`]
          },
          status: { [Op.gte]: ACTIVE }
        }
      });
      if (confirm) {
        sec_confirmation().update({ status: DEACTIVE }, { where: { id: confirm.id } }, transaction);
      }
      await transaction.commit();
      return res.json({ message: 'Permintaan gabung dibatalkan' });
    } catch (err) {
      await transaction.rollback();
      return res.status(401).json({ message: err });
    }
  } else if (request == 'keluarkan') {
    if (rel.link_status != DONE) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { status: DELETED },
        { where: { id: rel.id } },
        { transaction }
      );
      var notif_user = await isNotifNeeded(
        CLASS_REMOVE_USER,
        userId,
        classId,
        't_class',
        transaction
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: userId,
          out_id: classId,
          out_name: 't_class',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: ACTIVE,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
      if (!datum[0]) {
        await transaction.rollback();
        return res.status(401).json({ message: 'Perubahan gagal dilakukan' });
      }
      await transaction.commit();
      return res.json({ message: 'Berhasil dikeluarkan' });
    } catch (err) {
      await transaction.rollback();
      return res.status(401).json({ message: err });
    }
  }
};

exports.member = async function (req, res) {
  const classId = req.params.id;
  const model_class = t_class();
  const model_class_member = t_class_member();
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
        t_class_id: classId,
        status: { [Op.or]: [ACTIVE, DEACTIVE] },
        sec_group_id: PARTICIPANT
      }
    });
  } else {
    students = await model_class_member.findAll({
      where: {
        t_class_id: classId,
        status: { [Op.gte]: ACTIVE },
        sec_group_id: PARTICIPANT,
        link_status: DONE
      }
    });
  }

  for (i in students) {
    let iuser = await model_user.findOne({
      where: {
        id: students[i].sec_user_id
      }
    });
    if (!iuser) continue;
    let user = JSON.parse(JSON.stringify(iuser));

    if (students[i].status == DEACTIVE && students[i].link_status == DONE) {
      user['link_status'] = link_status_enums[3];
    } else {
      user['link_status'] = link_status_enums[students[i].link_status];
    }
    studentsData.push(user);
  }
  data['students'] = studentsData;

  // Teachers

  let teachersData = [];
  let teachers = await model_class_member.findAll({
    where: {
      t_class_id: classId,
      status: { [Op.or]: [ACTIVE, DEACTIVE] },
      sec_group_id: MAINTENER
    }
  });
  for (i in teachers) {
    let iuser = await model_user.findOne({
      where: {
        id: teachers[i].sec_user_id
      }
    });
    if (!iuser) continue;
    let user = JSON.parse(JSON.stringify(iuser));
    if (teachers[i].status == DEACTIVE && teachers[i].link_status == DONE) {
      user['link_status'] = link_status_enums[3];
    } else {
      user['link_status'] = link_status_enums[teachers[i].link_status];
    }
    teachersData.push(user);
  }
  data['teachers'] = teachersData;
  return res.json(data);
};

exports.findAll = async function (req, res) {
  const model_class = t_class();
  var data = await model_class.findAll();

  res.json({ data: data });
};

async function checkAuthority(userId) {
  const model_class_member = t_class_member();
  const model_sec_group = sec_group();
  var member = await model_class_member.findAll({
    where: {
      sec_user_id: userId,
      status: { [Op.gte]: ACTIVE },
      sec_group_id: { [Op.or]: [1, 2] }
    }
  });
  if (member.length > 0) {
    return true;
  }
  return false;
}

async function getClassOwner(classId) {
  const model_class_member = t_class_member();
  const model_sec_group = sec_group();
  var memberRelation = await model_class_member.findOne({
    where: {
      t_class_id: classId,
      status: { [Op.gte]: ACTIVE },
      sec_group_id: OWNER
    }
  });
  var owner = await sec_user().findOne({
    where: { id: memberRelation.sec_user_id, status: { [Op.gte]: ACTIVE } }
  });
  return owner;
}

async function deleting(classId, transaction) {
  // delete class within id from classId

  const model_class = t_class();
  const datum = await model_class.update(
    { status: DELETED },
    { where: { id: classId, status: ACTIVE }, transaction }
  );

  //------------------------------------------------------------------------

  if (!datum[0]) return;

  // delete related class member within t_class_id from classId
  const model_class_member = t_class_member();
  const classmemberFilter = {
    t_class_id: classId
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

  // delete related subject within t_class_id from classId
  const model_subject = t_class_subject();
  const subjectFilter = {
    t_class_id: classId
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

  // delete related task within t_class_id from classId
  const model_task = t_class_task();
  const taskFilter = {
    t_class_id: classId
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

  // delete related task file within t_class_task_id from previous process when getting task ids
  const model_task_file = t_class_task_file();
  const taskfileFilter = {
    t_class_task_id: { [Op.in]: taskIds }
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

  // delete related task collection within t_class_task_id from previous process when getting task ids
  const model_task_collection = t_class_task_collection();
  const taskcollectionFilter = {
    t_class_task_id: { [Op.in]: taskIds }
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

  // delete related task collection file within t_class_task_id from previous process when getting task ids
  const model_task_collection_file = t_class_task_collection_file();
  const taskcollectionfileFilter = {
    t_class_task_collection_id: {
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
  const model_class = t_class();
  var datum = await model_class.findOne({
    where: { id: req.params.id, status: { [Op.gte]: ACTIVE } }
  });
  if (!datum) {
    res.status(401).json({ message: 'Kelas tidak ditemukan.' });
    return;
  }

  var hasAuthority = await checkAuthority(req.user.id);

  var owner = await getClassOwner(req.params.id);

  res.status(200).json({ data: datum, hasAuthority: hasAuthority, owner: owner });
};

async function generateClassCode() {
  let loop = true;
  let code = '';
  while (loop) {
    code = crypto.randomBytes(3).toString('hex');
    let check_code = await t_class().findOne({
      where: { code: code }
    });
    if (!check_code) loop = false;
  }
  return code;
}

exports.create = async function (req, res) {
  const transaction = await beginTransaction();
  let schoolId;
  if (req.body.schoolCode) {
    let check_school = await t_school().findOne({
      where: { code: req.body.schoolCode }
    });
    if (!check_school) {
      res.status(411).json({ error: 11, message: 'kode sekolah tidak ditemukan' });
      return;
    } else schoolId = check_school.id;
  }
  let code = await generateClassCode();
  var new_obj = {
    t_school_id: schoolId,
    code: code,
    name: req.body.name,
    note: req.body.note,
    description: req.body.description,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.name
  };

  try {
    var datum = await t_class().create(new_obj, { transaction });
    var new_member = {
      t_class_id: datum.id,
      sec_user_id: req.user.id,
      sec_group_id: 1,
      status: ACTIVE,
      link_status: DONE
    };
    var member = await t_class_member().create(new_member, { transaction });
    await transaction.commit();
    res.json({ data: datum });
  } catch (err) {
    await transaction.rollback();
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.duplicate = async function (req, res) {
  const transaction = await beginTransaction();
  const model_class = t_class();
  var datum = await model_class.findOne({
    where: { id: req.params.id, status: { [Op.gte]: ACTIVE } }
  });
  if (!datum) {
    res.status(401).json({ message: 'Kelas tidak ditemukan.' });
    return;
  }
  let code = generateClassCode();
  var new_obj = {
    t_school_id: datum.t_school_id,
    code: code,
    name: datum.name,
    note: datum.note,
    description: datum.description,
    status: ACTIVE,
    created_date: moment().format()
    //created_by: req.user.name,
  };
  try {
    var savedDuplicate = await model_class.create(new_obj, { transaction });
  } catch (err) {
    await transaction.rollback();
    res.status(411).json({ error: 11, message: err.message });
    return;
  }
  const model_class_member = t_class_member();
  let members = await model_class_member.findAll({
    where: {
      status: { [Op.gte]: ACTIVE },
      t_class_id: datum.id
    }
  });
  if (members.length == 0) {
    return;
  }
  try {
    for (const indexMember in members) {
      member = members[indexMember];
      var new_member = {
        t_class_id: savedDuplicate.id,
        sec_user_id: member.sec_user_id,
        sec_group_id: member.sec_group_id,
        status: ACTIVE
      };

      var savedMember = await model_class_member.create(new_member, { transaction });
      var notif_user = await isNotifNeeded(
        CLASS_DUPLICATED,
        member.sec_user_id,
        req.params.id,
        't_class'
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: member.sec_user_id,
          out_id: req.params.id,
          out_name: 't_class',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: ACTIVE,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
    }
    await transaction.commit();
    res.json({ data: savedDuplicate });
    return;
  } catch (err) {
    console.log(err);
    transaction.rollback();
    return res.status(411).json({ error: 11, message: err.message });
  }
};

exports.join = async function (req, res) {
  const transaction = await beginTransaction();
  const model_class_member = t_class_member();
  var new_obj = {
    t_class_id: req.body.t_class_id,
    sec_user_id: req.body.sec_user_id,
    sec_group_id: req.body.sec_group_id,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.body.name
  };
  try {
    var datum = await model_class_member.create(new_obj, { transaction });
    await transaction.commit();
    res.json({ data: datum });
  } catch (err) {
    await transaction.rollback();
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const transaction = await beginTransaction();
  const model_class = t_class();
  var update_obj = {
    t_school_id: req.body.t_school_id,
    code: req.body.code,
    name: req.body.name,
    note: req.body.note,
    description: req.body.description,
    updated_date: moment().format(),
    updated_by: req.body.name
  };
  try {
    var datum = await model_class.update(
      update_obj,
      {
        where: { id: req.params.id, status: ACTIVE }
      },
      { transaction }
    );
    let all_members = [];
    var class_members = await t_class_member().findAll({
      attributes: ['sec_user_id'],
      where: { t_class_id: req.params.id, status: { [Op.gte]: ACTIVE }, link_status: DONE }
    });
    for (membership in class_members) {
      const user = await sec_user().findOne({
        where: { id: class_members[membership].sec_user_id }
      });
      if (user) all_members.push(user);
    }
    for (member in all_members) {
      var notif_user = await isNotifNeeded(
        CLASS_CHANGE_INFO,
        all_members[member].id,
        req.params.id,
        't_class'
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: all_members[member].id,
          out_id: req.params.id,
          out_name: 't_class',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: ACTIVE,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
    }
    await transaction.commit();
    if (!datum[0]) {
      await transaction.rollback();
      res.status(411).json({ message: 'Kelas tidak ditemukan.' });
      return;
    }
    var updatedDatum = await model_class.findOne({
      where: { id: req.params.id, status: { [Op.gte]: ACTIVE } }
    });
    res.json({ message: 'Data has been updated.', data: updatedDatum });
  } catch (err) {
    await transaction.rollback();
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  const transaction = await beginTransaction();

  try {
    let message = 'Data has been deleted.';
    const process = await deleting(req.params.id, transaction);
    // await transaction.commit();
    let all_members = [];
    var class_members = await t_class_member().findAll({
      attributes: ['sec_user_id'],
      where: { t_class_id: req.params.id, status: { [Op.gte]: ACTIVE }, link_status: DONE }
    });
    for (membership in class_members) {
      const user = await sec_user().findOne({
        where: { id: class_members[membership].sec_user_id }
      });
      if (user) all_members.push(user);
    }
    for (member in all_members) {
      var notif_user = await isNotifNeeded(
        CLASS_DELETED,
        all_members[member].id,
        req.params.id,
        't_class'
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: all_members[member].id,
          out_id: req.params.id,
          out_name: 't_class',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: ACTIVE,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
    }
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

async function checkResendInvitation(transaction, invitation) {
  const timeNow = moment();
  const dateCr = moment(invitation.created_date);
  const parameter = m_param();
  const DURATION = await parameter.findOne({
    attributes: ['value'],
    where: { name: 'MAIL_INTERVAL_MEMBER_INVITATION' },
    transaction
  });
  dateCr.add(DURATION.value, 'hours');
  if (dateCr < timeNow) {
    invitation.status = DEACTIVE;
    await invitation.save({ transaction });
    return true;
  }
  return false;
}

exports.inviteMember = async function (req, res) {
  const transaction = await beginTransaction();
  const classId = req.body.classId;
  const sender_name = req.user.name;
  const sender_email = req.user.email;
  const position = req.body.position;
  let positions = { teacher: MAINTENER, student: PARTICIPANT };
  let positionEnum = positions[position.toLowerCase()];

  try {
    var check_user = await sec_user().findOne({
      where: { email: req.body.email, status: { [Op.gte]: ACTIVE } },
      transaction
    });
    if (!check_user) throw new Error('Email belum terdaftar sebagai pengguna');

    var check_member = await t_class_member().findOne({
      where: { sec_user_id: check_user.id, t_class_id: classId },
      transaction
    });
    // if (!check_member) throw new Error('Anggota tidak terdaftar sebagai anggota kelas');
    if (check_member && check_member.status == ACTIVE) {
      throw new Error('Anggota sudah terdaftar sebagai anggota kelas');
    }

    var description,
      invitation = await sec_confirmation().findOne({
        where: { sec_user_id: check_user.id, status: { [Op.gte]: ACTIVE } },
        transaction
      });
    if (!invitation) {
      if (position == 'teacher') {
        description = `CLASS_${classId}_TEACHER_INVITATION`;
      } else {
        description = `CLASS_${classId}_STUDENT_INVITATION`;
      }
    } else {
      var resend = await checkResendInvitation(transaction, invitation);
      if (!resend) throw new Error('Email berisi undangan sudah dikirim');

      // resend email
      if (invitation.description == `CLASS_${classId}_TEACHER_INVITATION`) {
        description = `CLASS_${classId}_TEACHER_REINVITATION`;
      } else {
        description = `CLASS_${classId}_STUDENT_REINVITATION`;
      }
    }

    var getClass = await t_class().findOne({
      where: { id: classId, status: { [Op.gte]: ACTIVE } },
      transaction
    });
    //send invitation
    const code = crypto.randomBytes(16).toString('hex');
    const subject = `Undangan bergabung dengan ${getClass.name}`;
    const to_addr = check_user.email;
    const url = env.APP_BASEURL || req.headers.host;
    const content =
      'Halo,\n\n' +
      `${sender_name} (${sender_email}) mengundang Anda untuk begabung dengan ${getClass.name}. Klik link untuk menerima undangan: \n` +
      `${url}/invitation?q=class&code=${code}`;
    const datum = {
      description: description,
      sec_user_id: check_user.id,
      code: code
    };
    const sendEmail = await Confirmation.sendEmail(transaction, {
      subject,
      to_addr,
      content,
      datum
    });
    if (!sendEmail) throw sendEmail;

    if (check_member) {
      var updating = await t_class_member().update(
        { ...check_member, status: ACTIVE, link_status: SELFREQUEST },
        { where: { id: check_member.id }, transaction }
      );
      if (!updating) throw updating;
    } else {
      var new_member = {
        t_class_id: classId,
        sec_user_id: check_user.id,
        status: ACTIVE,
        sec_group_id: positionEnum, //MAINTAINER
        created_date: moment().format(),
        created_by: 'SYSTEM',
        link_status: SELFREQUEST
      };
      var created = await t_class_member().create(new_member, { transaction });
      if (!created) throw created;
    }

    await transaction.commit();
    return res.json({ message: `Email berisi undangan berhasil dikirim ke ${req.body.email}` });
  } catch (e) {
    await transaction.rollback();
    res.status(411).json({ error: null, message: e.message });
  }
};

exports.acceptInvitation = async function (req, res) {
  const transaction = await beginTransaction();

  const code = req.query.code;
  var invitation = await sec_confirmation().findOne({
    where: { code: code }
  });
  if (!invitation) {
    return res.status(411).json({ error: null, message: 'Link undangan tidak valid' });
  }
  let desc = invitation.description.split('_');
  let classId = desc[1];
  let positions = { teacher: MAINTENER, student: PARTICIPANT };
  let position = positions[desc[2].toLowerCase()];

  var getClass = await t_class().findOne({
    where: { id: classId }
  });
  if (invitation.status === DEACTIVE) {
    var check_member = await t_class_member().findOne({
      where: {
        sec_user_id: invitation.sec_user_id,
        t_class_id: classId,
        status: { [Op.gte]: ACTIVE }
      }
    });
    if (check_member) {
      res.status(200).json({ is_new_member: false, school_name: getClass.name });
      return;
    } else {
      res.status(411).json({ error: null, message: 'Link undangan tidak valid' });
      return;
    }
  } else if (invitation.status === ACTIVE) {
    var new_obj = {
      status: DEACTIVE,
      updated_by: 'SYSTEM',
      updated_date: moment().format()
    };
    try {
      var updated = await sec_confirmation().update(
        new_obj,
        {
          where: { id: invitation.id }
        },
        { transaction }
      );
      const check_member = await t_class_member().findOne({
        where: { sec_user_id: invitation.sec_user_id, t_class_id: classId, sec_group_id: position }
      });
      if (!check_member) {
        res.status(411).json({ error: null, message: 'Undangan dibatalkan pengirim' });
        return;
      } else {
        if (check_member.status == DELETED) {
          const datum = await t_class_member().update(
            { status: ACTIVE, link_status: DONE },
            { where: { id: check_member.id } },
            { transaction }
          );
          if (!datum[0]) {
            res.status(401).json({ message: 'Perubahan gagal dilakukan' });
            return;
          } else return;
        } else {
          const datum = await t_class_member().update(
            { link_status: DONE },
            { where: { sec_user_id: invitation.sec_user_id, status: ACTIVE } },
            { transaction }
          );
          if (!datum[0]) {
            transaction.rollback();
            res.status(401).json({ message: 'Perubahan gagal dilakukan' });

            return;
          }
        }
      }

      // var new_member = {
      //   t_class_id: classId,
      //   sec_user_id: invitation.sec_user_id,
      //   status: ACTIVE,
      //   sec_group_id: position, //MAINTAINER
      //   created_date: moment().format(),
      //   created_by: 'SYSTEM'
      // };
      // var created = await t_class_member().create(new_member);

      transaction.commit();
      res.json({ school_name: getClass.name, is_new_member: true });
      return;
    } catch (err) {
      transaction.rollback();
      res.status(401).json({ error: null, message: err.message });
      return;
    }
  } else {
    res.status(411).json({ error: null, message: 'Link undangan tidak valid' });
  }
};

exports.userClasses = async function (req, res) {
  if (!req.user) {
    res.status(411).json({ message: 'Mohon login terlebih dahulu' });
  }

  const user = req.user;
  let memberData = await t_class_member().findAll({
    where: { sec_user_id: user.id, status: { [Op.gte]: ACTIVE } }
  });

  data = [];
  for (i in memberData) {
    let getclass = await t_class().findOne({
      where: { id: memberData[i].t_class_id, status: { [Op.gte]: ACTIVE } }
    });
    if (!getclass) continue;
    let classData = JSON.parse(JSON.stringify(getclass));
    let ownerMember = await t_class_member().findOne({
      where: { t_class_id: getclass.id, sec_group_id: 1, status: { [Op.gte]: ACTIVE } }
    });
    let owner = await sec_user().findOne({
      where: { id: ownerMember.sec_user_id, status: { [Op.gte]: ACTIVE } }
    });
    classData['owner'] = owner.name;
    data.push(classData);
  }

  res.json({ data: data });
  return;
};

exports.schoolRequest = async function (req, res) {
  const class_owner = await getClassOwner(req.params.classId);
  if (class_owner.id != req.user.id) {
    return res.status(411).json({ message: 'Akun tidak berhak melakukan perubahan' });
  }
  const classObj = await t_class().findOne({ where: { id: req.params.classId } });
  const schoolOwner = await t_school_member().findOne({
    where: { t_school_id: classObj.t_school_id, sec_group_id: OWNER }
  });

  var update_obj;
  if (req.body.accept == ACTIVE) {
    update_obj = {
      link_status: DONE, //DONE while accepted
      updated_date: moment().format(),
      updated_by: req.user.email
    };
  } else {
    update_obj = {
      t_school_id: null,
      link_status: DONE, //DONE even while decline or remove
      updated_date: moment().format(),
      updated_by: req.user.email
    };
  }
  const transaction = await beginTransaction();
  try {
    var update = await t_class().update(update_obj, {
      where: { id: req.params.classId },
      transaction
    });

    var notif_user = await isNotifNeeded(
      req.body.accept === 1
        ? CLASS_ACCEPT_SCHOOL
        : req.body.accept === 0
        ? CLASS_REJECT_SCHOOL
        : CLASS_REMOVE_SCHOOL,
      schoolOwner.sec_user_id,
      schoolOwner.t_school_id,
      't_school',
      transaction
    );
    if (notif_user) {
      var new_obj = {
        m_notification_type_id: notif_user.m_notification_type_id,
        sender_user_id: req.user.id,
        receiver_user_id: notif_user.sec_user_id,
        out_id: schoolOwner.sec_user_id,
        out_name: 't_school',
        notification_datetime: moment().format(),
        notification_year: moment().format('YYYY'),
        notification_month: moment().format('M'),
        status: ACTIVE,
        created_date: moment().format()
      };
      var create_notif = await t_notification().create(new_obj, transaction);
    }
    await transaction.commit();
    res.json({ message: 'Link status berhasil diubah' });
  } catch (err) {
    await transaction.rollback();
    res.status(411).json({ error: null, message: err.message });
  }
};
