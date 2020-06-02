const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    user_role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "user_role_id"
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_id",
      references: {
        key: "user_id",
        model: "sec_user_model"
      }
    },
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "group_id"
    },
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "class_id",
      references: {
        key: "class_id",
        model: "m_class_model"
      }
    },
    subject_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subject_id",
      references: {
        key: "subject_id",
        model: "m_subject_model"
      }
    },
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "student_id",
      references: {
        key: "student_id",
        model: "t_student_model"
      }
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status"
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_date"
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_by"
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_date"
    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_by"
    }
  };
  const options = {
    tableName: "sec_user_role",
    comment: "",
    indexes: [{
      name: "fk_sec_user_role_sec_group",
      unique: false,
      type: "BTREE",
      fields: ["user_id"]
    }, {
      name: "fk_sec_user_role_m_class",
      unique: false,
      type: "BTREE",
      fields: ["class_id"]
    }, {
      name: "fk_sec_user_role_m_subject",
      unique: false,
      type: "BTREE",
      fields: ["subject_id"]
    }, {
      name: "fk_sec_user_role_t_student",
      unique: false,
      type: "BTREE",
      fields: ["student_id"]
    }]
  };
  const SecUserRoleModel = sequelize.define("sec_user_role_model", attributes, options);
  return SecUserRoleModel;
};