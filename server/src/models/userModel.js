// models/User.js
const { DataTypes } = require('sequelize');
const { conn } = require('../config/database');

const User = conn.define('User', {
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
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Owner','Manager','Cashier'),
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
    tableName: 'users',
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
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });

module.exports = User;
