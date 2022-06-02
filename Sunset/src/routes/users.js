var express = require('express');
var router = express.Router();
const {login,register,processRegister,processLogin,logout,profile} = require ('../controllers/userControllers')
const registerValidator = require ('../validations/registerValidator')
const loginValidator = require('../validations/loginValidator')

router.get ('/login', login)
router.post('/login',loginValidator, processLogin)

router.get('/register',register)
router.post('/register',registerValidator, processRegister)

router.get('/logout', logout)

router.get('/profile', profile)





module.exports = router;
