const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    task_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "task_id"
    },
    assignor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "assignor_id",
      references: {
        key: "user_id",
        model: "sec_user_model"
      }
    },
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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
      allowNull: false,
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
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "title"
    },
    notes: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "notes"
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: "0.00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "weight"
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "start_date"
    },
    finish_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "finish_date"
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "publish_date"
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
    tableName: "t_task",
    comment: "",
    indexes: [{
      name: "fk_t_task_sec_user",
      unique: false,
      type: "BTREE",
      fields: ["assignor_id"]
    }, {
      name: "fk_t_task_m_class",
      unique: false,
      type: "BTREE",
      fields: ["class_id"]
    }, {
      name: "fk_t_task_m_subject",
      unique: false,
      type: "BTREE",
      fields: ["subject_id"]
    }]
  };
  const TTaskModel = sequelize.define("t_task_model", attributes, options);
  return TTaskModel;
};