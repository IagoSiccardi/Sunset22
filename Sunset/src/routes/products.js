const express = require ('express')
const router = express.Router()
const {productCart,productDetail,productos,colecciones} = require ('../controllers/productController')

/* /products */

router.get('/', productos)
router.get ('/cart', productCart)
router.get('/detail/:id', productDetail)
router.get('/colecciones/:colections', colecciones)


module.exports = router