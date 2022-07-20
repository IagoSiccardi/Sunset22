const path = require ('path')
const fs = require('fs')
const {validationResult} = require('express-validator')
const db = require('../database/models')


module.exports = {
    productCart: (req,res) => {
        
        return res.render ('./products/productCart')
    },
    
    productDetail: (req,res) => {

    
        const product = db.Product.findByPk(req.params.id)

        const products = db.Product.findAll()

        Promise.all([product,products])
            .then(([product,products]) => {

                return res.render ('./products/productDetail',{
                    product,
                    products
                })
            })
            .catch(error => console.log(error))
     
        
    },

    colecciones: (req,res) => {

        const {collections} = req.params
        
        
        db.Collection.findAll({
            include: [
            'products'
            ],
            where: {
                name: collections
            }
        })
            .then(collection => {

                return res.render('./products/colecciones',{
                    collection
                    
                })
            })
            .catch(error => console.log(error))
       

    },

    productos: (req,res) => {

        db.Product.findAll()
            .then(products => {
               
                return res.render ('./products/productos',{
                    products
                })
            })
            .catch(error => console.log(error))

    },

    add: (req,res) => {

       

        db.Collection.findAll({
            
            order:[["name","ASC"]]
        })
            .then(collection => {
                
                return res.render('./products/productAdd',{
                    collection
                })

            })
            .catch(error => console.log(error))

    },

    store: (req,res) => {

        let errors = validationResult(req)

        
        if(errors.isEmpty()) {
            
            const {description, name, price, discount,coleccion} =  req.body

            db.Product.create({
                name:name.trim(),
                collectionId: +coleccion,
                discount: +discount,
                price: +price,
                description: description.trim(),
                image: req.file ? req.file.filename  : 'default-img.png'
        
            })
    
                .then( () => {
    
                    return res.redirect('/products')
                })
    
                .catch(error => console.log(error))
        }else {


            db.Collection.findAll({
            
                order:[["name","ASC"]]
            })
                .then(collection => {
                    
                    return res.render('./products/productAdd',{
                        collection,
                        errores : errors.mapped(),
                        old : req.body
                    })
    
                })
                .catch(error => console.log(error))

        }




    },

    edit: (req,res) => {

        const product = db.Product.findByPk(req.params.id)

        const collection = db.Collection.findAll({
            
            order:[["name","ASC"]]
        })

        Promise.all([product,collection])

        .then(([product,collection]) => {
            return res.render('./products/productEdit',{
                collection,
                product
            })

        })
    },
    update: (req,res) => {

        let errors = validationResult(req)

        if(errors.isEmpty()){
            
            const {description, name, price, discount,coleccion} =  req.body
    
            db.Product.update(
            {
                name:name.trim(),
                collectionId: +coleccion,
                discount: +discount,
                price: +price,
                description: description.trim(),
                image: req.file ? req.file.filename  : 'default-img.png'
        
            },
            {
                where: {
                    id: req.params.id
                }
            })
    
                .then( () => {
    
                    return res.redirect('/products')
                })
    
                .catch(error => console.log(error))

        }else {


            const product = db.Product.findByPk(req.params.id)

            const collection = db.Collection.findAll({
                
                order:[["name","ASC"]]
            })
    
            Promise.all([product,collection])
    
            .then(([product,collection]) => {
                return res.render('./products/productEdit',{
                    collection,
                    product,
                    errores : errors.mapped(),
                    old : req.body
                })
    
            })

        }


        
    },

    remove:(req,res) => {

        db.Product.findByPk(req.params.id)
            .then(product => {
                if(req.file){
                    if(fs.existsSync(path.resolve(__dirname,'..', '..', 'public', 'images','Buzos',  product.image)) && product.image !== 'default-img.png'){
                        fs.unlinkSync(path.resolve(__dirname,'..', '..', 'public', 'images','Buzos',  product.image))
                    }
                }
            })

    
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
               return  res.redirect('/products')
            })

            .catch(error => console.log(error))
    

    },
    checkProducts: async(req,res) => {

       try {
            
            let result = await db.Product.findAll({
                limit: 9
            })

            return res.status(200).json(result)

        } catch (error) {

            return res.status(500).json(error)
        }
    }
}