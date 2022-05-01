const express = require ('express')
const router = express.Router()
const {error404} = require ('../controllers/errorController')

router.get ('/',error404)


module.exports = router