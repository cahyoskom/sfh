const db = require('../database');

const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  if (!sequelize) {
    sequelize = db.sequelize();
  }
  const attributes = {
    task_collection_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "task_collection_id"
    },
    task_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "task_id",
      references: {
        key: "task_id",
        model: "t_task_model"
      }
    },
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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
    submitted_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "submitted_date"
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
    tableName: "t_task_collection",
    timestamps: false,
    comment: "",
    indexes: [{
      name: "fk_t_task_collection_t_task",
      unique: false,
      type: "BTREE",
      fields: ["task_id"]
    }, {
      name: "fk_t_task_collection_t_studet",
      unique: false,
      type: "BTREE",
      fields: ["student_id"]
    }]
  };
  const TTaskCollectionModel = sequelize.define("t_task_collection_model", attributes, options);
  return TTaskCollectionModel;
};