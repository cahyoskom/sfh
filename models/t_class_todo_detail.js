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
    t_class_todo_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 't_class_todo_id',
      references: {
        key: 'id',
        model: 't_class_todo_model'
      }
    },
    m_answer_type_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'm_answer_type_id',
      references: {
        key: 'id',
        model: 'm_answer_type_model'
      }
    },
    type: {
      type: DataTypes.ENUM('todo', 'popquiz'),
      allowNull: false,
      defaultValue: 'todo',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'type'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'content'
    },
    valid_answer: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'valid_answer'
    },
    is_recurrent: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'is_recurrent'
    },
    todo_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'todo_date'
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
    tableName: 't_class_todo_detail',
    comment: '',
    indexes: [
      {
        name: 't_class_todo_id',
        unique: false,
        type: 'BTREE',
        fields: ['t_class_todo_id']
      },
      {
        name: 'm_answer_type_id',
        unique: false,
        type: 'BTREE',
        fields: ['m_answer_type_id']
      }
    ]
  };
  const TClassTodoDetailModel = sequelize.define('t_class_todo_detail_model', attributes, options);
  return TClassTodoDetailModel;
};
