const express = require('express')
const router = express.Router()

const authController = require('../../controller/authController')
const product = require('../../controller/productController')

router.post('/sign-up', authController.signup)
router.post('/login', authController.login)

/* Protect all routes after this middleware */
router.use(authController.protect)

/* Only admin have permission to access for the below APIs */ 
router.use(authController.restrictTo('user'))

router.get('/user/product/list', product.getAll)
router.get('/user/product/detail', product.detail)


module.exports = router