const express = require ('express')
const router = express.Router()
const multer = require('multer')
const path = require ('path')
const {productCart,productDetail,productos,colecciones,add,edit,store,update,remove} = require ('../controllers/productController')


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
router.get('/colecciones/:colections', colecciones)

router.get('/add', add )
router.post('/add', upload.single('imagen'), store)


router.get('/edit/:id', edit)
router.put('/edit/:id',upload.single('imagen'), update)

router.delete('/remove/:id', remove)



module.exports = router