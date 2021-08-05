const Database = require ('../database')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

const User = Database.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_phone_number: {
	  type: Sequelize.STRING,
    allowNull: false
  },
  user_roles: {
    type: Sequelize.ENUM,
    values: ['admin', 'user']
  }
})

module.exports = User