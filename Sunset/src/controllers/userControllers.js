const usuarios = require('../data/users.json')
const {validationResult} = require('express-validator')
const bcrypt = require ('bcryptjs')
const fs = require('fs')
const path = require('path')
module.exports = {
    login: (req,res) => {
        res.render ('./users/login')
    },

    register: (req,res) => {
        res.render('./users/register')
    },

    processRegister: (req,res)=> {

        let errors = validationResult(req)

        if(errors.isEmpty()){
             const {nombreApellido,email,password} = req.body

             const lastId = usuarios[usuarios.length - 1].id + 1

             const newUser = {
                 id : +lastId,
                 name : nombreApellido.trim(),
                 email: email.trim(),
                 password: bcrypt.hashSync(password,10),
                 img : 'default-img.png'
             }

            usuarios.push(newUser)

            fs.writeFileSync(path.resolve(__dirname,'..','data','users.json'),JSON.stringify(usuarios,null,3),'utf-8')
            
            res.redirect('/')
        } 

        else {
            return res.render('./users/register',{
                errores : errors.mapped(),
                old : req.body
            })
        }

    }
}