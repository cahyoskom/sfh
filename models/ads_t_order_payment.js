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
    ads_t_order_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'ads_t_order_id',
      references: {
        key: 'id',
        model: 'ads_t_order_model'
      }
    },
    ads_m_payment_type_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'ads_m_payment_type_id',
      references: {
        key: 'id',
        model: 'ads_m_payment_type_model'
      }
    },
    ads_m_payment_method_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'ads_m_payment_method_id',
      references: {
        key: 'id',
        model: 'ads_m_payment_method_model'
      }
    },
    amount: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'amount'
    },
    payment_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'payment_datetime'
    },
    payment_proof: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'payment_proof'
    },
    payment_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'payment_status'
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
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'status'
    }
  };
  const options = {
    timestamps: false,
    tableName: 'ads_t_order_payment',
    comment: '',
    indexes: [
      {
        name: 'ads_t_order_id',
        unique: false,
        type: 'BTREE',
        fields: ['ads_t_order_id']
      },
      {
        name: 'ads_m_payment_type_id',
        unique: false,
        type: 'BTREE',
        fields: ['ads_m_payment_type_id']
      },
      {
        name: 'ads_m_payment_method_id',
        unique: false,
        type: 'BTREE',
        fields: ['ads_m_payment_method_id']
      },
      {
        name: 'sec_user_id',
        unique: false,
        type: 'BTREE',
        fields: ['sec_user_id']
      }
    ]
  };
  const AdsTOrderPaymentModel = sequelize.define('ads_t_order_payment_model', attributes, options);
  return AdsTOrderPaymentModel;
};
