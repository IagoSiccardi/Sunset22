const express = require ('express')
const router = express.Router()
const {productCart,productDetail,productos} = require ('../controllers/productController')

/* /products */

router.get('/', productos)
router.get ('/productCart', productCart)
router.get('/productDetail', productDetail)


module.exports = router