const Database = require ('../database')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

const Product = Database.define('product', {
  product_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  product_price: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
})

module.exports = Product