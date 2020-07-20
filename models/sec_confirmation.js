const { DataTypes } = require('sequelize');
const db = require('../database');

module.exports = (sequelize) => {
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
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: 'email verification, forgot passwprd, etc.',
      field: 'description'
    },
    sec_registrant_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'sec_registrant_id',
      references: {
        key: 'id',
        model: 'sec_registrant_model'
      }
    },
    sec_user_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'sec_user_id',
      references: {
        key: 'id',
        model: 'sec_user_model'
      }
    },
    sender_addr: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'sender_addr'
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'code'
    },
    is_sent: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'is_sent'
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
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'SYSTEM',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'created_by'
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
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_by'
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_date'
    }
  };
  const options = {
    timestamps: false,
    tableName: 'sec_confirmation',
    comment: '',
    indexes: [
      {
        name: 'sec_registrant_id',
        unique: false,
        type: 'BTREE',
        fields: ['sec_registrant_id']
      },
      {
        name: 'sec_user_id',
        unique: false,
        type: 'BTREE',
        fields: ['sec_user_id']
      }
    ]
  };
  const SecConfirmationModel = sequelize.define(
    'sec_confirmation_model',
    attributes,
    options
  );
  return SecConfirmationModel;
};
