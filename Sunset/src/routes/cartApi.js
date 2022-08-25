var express = require('express');
var router = express.Router();
const {addItem,list,removeAll,removeItem,removeItemAll} = require ('../controllers/cartController')


// cartApi //

router.get('/show-items', list);
router.post('/add-items', addItem);



module.exports = router