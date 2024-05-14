// models/Medications.js
const { DataTypes } = require('sequelize');
const { conn } = require('../config/database');

const Medication = conn.define('Medications', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  tableName: 'medications',
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

module.exports = Medication;
