const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const product = require('./product')
const user = require('./user')

router.use(authController.checkAuth)
router.use('/product', product)
router.use('/', user)
module.exports = router
