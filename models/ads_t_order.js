const { DataTypes } = require('sequelize');
const db = require('../database');
const sec_user = require('../models/sec_user');
const ads_m_rates = require('../models/ads_m_rates');


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
      allowNull: false,
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
    ads_m_rates_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'ads_m_rates_id',
      references: {
        key: 'id',
        model: 'ads_m_rates_model'
      }
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'content'
    },
    content_type: {
      type: DataTypes.ENUM('image', 'audio', 'video'),
      allowNull: false,
      defaultValue: 'image',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'content_type'
    },
    start_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'start_datetime'
    },
    end_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'end_datetime'
    },
    deal_price: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'deal_price'
    },
    deal_frequence: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'deal_frequence'
    },
    deal_duration: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'deal_duration'
    },
    deal_duration_unit: {
      type: DataTypes.ENUM('second', 'minute'),
      allowNull: false,
      defaultValue: 'second',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'deal_duration_unit'
    },
    order_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'order_datetime'
    },
    order_status: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'order_status'
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
    tableName: 'ads_t_order',
    comment: '',
    indexes: [
      {
        name: 'sec_user_id',
        unique: false,
        type: 'BTREE',
        fields: ['sec_user_id']
      },
      {
        name: 'ads_m_rates_id',
        unique: false,
        type: 'BTREE',
        fields: ['ads_m_rates_id']
      }
    ]
  };
  const AdsTOrderModel = sequelize.define('ads_t_order_model', attributes, options);
  AdsTOrderModel.belongsTo(sec_user(), { foreignKey: 'sec_user_id' });
  AdsTOrderModel.belongsTo(ads_m_rates(), { foreignKey: 'ads_m_rates_id' });
  return AdsTOrderModel;
};
