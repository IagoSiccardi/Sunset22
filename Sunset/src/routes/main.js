var express = require('express');
var router = express.Router();
const {home,error404,nosotros} = require ('../controllers/mainController')



router.get('/', home);
router.get('/nosotros', nosotros);


module.exports = router;
