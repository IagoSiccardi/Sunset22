var express = require('express');
var router = express.Router();
const {login,register,processRegister} = require ('../controllers/userControllers')
const registerValidator = require ('../validations/registerValidator')

router.get ('/login', login)

router.get('/register',register)
router.post('/register',registerValidator, processRegister)





module.exports = router;
