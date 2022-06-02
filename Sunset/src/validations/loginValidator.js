const {check} = require('express-validator')
const users = require('../data/users.json')
const bcrypt = require ('bcryptjs')

module.exports = [
    
    check('email')
        .notEmpty().withMessage('Debes colocar un email.').bail()
        .isEmail().withMessage('El email no es valido.'),

    check('password')
        .custom((value,{req}) => {
            const usuario = users.find(user => user.email === req.body.email)
            if (!usuario){
                return false
            }
            else{
                if (!bcrypt.compareSync(value,usuario.password)){
                    return false
                }
            }
            return true
        }).withMessage('Credenciales inválidas.')
]