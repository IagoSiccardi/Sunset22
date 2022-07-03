const {check, body} = require ('express-validator')
const db = require('../database/models')

module.exports = [
    check('nombreApellido')
        .isLength({min:6}).withMessage('Debes colocar un minimo de 6 letras.'),

    check('email')
        .notEmpty().withMessage('Debes colocar un email.').bail()
        .isEmail().withMessage('El email no es valido.').bail()
        .custom(value => {
            return db.User.findOne({
              where : {
                email : value
              }
            }).then(user => {
              if(user){
                return Promise.reject()
              }
            }).catch(() => Promise.reject('Este email ya se encuentra registrado.'))
        }),
      

    check('password')
        .notEmpty().withMessage('Debes colocar una contraseña.').bail()
        .isLength({min:6}).withMessage('Debe tener un minimo de 6 caracteres'),

    body('passwordRepeat')
        .custom((value,{req})=> {
            if (value !== req.body.password) {
                return false
            }

                return true
        }).withMessage('Las contraseñas no son iguales.'),

    
    check('terminos')
        .isString('on').withMessage('Debes aceptar los terminos y condiciones.')
]