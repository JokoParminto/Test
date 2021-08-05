const express = require('express')
const router = express.Router()

const product = require('../../controller/productController')
const authController = require('../../controller/authController')

/* Protect all routes after this middleware */
router.use(authController.protect)

/* Only admin have permission to access for the below APIs */ 
router.use(authController.restrictTo('admin'))

router.post('/create', product.create)
router.put('/update', product.update)
router.get('/list', product.getAll)
router.get('/detail', product.detail)
router.delete('/delete', product.delete)

module.exports = router

