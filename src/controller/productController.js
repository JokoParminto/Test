const product = require('../model/productModels')
const database = require('../database')
const common = require('../utils/common')
const Sequilize = require('sequelize')

exports.create = async (req, res, next) => {
  let data
  let code = 304
  let msg = 'gagal menyimpan data'
  try {
    const create = await product.create({
      product_name: req.body.product_name,
      product_price: req.body.product_price
    })
    if (create !== null) {
      code = 201
      msg = 'data berhasil disimpan'
      data = create.dataValues
    }
    res.status(201).json({
      code: code,
      msg: msg,
      data: data || {}
    })
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  let data
  let code = 304
  let msg = 'gagal menyimpan data'
  const transaction = await database.transaction()
  try {
    let dataUpdate = {
      product_name: req.body.product_name,
      product_price: req.body.product_price
    }
    const update = await product.update(dataUpdate,
      {
        where: {
          product_id: req.body.product_id
        }
      }, {
        transaction
      }
    )
    await transaction.commit()
    if (update !== null) {
      code = 201
      msg = 'data berhasil disimpan'
      data = req.body
    }
    res.status(201).json({
      code: code,
      msg: msg,
      data: data || {}
    })
  } catch (err) {
    await transaction.rollback()
    next(err)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    let query = {}
    if (req.query.harga_diatas) {
      query.product_price = {
        [Sequilize.Op.gte]: req.query.harga_diatas
      }
    }
    console.log(query)
    let sort = 'product_id'
    let dir = 'ASC'
    let limit = parseInt(req.query ? (req.query.limit || 10) : 10)
    let pagenum = parseInt(req.query ? (req.query.pagenum || 1) : 1)
    let start = parseInt((pagenum - 1) * limit);
		const data = await product.findAndCountAll({
      where: query,
      offset: start,
      limit: limit,
      order: [[sort, dir]]
    })
    let pagination = await common.pagination(data.count, pagenum, limit)
    res.status(200).json({
      code: 200,
      msg: 'berhasil',
      data: data.rows,
      pagination: pagination
    })
  } catch (err) {
    next(err)
  }
}

exports.detail = async (req, res, next) => {
  try {
		const data = await product.findOne({
      where: { 
        product_id: req.query.id
      } 
    })
    res.status(200).json({
      code: 200,
      msg: 'berhasil',
      data: data.dataValues
    })
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
		const data = await product.destroy({
      where: { 
        product_id: req.query.id
      } 
    })
    res.status(200).json({
      code: 200,
      msg: 'berhasil',
      data: data.dataValues
    })
  } catch (err) {
    next(err)
  }
}