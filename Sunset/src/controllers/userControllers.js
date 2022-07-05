const db = require('../database/models')
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

            db.User.findOne({
                where: {
                    email: req.body.email
                },
                include: ["rol"]
            })

            .then((user) => {

            req.session.userLogin = {
                id: user.id,
                name: user.name,
                rol: user.rol.name
            }


            if(req.body.recordame === "on"){
                res.cookie("userSunset",req.session.userLogin,{maxAge: 1000*60*120})
            }

           return res.redirect('/')

        })

            .catch(error => console.log(error))

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

        db.User.findByPk(req.session.userLogin.id,{
            include: ["rol"]
        })
            .then(usuario => {
                    
                    return res.render('./users/profile',{
                    usuario
                })
       
            })
            .catch(error => console.log(error))
    

    },
    uploadProfile : (req,res) => {

        const {nombreApellido} = req.body


        db.User.findByPk(req.session.userLogin.id)
            .then(user => {
                
                db.User.update({
        
                    name: nombreApellido.trim(),
                    avatar: req.file ? req.file.filename : user.avatar
        
                },
                {
                    where: {
                        id: req.session.userLogin.id
                    }
                })
                    .then(() => {

                        if(req.file){
                            if( fs.existsSync(path.resolve(__dirname,'..','..','public', 'images', 'users', user.avatar)) && user.avatar !== 'default-img.png'){
                                fs.unlinkSync(path.resolve(__dirname,'..','..','public', 'images', 'users', user.avatar))
                            }
                         }
                        return res.redirect('/')
                    } )

            })
            .catch(error => console.log(error))

    },

    register: (req,res) => {
        res.render('./users/register')
    },

    processRegister: (req,res)=> {

        let errors = validationResult(req)

        if(errors.isEmpty()){
             const {nombreApellido,email,password} = req.body


             db.User.create({
                name : nombreApellido.trim(),
                 email: email.trim(),
                 password: bcrypt.hashSync(password,10),
                 avatar : 'default-img.png',
                 rolId : 2
             })

             .then(user => {

                 req.session.userLogin = {
                     id: user.id,
                     name : user.name,
                     rolId: user.rolId
                     }
     
                 res.cookie("userSunset",req.session.userLogin,{maxAge: 1000*60*120})
     
                 res.redirect('/')
             })


        } 

        else {
            return res.render('./users/register',{
                errores : errors.mapped(),
                old : req.body
            })
        }

    }
}