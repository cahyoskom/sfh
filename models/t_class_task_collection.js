const { DataTypes } = require('sequelize');
const db = require('../database');

module.exports = sequelize => {
  if (!sequelize) sequelize = db.sequelize();

  const attributes = {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id'
    },
    t_class_task_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 't_class_task_id',
      references: {
        key: 'id',
        model: 't_class_task_model'
      }
    },
    sec_user_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: 'user that given finished task, in this case student',
      field: 'sec_user_id',
      references: {
        key: 'id',
        model: 'sec_user_model'
      }
    },
    submitted_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'submitted_date'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'content'
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'status'
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'created_date'
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'SYSTEM',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'created_by'
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_date'
    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_by'
    }
  };
  const options = {
    timestamps: false,
    tableName: 't_class_task_collection',
    comment: '',
    indexes: [
      {
        name: 't_class_task_id',
        unique: false,
        type: 'BTREE',
        fields: ['t_class_task_id']
      },
      {
        name: 'sec_user_id',
        unique: false,
        type: 'BTREE',
        fields: ['sec_user_id']
      }
    ]
  };
  const TClassTaskCollectionModel = sequelize.define(
    't_class_task_collection_model',
    attributes,
    options
  );
  return TClassTaskCollectionModel;
};
