const query = require('../models/query');

module.exports.get = async user_id => {
  var sql = `SELECT r.group_id, group_name, r.class_id, class_name, 
    r.subject_id, subject_name,
    r.student_id, student_no, student_name, st.class_id student_class_id, sex
  FROM sec_user_role r
  JOIN sec_group g ON r.group_id=g.group_id
  LEFT JOIN m_class c ON c.class_id=r.class_id
  LEFT JOIN m_subject s ON s.subject_id=r.subject_id
  LEFT JOIN t_student st ON st.student_id=r.student_id
  WHERE r.user_id = :user_id AND g.status = 1 AND r.status = 1`;
  var param = { user_id: user_id };

  return await query.query(sql, param);
};

module.exports.set = async roles => {
  var result = {};
  for (var role of roles) {
    var role_id = role.group_id;
    if (!result[role_id]) {
      result[role_id] = [];
    }
    result[role_id].push(role);
  }
  return result;
};

module.exports.getStudent = async roles => {
  for (var role of roles) {
    if (!!role.student_id) {
      return {
        student_id: role.student_id,
        student_no: role.student_no,
        student_name: role.student_name,
        class_id: role.student_class_id,
        sex: role.sex
      };
    }
  }
  return null;
};
