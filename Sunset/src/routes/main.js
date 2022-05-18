var express = require('express');
var router = express.Router();
const {home,search,nosotros} = require ('../controllers/mainController')



router.get('/', home);
router.get('/nosotros', nosotros);

router.get('/result',search)


module.exports = router;
