var express = require('express');
var router = express.Router();
const {home,search,nosotros,searchApi} = require ('../controllers/mainController')



router.get('/', home);
router.get('/nosotros', nosotros);

router.get('/result',search)

router.get('/api/result',searchApi)



module.exports = router;
