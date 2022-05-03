const express = require ('express')
const router = express.Router()
const {productCart,productDetail,productos} = require ('../controllers/productController')

/* /products */

router.get('/', productos)
router.get ('/cart', productCart)
router.get('/detail/:id', productDetail)


module.exports = router