const express = require ('express')
const router = express.Router()
const multer = require('multer')
const path = require ('path')
const {productCart,productDetail,productos,colecciones,add,edit,store,update,remove} = require ('../controllers/productController')
const adminCheck = require('../middlewares/adminCheck')
const productsValidator = require('../validations/productValidator')

/* Multer */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./public/images/Buzos')
    },
    filename: (req,file,cb) => {
        
        const newFileName = 'img-' + Date.now() + path.extname(file.originalname)
        
        cb(null, newFileName)
    }
})

const upload = multer({storage})

/* /products */

router.get('/', productos)
router.get ('/cart', productCart)
router.get('/detail/:id', productDetail)
router.get('/colecciones/:collections', colecciones)

router.get('/add',adminCheck,add )
router.post('/add', upload.single('imagen'),productsValidator, store)


router.get('/edit/:id',adminCheck, edit)
router.put('/edit/:id', upload.single('imagen'),productsValidator, update)

router.delete('/remove/:id',adminCheck, remove)



module.exports = router