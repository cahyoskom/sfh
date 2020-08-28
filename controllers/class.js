const t_class = require('../models/t_class');
const t_class_member = require('../models/t_class_member');
const t_class_subject = require('../models/t_class_subject');
const t_class_task = require('../models/t_class_task');
const t_class_task_file = require('../models/t_class_task_file');
const t_class_task_collection = require('../models/t_class_task_collection');
const t_class_task_collection_file = require('../models/t_class_task_collection_file');
const sec_group = require('../models/sec_group');
const sec_user = require('../models/sec_user');
const sec_confirmation = require('../models/sec_confirmation');
const crypto = require('crypto');
const { env } = process;
const m_param = require('../models/m_param');
const Confirmation = require('./confirmation');

const { beginTransaction } = require('../database');
const { sha256 } = require('../common/sha');
const query = require('../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
const { ACTIVE, DELETED, DEACTIVE } = require('../enums/status.enums');
const enums = require('../enums/group.enums');

exports.classMemberLinkStatus = async function (req, res) {
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
    if (rel.link_status != 1) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update({ link_status: 0 }, { where: { id: rel.id } });
      if (!datum[0]) {
        res.status(401).json({ message: 'Perubahan gagal dilakukan' });
        return;
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
        return;
      }
      res.json({ message: 'Permintaan gabung ditolak' });
    } catch (err) {
      res.status(401).json({ message: err });
    }
  } else if (request == 'aktifkan') {
    if (rel.link_status != 0 && rel.status != DEACTIVE) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { link_status: 0, status: ACTIVE },
        { where: { id: rel.id } }
      );
      if (!datum[0]) {
        res.status(401).json({ message: 'Perubahan gagal dilakukan' });
        return;
      }
      res.json({ message: 'Member diaktifkan' });
    } catch (err) {
      res.status(401).json({ message: err });
    }
  } else if (request == 'nonaktifkan') {
    if (rel.link_status != 0 && rel.status != DEACTIVE) {
      res.status(401).json({ message: 'aksi tidak cocok' });
      return;
    }
    try {
      const datum = await model_class_member.update(
        { link_status: 0, status: DEACTIVE },
        { where: { id: rel.id } }
      );
      if (!datum[0]) {
        res.status(401).json({ message: 'Perubahan gagal dilakukan' });
        return;
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
        return;
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
        status: ACTIVE,
        sec_group_id: enums.STUDENT
      }
    });
  } else {
    students = await model_class_member.findAll({
      where: {
        t_class_id: classId,
        status: ACTIVE,
        sec_group_id: enums.STUDENT,
        link_status: 0
      }
    });
  }

  for (i in students) {
    let iuser = await model_user.findOne({
      where: {
        id: students[i].sec_user_id
      }
    });
    let user = JSON.parse(JSON.stringify(iuser));

    if (students[i].status == DEACTIVE && students[i].link_status == 0) {
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
      status: ACTIVE,
      sec_group_id: 2
    }
  });
  for (i in teachers) {
    let iuser = await model_user.findOne({
      where: {
        id: teachers[i].sec_user_id
      }
    });
    let user = JSON.parse(JSON.stringify(iuser));
    if (teachers[i].status == DEACTIVE && teachers[i].link_status == 0) {
      user['link_status'] = link_status_enums[3];
    } else {
      user['link_status'] = link_status_enums[students[i].link_status];
    }
    teachersData.push(user);
  }
  data['teachers'] = teachersData;

  res.json(data);
  return;
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
      status: ACTIVE,
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
      status: ACTIVE,
      sec_group_id: enums.ADMIN
    }
  });
  var owner = await sec_user().findOne({
    where: { id: memberRelation.sec_user_id, status: ACTIVE }
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
    where: { id: req.params.id, status: ACTIVE }
  });
  if (!datum) {
    res.status(401).json({ message: 'Kelas tidak ditemukan.' });
    return;
  }

  var hasAuthority = await checkAuthority(req.user.id);

  var owner = await getClassOwner(req.params.id);

  res.status(200).json({ data: datum, hasAuthority: hasAuthority, owner: owner });
};

