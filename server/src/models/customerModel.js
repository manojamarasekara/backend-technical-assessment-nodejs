// models/Medications.js
const { DataTypes } = require('sequelize');
const { conn } = require('../config/database');

const Customer = conn.define('Customers', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: conn.Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'createdAt'
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: conn.Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'updatedAt'
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: conn.Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'deletedAt'
  }
}, {
  conn,
  tableName: 'customers',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});

module.exports = Customer;
