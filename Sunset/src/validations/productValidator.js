const {check} = require('express-validator')

module.exports =  [

    check("name")
        .notEmpty().withMessage('Debes colocar un nombre para el producto.').bail()
        .isLength({min:3,max:50}).withMessage('Debes colocar entre 3 y 50 caracteres.'),

    check("price")
        .notEmpty().withMessage('Debes colocar el precio del producto.'),

    check('description')
        .notEmpty().withMessage('Debes colocar un descripción para el producto').bail()
        .isLength({min:5}).withMessage('El minimo de caracteres es de 3.'),


    check('coleccion')
        .notEmpty().withMessage('Debes seleccionar una colección.')
    
]