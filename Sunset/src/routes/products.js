const express = require ('express')
const router = express.Router()
const {productCart,productDetail,productos,colecciones,add,edit,store,update,remove} = require ('../controllers/productController')

/* /products */

router.get('/', productos)
router.get ('/cart', productCart)
router.get('/detail/:id', productDetail)
router.get('/colecciones/:colections', colecciones)

router.get('/add', add )
router.post('/add', store)


router.get('/edit/:id', edit)
router.put('/edit/:id', update)

router.delete('/remove/:id', remove)



module.exports = router