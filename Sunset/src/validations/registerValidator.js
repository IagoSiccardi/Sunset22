const {check, body} = require ('express-validator')
const users = require('../data/users.json')

module.exports = [
    check('nombreApellido')
        .isLength({min:6}).withMessage('Debes colocar un minimo de 6 letras.'),

    check('email')
        .notEmpty().withMessage('Debes colocar un email.').bail()
        .isEmail().withMessage('El mail no es valido.'),

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