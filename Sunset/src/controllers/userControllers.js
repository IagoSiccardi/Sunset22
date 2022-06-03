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

        const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','users.json'),'utf-8'))

        let usuario = usuarios.find(usuario => usuario.id === req.session.userLogin.id)

        res.render('./users/profile',{
            usuario
        })
    },
    uploadProfile : (req,res) => {
        const {nombreApellido} = req.body

        const {id} = usuarios.find(usuario => usuario.id === req.session.userLogin.id)

        const usersEdit = usuarios.map(usuario => {
            if (usuario.id === +id){
                let userEdit = {
                    ...usuario,
                    name : nombreApellido.trim(),
                    img : req.file ? req.file.filename : usuario.img
                }

                if(req.file){
                   if( fs.existsSync(path.resolve(__dirname,'..','..','public', 'images', 'users', usuario.img)) && usuario.img !== 'default-img.png'){
                       fs.unlinkSync(path.resolve(__dirname,'..','..','public', 'images', 'users', usuario.img))
                   }
                }

                return userEdit
            } 

            return usuario
        })

        fs.writeFileSync(path.resolve(__dirname, '..' , 'data' , 'users.json'),JSON.stringify(usersEdit,null,3),'utf-8')

        res.redirect('/')

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