exports.create = async function (req, res) {
  const model_class = t_class();
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
  let loop = true;
  while (loop) {
    var code = crypto.randomBytes(3).toString('hex');
    let check_code = await t_class().findOne({
      where: { code: code }
    });
    if (!check_code) loop = false;
  }
  var new_obj = {
    t_school_id: schoolId,
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
      t_class: datum.id,
      sec_user_id: req.user.id,
      sec_group_id: 1,
      status: ACTIVE,
      link_status: 0
    };
    var member = await t_class_member().create(new_member);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.duplicate = async function (req, res) {
  const model_class = t_class();
  var datum = await model_class.findOne({
    where: { id: req.params.id, status: ACTIVE }
  });
  if (!datum) {
    res.status(401).json({ message: 'Kelas tidak ditemukan.' });
    return;
  }
  var new_obj = {
    t_school_id: datum.t_school_id,
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
  const model_class_member = t_class_member();
  let members = await model_class_member.findAll({
    where: {
      status: ACTIVE,
      t_class_id: datum.id
    }
  });
  if (members.length == 0) {
    return;
  }
  console.log(members);
  for (const indexMember in members) {
    member = members[indexMember];
    var new_member = {
      t_class_id: savedDuplicate.id,
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
  const model_class_member = t_class_member();
  var new_obj = {
    t_class_id: req.body.t_class_id,
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

async function checkResendInvitation(invitation) {
  const timeNow = moment();
  const dateCr = moment(invitation.created_date);
  const parameter = m_param();
  const DURATION = await parameter.findOne({
    attributes: ['value'],
    where: { name: 'MAIL_INTERVAL_MEMBER_INVITATION' }
  });
  dateCr.add(DURATION.value, 'hours');
  if (dateCr < timeNow) {
    invitation.status = DEACTIVE;
    await invitation.save();
    return true;
  }
  return false;
}

exports.inviteMember = async function (req, res) {
  const classId = req.body.classId;
  const sender_name = req.user.name;
  const sender_email = req.user.email;
  const position = req.body.position;
  let positions = { teacher: enums.TEACHER, student: enums.STUDENT };
  let positionEnum = positions[position.toLowerCase()];
  var check_user = await sec_user().findOne({
    where: { email: req.body.email, status: ACTIVE }
  });
  if (check_user) {
    var check_member = await t_class_member().findOne({
      where: { sec_user_id: check_user.id, t_class_id: classId, status: ACTIVE }
    });
    if (check_member) {
      res
        .status(411)
        .json({ error: null, message: 'Anggota sudah terdaftar sebagai anggota kelas' });
    } else {
      var invitation = await sec_confirmation().findOne({
        where: { sec_user_id: check_user.id, status: ACTIVE }
      });
      var description;
      if (invitation) {
        var resend = await checkResendInvitation(invitation);
        if (resend) {
          // resend email
          if (invitation.description == `CLASS_${classId}_TEACHER_INVITATION`)
            description = `CLASS_${classId}_TEACHER_REINVITATION`;
          else {
            description = `CLASS_${classId}_STUDENT_REINVITATION`;
          }
        } else {
          res.status(411).json({ error: null, message: 'Email berisi undangan sudah dikirim' });
          return;
        }
      } else {
        if (position == 'teacher') {
          description = `CLASS_${classId}_TEACHER_INVITATION`;
        } else {
          description = `CLASS_${classId}_STUDENT_INVITATION`;
        }
      }
      var getClass = await t_class().findOne({
        where: { id: classId, status: ACTIVE }
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
      try {
        const sendEmail = await Confirmation.sendEmail({
          subject,
          to_addr,
          content,
          datum
        });
        if (!sendEmail) throw sendEmail;
        try {
          var new_member = {
            t_class_id: classId,
            sec_user_id: check_user.id,
            status: ACTIVE,
            sec_group_id: positionEnum, //MAINTAINER
            created_date: moment().format(),
            created_by: 'SYSTEM',
            link_status: 2
          };
          var created = await t_class_member().create(new_member);
        } catch (err) {
          console.log(err);
          res.status(411).json({ error: null, message: err.message });
          return;
        }
        res.json({ message: `Email berisi undangan berhasil dikirim ke ${req.body.email}` });
      } catch (err) {
        res.status(411).json({ error: null, message: err.message });
      }
    }
  } else {
    res.status(411).json({ error: null, message: 'Email belum terdaftar sebagai pengguna' });
  }
};

exports.acceptInvitation = async function (req, res) {
  const code = req.query.code;
  var invitation = await sec_confirmation().findOne({
    where: { code: code }
  });
  if (!invitation) {
    res.status(411).json({ error: null, message: 'Link undangan tidak valid' });
  }
  let desc = invitation.description.split('_');
  let classId = desc[1];
  let positions = { teacher: enums.TEACHER, student: enums.STUDENT };
  let position = positions[desc[2].toLowerCase()];
  console.log(position);

  var getClass = await t_class().findOne({
    where: { id: classId }
  });
  if (invitation.status === DEACTIVE) {
    var check_member = await t_class_member().findOne({
      where: {
        sec_user_id: invitation.sec_user_id,
        t_class_id: classId,
        status: ACTIVE
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
      var updated = await sec_confirmation().update(new_obj, {
        where: { id: invitation.id }
      });
      const check_member = await t_class_member().findOne({
        where: { sec_user_id: invitation.sec_user_id, t_class_id: classId, sec_group_id: position }
      });
      if (!check_member) {
        res.status(411).json({ error: null, message: 'Undangan dibatalkan pengirim' });
        return;
      } else {
        if (check_member.status == DELETED) {
          const datum = await t_class_member().update(
            { status: ACTIVE, link_status: 0 },
            { where: { id: check_member.id } }
          );
          if (!datum[0]) {
            res.status(401).json({ message: 'Perubahan gagal dilakukan' });
            return;
          } else return;
        } else {
          const datum = await t_class_member().update(
            { link_status: 0 },
            { where: { sec_user_id: invitation.sec_user_id, status: ACTIVE } }
          );
          if (!datum[0]) {
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
      res.json({ school_name: getClass.name, is_new_member: true });
      return;
    } catch (err) {
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
    where: { sec_user_id: user.id, status: ACTIVE }
  });

  data = [];
  for (i in memberData) {
    let getclass = await t_class().findOne({
      where: { id: memberData[i].t_class_id, status: ACTIVE }
    });
    let classData = JSON.parse(JSON.stringify(getclass));
    let ownerMember = await t_class_member().findOne({
      where: { t_class_id: getclass.id, sec_group_id: 1, status: ACTIVE }
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
