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
    m_notification_type_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'm_notification_type_id',
      references: {
        key: 'id',
        model: 'm_notification_type_model'
      }
    },
    out_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'out_id'
    },
    out_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'out_name'
    },
    is_recieve_web: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'is_recieve_web'
    },
    is_recieve_email: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'is_recieve_email'
    },
    is_recieve_sms: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'is_recieve_sms'
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
    tableName: 'm_notification_default',
    comment: '',
    indexes: [
      {
        name: 'm_notification_type_id',
        unique: false,
        type: 'BTREE',
        fields: ['m_notification_type_id']
      }
    ]
  };
  const MNotificationDefaultModel = sequelize.define(
    'm_notification_default_model',
    attributes,
    options
  );
  return MNotificationDefaultModel;
};
