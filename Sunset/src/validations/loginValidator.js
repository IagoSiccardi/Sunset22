const {check} = require('express-validator')
const bcrypt = require ('bcryptjs')
const db = require('../database/models')

module.exports = [
    
    check('email')
        .notEmpty().withMessage('Debes colocar un email.').bail()
        .isEmail().withMessage('El email no es valido.'),

    check('password')
        .custom((value, {req}) => {

        return db.User.findOne({
          where : {
            email : req.body.email
          }
        }).then(user => {
          if(!user || !bcrypt.compareSync(value, user.password)){
            return Promise.reject()
          }
        }).catch(() => Promise.reject('Credenciales inválidas'))
      })

];
