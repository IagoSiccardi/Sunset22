const usuarios = require('../data/users.json')
const {validationResult} = require('express-validator')
const bcrypt = require ('bcryptjs')
const fs = require('fs')
const path = require('path')

module.exports = {
    login: (req,res) => {
        res.render ('./users/login')
    },

    processLogin: (req,res) => {
        let errors = validationResult(req)
        
        
        if(errors.isEmpty()) {


            const {id, name, rol } = usuarios.find(usuario => usuario.email === req.body.email);

           req.session.userLogin = {
           id,
           name,
           rol
           }

            if(req.body.recordame === "on"){
                res.cookie("userSunset",req.session.userLogin,{maxAge: 1000*60*120})
            }

           return res.redirect('/')


        
        }
        else {
            return res.render('./users/login',{
                old : req.body,
                errores : errors.mapped()
            })
        }
    },

    logout: (req,res) => {

        req.session.destroy()
        res.cookie('userSunset', null, {maxAge:-1})

        res.redirect('/')
    },

    profile : (req,res) => {
    
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
                 img : 'default-img.png',
                 rol : 'user'
             }

            usuarios.push(newUser)

            req.session.userLogin = {
                id,
                name : nombreApellido.trim(),
                rol
                }

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