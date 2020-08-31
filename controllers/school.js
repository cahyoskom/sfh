const { Op } = require('sequelize');
const moment = require('moment');
const crypto = require('crypto');
const randomstring = require('randomstring');
const isBase64 = require('is-base64');
const { env } = process;

const query = require('../models/query');
const m_param = require('../models/m_param');
const t_school = require('../models/t_school');
const t_school_member = require('../models/t_school_member');
const t_class = require('../models/t_class');
const t_class_member = require('../models/t_class_member');
const t_class_subject = require('../models/t_class_subject');
const t_class_task = require('../models/t_class_task');
const t_class_task_file = require('../models/t_class_task_file');
const t_class_task_collection = require('../models/t_class_task_collection');
const t_class_task_collection_file = require('../models/t_class_task_collection_file');
const t_notification_user = require('../models/t_notification_user');
const t_notification = require('../models/t_notification');
const m_notification_type = require('../models/m_notification_type');
const sec_group = require('../models/sec_group');
const sec_user = require('../models/sec_user');
const sec_confirmation = require('../models/sec_confirmation');

const { sha256 } = require('../common/sha');
const { ACTIVE, DELETED, DEACTIVE } = require('../enums/status.enums');
const { sequelize, beginTransaction } = require('../database');
const Confirmation = require('./confirmation');
const {
  SCHOOL_CHANGE_INFO,
  SCHOOL_REQUEST_CLASS,
  SCHOOL_ACCEPT_CLASS,
  SCHOOL_REJECT_CLASS,
  SCHOOL_REMOVE_CLASS,
  SCHOOL_REMOVE_USER
} = require('../enums/notification-type.enums');
const pattern = /^[0-9]*$/;

async function checkAuthority(userId) {
  const model_school_member = t_school_member();
  const model_sec_group = sec_group();
  var member = await model_school_member.findAll({
    where: { sec_user_id: userId, status: ACTIVE, sec_group_id: { [Op.or]: [1, 2] } }
    // include: [
    //   {
    //     model: model_sec_group,
    //     where: {
    //       id: {
    //         [Op.or]: [1, 2]
    //       }
    //     }
    //   }
    // ]
  });
  if (member.length > 0) {
    return true;
  }
  return false;
}

async function isNotifNeeded(type, receiver_id, out_id, out_name) {
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
  }
  if (user_notif.is_receive_web == 1) {
    return user_notif;
  } else {
    return null;
  }
}

exports.findAll = async function (req, res) {
  const model_school = t_school();
  var data = await model_school.findAll();

  res.json({ data: data });
};

exports.findOne = async function (req, res) {
  const model_school = t_school();
  var datum = await model_school.findOne({
    where: { id: req.params.id, status: ACTIVE }
  });
  if (!datum) {
    res.status(404).json({ error: null, message: 'Sekolah tidak ditemukan' });
  }

  var hasAuthority = await checkAuthority(req.user.id);
  res.json({ data: datum, hasAuthority: hasAuthority });
};

exports.findByCode = async function (req, res) {
  const model_school = t_school();
  var datum = await model_school.findOne({
    where: { code: req.params.code }
  });

  res.json({ data: datum });
};

exports.create = async function (req, res) {
  const model_school = t_school();
  var checkAvatar = isBase64(req.body.avatar, { allowMime: true });
  if (!checkAvatar) {
    res.status(401).json({ error: null, message: 'Format gambar tidak sesuai' });
  }
  var checkPhone = req.body.phone ? pattern.test(req.body.phone) : true;
  if (checkPhone == false) {
    res.status(401).json({ error: null, message: 'Nomor telepon tidak valid' });
  }
  var checkZipcode = req.body.zipcode ? pattern.test(req.body.zipcode) : true;
  if (checkZipcode == false) {
    res.status(401).json({ error: null, message: 'Kode pos tidak valid' });
  }
  var new_obj = {
    t_school_id: req.body.t_school_id,
    code: req.body.code,
    name: req.body.name,
    address: req.body.address,
    zipcode: req.body.zipcode,
    phone: req.body.phone,
    avatar: req.body.avatar,
    note: req.body.note,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.email
  };
  var datum;
  while (!datum) {
    new_obj.code = randomstring.generate(7);
    try {
      datum = await model_school.create(new_obj);
    } catch (error) {
      if (error.name == 'SequelizeUniqueConstraintError') {
        datum = null;
      } else {
        res.status(400).json({ error: null, message: error.message });
        return;
      }
    }
  }
  var new_member = {
    t_school_id: datum.id,
    sec_user_id: req.user.id,
    sec_group_id: 1, // OWNER
    status: ACTIVE,
    created_date: moment().format()
  };
  try {
    var member = await t_school_member().create(new_member);
  } catch (err) {
    res.status(411).json({ error: null, message: err.message });
  }
  res.json({ data: datum });
};

