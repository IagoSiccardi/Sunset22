var express = require('express');
var router = express.Router();
const {addItem,list,removeAll,removeItem,removeItemAll} = require ('../controllers/cartController')


// cartApi //

router.get('/show-items', list);
router.post('/add-items', addItem);
router.post('/remove-item', removeItem)



module.exports = router