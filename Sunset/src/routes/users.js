var express = require('express');
var router = express.Router();
const {login,register,processRegister,processLogin,logout,profile,uploadProfile} = require ('../controllers/userControllers')
const registerValidator = require ('../validations/registerValidator')
const loginValidator = require('../validations/loginValidator')
const userCheck = require('../middlewares/userCheck')
const inSession = require('../middlewares/inSessionCheck')
const upload = require('../middlewares/uploadUsersImages')


router.get ('/login',inSession, login)
router.post('/login',loginValidator, processLogin)

router.get('/register',inSession,register)
router.post('/register',registerValidator, processRegister)

router.get('/logout', logout)

router.get('/profile',userCheck, profile)
router.post('/profile',upload.single('image'),uploadProfile)





module.exports = router;