exports.join = async function (req, res) {
  const model_school_member = t_school_member();
  var new_obj = {
    t_school_id: req.body.t_school_id,
    sec_user_id: req.body.sec_user_id,
    sec_group_id: req.body.sec_group_id,
    status: 1,
    created_date: moment().format(),
    created_by: req.body.name
  };
  try {
    var datum = await model_school_member.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  var hasAuthority = await checkAuthority(req.user.id);
  if (!hasAuthority) {
    res
      .status(403)
      .json({ error: null, message: 'Pengguna tidak memiliki otoritas untuk mengubah sekolah' });
  }
  const model_school = t_school();
  var checkAvatar = isBase64(req.body.avatar, { allowMime: true });
  if (!checkAvatar) {
    res.status(401).json({ error: null, message: 'Format gambar tidak sesuai' });
  }
  var checkPhone = req.body.phone ? pattern.test(req.body.phone) : true;
  if (checkPhone == false) {
    res.status(401).json({ error: null, message: 'Nomor telepon tidak valid' });
  }
  var checkZipcode = req.body.zipcode ? pattern.test(req.body.zipcode) : true;
  if (checkZipcode == false) {
    res.status(401).json({ error: null, message: 'Kode pos tidak valid' });
  }

  var update_obj = {
    t_school_id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    zipcode: req.body.zipcode,
    phone: req.body.phone,
    avatar: req.body.avatar,
    note: req.body.note,
    status: ACTIVE,
    updated_date: moment().format(),
    updated_by: req.user.email
  };

  const transaction = await beginTransaction();
  try {
    var datum = await model_school.update(update_obj, {
      where: { id: req.body.id },
      transaction
    });

    var all_class = await t_class().findAll({
      attributes: ['id'],
      where: { t_school_id: req.body.id, status: ACTIVE, link_status: 0 }
    });
    var all_members = [];
    for (each_class of all_class) {
      var class_members = await t_class_member().findAll({
        attributes: ['sec_user_id'],
        where: { t_class_id: each_class.id, status: ACTIVE, link_status: 0 }
      });
      const result = all_members.concat(class_members).filter(function (o) {
        return this.has(o.sec_user_id) ? false : this.add(o.sec_user_id);
      }, new Set());
      all_members = result;
    }

    for (member of all_members) {
      var notif_user = await isNotifNeeded(
        SCHOOL_CHANGE_INFO,
        member.sec_user_id,
        req.body.id,
        't_school'
      );
      if (notif_user) {
        var new_obj = {
          m_notification_type_id: notif_user.m_notification_type_id,
          sender_user_id: req.user.id,
          receiver_user_id: notif_user.sec_user_id,
          out_id: req.body.id,
          out_name: 't_school',
          notification_datetime: moment().format(),
          notification_year: moment().format('YYYY'),
          notification_month: moment().format('M'),
          status: 1,
          created_date: moment().format()
        };
        var create_notif = await t_notification().create(new_obj, { transaction });
      }
    }
    await transaction.commit();
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    await transaction.rollback();
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  var hasAuthority = await checkAuthority(req.user.id);
  if (!hasAuthority) {
    res
      .status(403)
      .json({ error: null, message: 'User tidak memiliki otoritas untuk menghapus sekolah' });
  }
  // delete school within id from req.params.id
  const model_school = t_school();
  const schoolId = req.params.id;
  await model_school.update({ status: DELETED }, { where: { id: schoolId } });
  //------------------------------------------------------------------------

  // delete related school member within t_school_id from req.params.id
  const model_school_member = t_school_member();
  const schoolmemberFilter = {
    t_school_id: schoolId
  };
  const schoolmemberIds = await model_school_member
    .findAll({
      attributes: ['id'],
      where: schoolmemberFilter
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting school member ids for next process:', schoolmemberIds);
  await model_school_member.update({ status: DELETED }, { where: schoolmemberFilter });
  //------------------------------------------------------------------------

  // delete related class within t_school_id from req.params.id
  const model_class = t_class();
  const classFilter = {
    t_school_id: schoolId
  };
  const classIds = await model_class
    .findAll({
      attributes: ['id'],
      where: classFilter
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting class ids for next process:', classIds);
  await model_class.update({ status: DELETED }, { where: classFilter });
  //------------------------------------------------------------------------

  // delete related class member within t_class_id from previous process when getting class ids
  const model_class_member = t_class_member();
  const classmemberFilter = {
    t_class_id: { [Op.in]: classIds }
  };
  const classmembertIds = await model_class_member
    .findAll({
      attributes: ['id'],
      where: classmemberFilter
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting class member ids for next process:', classmembertIds);
  await model_class_member.update({ status: DELETED }, { where: classmemberFilter });
  //------------------------------------------------------------------------

  // delete related subject within t_class_id from previous process when getting class ids
  const model_subject = t_class_subject();
  const subjectFilter = {
    t_class_id: { [Op.in]: classIds }
  };
  const subjectIds = await model_subject
    .findAll({
      attributes: ['id'],
      where: subjectFilter
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting subject ids for next process:', subjectIds);
  await model_subject.update({ status: DELETED }, { where: subjectFilter });
  //------------------------------------------------------------------------

  // delete related task within t_class_subject_id from previous process when getting subject ids
  const model_task = t_class_task();
  const taskFilter = {
    t_class_subject_id: {
      [Op.in]: subjectIds
    }
  };
  const taskIds = await model_task
    .findAll({
      attributes: ['id'],
      where: taskFilter
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting task ids for next process:', taskIds);
  await model_task.update({ status: DELETED }, { where: taskFilter });
  //------------------------------------------------------------------------

  // delete related task file within t_class_task_id from previous process when getting task ids
  const model_task_file = t_class_task_file();
  const taskfileFilter = {
    t_class_task_id: { [Op.in]: taskIds }
  };
  const taskfileIds = await model_task_file
    .findAll({
      attributes: ['id'],
      where: taskfileFilter
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting task file ids for next process:', taskfileIds);
  await model_task_file.update({ status: DELETED }, { where: taskfileFilter });
  //------------------------------------------------------------------------

  // delete related task collection within t_class_task_id from previous process when getting task ids
  const model_task_collection = t_class_task_collection();
  const taskcollectionFilter = {
    t_class_task_id: { [Op.in]: taskIds }
  };
  const taskcollectionIds = await model_task_collection
    .findAll({
      attributes: ['id'],
      where: taskcollectionFilter
    })
    .map(el => el.dataValues.id);
  console.log('>> Getting task collection ids for next process:', taskcollectionIds);
  await model_task_collection.update({ status: DELETED }, { where: taskcollectionFilter });
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
      where: taskcollectionfileFilter
    }
  );

  res.json({
    message: 'Data has been deleted.'
  });
};

exports.connectClass = async function (req, res) {
  const model_class = t_class();
  var targetClass = await model_class.findOne({
    where: { code: req.body.code, status: ACTIVE }
  });
  if (!targetClass) {
    res.status(409).json({
      error: null,
      message: 'Kelas tidak ditemukan'
    });
  }
  if (targetClass.t_school_id) {
    res.status(409).json({
      error: null,
      message: 'Kelas sudah terhubung ke sekolah'
    });
  }

  var update_obj = {
    t_school_id: req.body.t_school_id,
    link_status: 2 //request by school
  };

  const transaction = await beginTransaction();
  try {
    var datum = await model_class.update(update_obj, {
      where: { id: targetClass.id },
      transaction
    });

    const model_class_member = t_class_member();
    var members = await model_class_member.findAndCountAll({
      where: { t_class_id: targetClass.id, status: ACTIVE }
    });

    var owner_id = await model_class_member.findOne({
      attributes: ['sec_user_id'],
      where: { t_class_id: targetClass.id, status: ACTIVE, sec_group_id: 1 }
    });

    var owner_name = await sec_user().findOne({
      attributes: ['name'],
      where: { id: owner_id.sec_user_id }
    });

    var notif_user = await isNotifNeeded(
      SCHOOL_REQUEST_CLASS,
      owner_id.sec_user_id,
      targetClass.id,
      't_class'
    );
    if (notif_user) {
      var new_obj = {
        m_notification_type_id: notif_user.m_notification_type_id,
        sender_user_id: req.user.id,
        receiver_user_id: notif_user.sec_user_id,
        out_id: targetClass.id,
        out_name: 't_class',
        notification_datetime: moment().format(),
        notification_year: moment().format('YYYY'),
        notification_month: moment().format('M'),
        status: 1,
        created_date: moment().format()
      };
      var create_notif = await t_notification().create(new_obj, { transaction });
    }
    await transaction.commit();
    res.json({
      id: targetClass.id,
      name: targetClass.name,
      link_status: 2,
      ownerName: owner_name.name,
      countMembers: members.count
    });
  } catch (err) {
    await transaction.rollback();
    res.status(411).json({
      error: null,
      message: err.message
    });
  }
};

exports.createClass = async function (req, res) {
  const model_class = t_class();
  var new_obj = {
    t_school_id: req.body.t_school_id,
    name: req.body.name,
    description: req.body.description,
    link_status: 0, //CONNECTED
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.email
  };
  var datum;
  while (!datum) {
    new_obj.code = randomstring.generate(7);
    try {
      datum = await model_class.create(new_obj);
    } catch (err) {
      if (error.name == 'SequelizeUniqueConstraintError') {
        datum = null;
      } else {
        res.status(400).json({ error: null, message: error.message });
        return;
      }
    }
  }
  var new_member = {
    t_class_id: datum.id,
    sec_user_id: req.user.id,
    sec_group_id: 1, // OWNER
    status: ACTIVE,
    created_date: moment().format()
  };
  try {
    var member = await t_class_member().create(new_member);
    res.json({
      id: datum.id,
      name: datum.name,
      link_status: datum.link_status,
      ownerName: req.user.name,
      countMembers: 1
    });
  } catch (err) {
    res.status(411).json({ error: null, message: err.message });
  }
};

exports.getAllClass = async function (req, res) {
  const filter = req.query.filter;
  const school_id = req.query.schoolId;
  var condition;
  if (filter !== '') {
    condition = {
      [Op.and]: [
        { t_school_id: school_id, status: ACTIVE },
        sequelize().where(sequelize().fn('lower', sequelize().col('name')), {
          [Op.like]: '%' + filter + '%'
        })
      ]
    };
  } else {
    condition = {
      t_school_id: school_id,
      status: ACTIVE
    };
  }

  try {
    var listClass = await t_class().findAll({
      attributes: [
        'id',
        'link_status',
        'name',

        [sequelize().fn('COUNT', sequelize().col('sec_user_id')), 'countMembers']
        // ['sec_user_model.name', 'ownerName']
      ],
      where: condition,
      include: [
        {
          model: t_class_member(),
          required: true,
          where: { status: ACTIVE }
        }
      ],
      group: 't_class_model.id'
    });

    res.json({ listClass });
  } catch (err) {
    res.status(411).json({ error: null, message: err.message });
  }
};

exports.approval = async function (req, res) {
  const model_class = t_class();
  var update_obj;
  if (req.body.status == 1) {
    update_obj = {
      link_status: 0, //ACCEPT
      updated_date: moment().format(),
      updated_by: req.user.email
    };
  } else {
    update_obj = {
      t_school_id: null,
      link_status: 0, //DECLINE or REMOVE
      updated_date: moment().format(),
      updated_by: req.user.email
    };
  }
  const transaction = await beginTransaction();
  try {
    var update = await model_class.update(update_obj, {
      where: { id: req.params.classId },
      transaction
    });

    var class_owner = await t_class_member().findOne({
      where: { t_class_id: req.params.classId, sec_group_id: 1, status: ACTIVE }
    });

    var notif_user = await isNotifNeeded(
      req.body.status == 1
        ? SCHOOL_ACCEPT_CLASS
        : req.body.status == 0
        ? SCHOOL_REJECT_CLASS
        : SCHOOL_REMOVE_CLASS,
      class_owner.sec_user_id,
      req.params.classId,
      't_class'
    );
    if (notif_user) {
      var new_obj = {
        m_notification_type_id: notif_user.m_notification_type_id,
        sender_user_id: req.user.id,
        receiver_user_id: notif_user.sec_user_id,
        out_id: req.params.classId,
        out_name: 't_class',
        notification_datetime: moment().format(),
        notification_year: moment().format('YYYY'),
        notification_month: moment().format('M'),
        status: 1,
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

exports.getMembers = async function (req, res) {
  const school_id = req.params.id;
  try {
    var listMembers = await t_school_member().findAll({
      attributes: ['id', 'sec_group_id', 'sec_user_id'],
      where: { t_school_id: school_id, status: ACTIVE },
      include: [
        {
          model: sec_user(),
          attributes: ['name', 'email', 'phone'],
          required: true
        }
      ]
    });
    var checkOwner = await t_school_member().findOne({
      where: { sec_user_id: req.user.id, status: ACTIVE }
    });
    var isOwner = checkOwner.sec_group_id == 1 ? true : false;
    res.json({ listMembers, isOwner });
  } catch (err) {
    res.status(411).json({ error: null, message: err.message });
  }
};

exports.changeOwner = async function (req, res) {
  const new_owner_id = req.body.id;
  const school_id = req.body.school_id;
  const old_owner_id = req.user.id;
  var new_owner = {
    sec_group_id: 1,
    updated_date: moment().format(),
    updated_by: req.user.email
  };
  var old_owner = {
    sec_group_id: 2,
    updated_date: moment().format(),
    updated_by: req.user.email
  };
  var user = await t_school_member().findOne({
    where: { sec_user_id: old_owner_id, t_school_id: school_id, status: ACTIVE }
  });
  if (user.sec_group_id !== 1) {
    res
      .status(403)
      .json({ message: 'Hanya pemilik sekolah yang dapat mengubah kepemilikan sekolah' });
  } else {
    try {
      var update_new_owner = await t_school_member().update(new_owner, {
        where: { id: new_owner_id }
      });
      var update_old_owner = await t_school_member().update(old_owner, {
        where: { sec_user_id: old_owner_id, t_school_id: school_id, status: ACTIVE }
      });

      res.json({
        message: 'Pemilik sekolah berhasil diubah!',
        new_owner_id: new_owner_id,
        old_owner_id: old_owner_id
      });
    } catch (err) {
      res.status(411).json({ error: null, message: err.message });
    }
  }
};

exports.removeMember = async function (req, res) {
  const target_id = req.body.id;

  var target_user = await t_school_member().findOne({
    where: { id: target_id }
  });
  if (target_user.sec_group_id === 1) {
    res.status(403).json({ error: null, message: 'Pemilik sekolah tidak dapat dikeluarkan' });
    return;
  }

  var obj = {
    status: DELETED,
    updated_date: moment().format(),
    updated_by: req.user.email
  };
  const transaction = await beginTransaction();
  try {
    var update = await t_school_member().update(obj, {
      where: { id: target_id },
      transaction
    });

    var change_authority;
    if (target_user.sec_user_id == req.user.id) {
      change_authority = true;
    } else {
      change_authority = false;
    }

    var notif_user = await isNotifNeeded(
      SCHOOL_REMOVE_USER,
      target_user.sec_user_id,
      target_user.t_school_id,
      't_school'
    );
    if (notif_user) {
      var new_obj = {
        m_notification_type_id: notif_user.m_notification_type_id,
        sender_user_id: req.user.id,
        receiver_user_id: notif_user.sec_user_id,
        out_id: target_user.t_school_id,
        out_name: 't_school',
        notification_datetime: moment().format(),
        notification_year: moment().format('YYYY'),
        notification_month: moment().format('M'),
        status: 1,
        created_date: moment().format()
      };
      var create_notif = await t_notification().create(new_obj, { transaction });
    }
    await transaction.commit();
    res.json({ message: 'Anggota berhasil dikeluarkan', changeAuthority: change_authority });
  } catch (err) {
    await transaction.rollback();
    res.status(411).json({ error: null, message: err.message });
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
  const school_id = req.body.school_id;
  const sender_name = req.user.name;
  const sender_email = req.user.email;
  var check_user = await sec_user().findOne({
    where: { email: req.body.email, status: ACTIVE }
  });
  if (check_user) {
    var check_member = await t_school_member().findOne({
      where: { sec_user_id: check_user.id, t_school_id: req.body.school_id, status: ACTIVE }
    });
    if (check_member) {
      res
        .status(411)
        .json({ error: null, message: 'Anggota sudah terdaftar sebagai anggota sekolah' });
    } else {
      var invitation = await sec_confirmation().findOne({
        where: { sec_user_id: check_user.id, t_school_id: school_id, status: ACTIVE }
      });
      var description;
      if (invitation) {
        var resend = await checkResendInvitation(invitation);
        if (resend) {
          // resend email
          description = 'SCHOOL_MEMBER_REINVITATION';
        } else {
          res.status(411).json({ error: null, message: 'Email berisi undangan sudah dikirim' });
          return;
        }
      } else {
        description = 'SCHOOL_MEMBER_INVITATION';
      }
      var school = await t_school().findOne({
        where: { id: school_id, status: ACTIVE }
      });
      //send invitation
      const code = crypto.randomBytes(16).toString('hex');
      const subject = `Undangan bergabung dengan ${school.name}`;
      const to_addr = check_user.email;
      const url = env.APP_BASEURL || req.headers.host;
      const content =
        'Halo,\n\n' +
        `${sender_name} (${sender_email}) mengundang Anda untuk begabung dengan ${school.name}. Klik link untuk menerima undangan: \n` +
        `${url}/invitation?q=school&code=${code}`;
      const datum = {
        description: description,
        sec_user_id: check_user.id,
        t_school_id: school_id,
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
  var school = await t_school().findOne({
    where: { id: invitation.t_school_id }
  });
  if (invitation.status === DEACTIVE) {
    var check_member = await t_school_member().findOne({
      where: {
        sec_user_id: invitation.sec_user_id,
        t_school_id: invitation.t_school_id,
        status: ACTIVE
      }
    });
    if (check_member) {
      res.status(200).json({ is_new_member: false, school_name: school.name });
    } else {
      res.status(411).json({ error: null, message: 'Link undangan tidak valid' });
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
      var ever_added_member = await t_school_member().findOne({
        where: {
          sec_user_id: invitation.sec_user_id,
          t_school_id: invitation.t_school_id
        }
      });
      if (ever_added_member) {
        ever_added_member.status = ACTIVE;
        ever_added_member.sec_group_id = 2;
        ever_added_member.updated_date = moment().format();
        var re_add = await ever_added_member.save();
      } else {
        var new_member = {
          t_school_id: invitation.t_school_id,
          sec_user_id: invitation.sec_user_id,
          status: ACTIVE,
          sec_group_id: 2, //MAINTAINER
          created_date: moment().format(),
          created_by: 'SYSTEM'
        };
        var created = await t_school_member().create(new_member);
      }
      res.json({ school_name: school.name, is_new_member: true });
    } catch (err) {
      res.status(401).json({ error: null, message: err.message });
    }
  } else {
    res.status(411).json({ error: null, message: 'Link undangan tidak valid' });
  }
};
