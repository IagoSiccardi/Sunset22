const path = require ('path')
const fs = require('fs')

const products = require ('../data/products.json')

const db = require('../database/models')
const { error } = require('console')

const getRandom = (min, max) => {

    return Math.round( Math.random() * (max - min) + min)

  }
  
  const resultado = (getRandom(1,products.length))
  const resultado2 = (getRandom(1,products.length))
  const resultado3 = (getRandom(1,products.length))
  let result = []
  
for (let i = 0; i < 1; i++) {
    result.push(resultado,resultado2,resultado3)

}


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
        return res.render('./products/productAdd',{
            products
        })
    },

    store: (req,res) => {
        const {name,price,coleccion} = req.body

        const lastId = products[products.length -1 ].id + 1

        const newProduct = {
            
            id: lastId,
            name: name.trim(),
            price: +price,
            colecction : coleccion,
            image: req.file ? req.file.filename  : 'default-img.png'
        }

        products.push(newProduct)

        fs.writeFileSync(path.resolve(__dirname,'..', 'data', 'products.json'), JSON.stringify(products,null,3),'utf-8')

        res.redirect('/products')


    },

    edit: (req,res) => {

        const {id} = req.params

        const product = products.find(product => product.id == +id)

        return res.render('./products/productEdit',{
            product
        })
    },
    update: (req,res) => {

        const {id} = req.params

        const{name,price,coleccion} = req.body
        
        const productsEdit = products.map(product => {

        if (product.id === +id) {

            let productEdit = {
                id: +id,
                name : name.trim(),
                price: +price,
                colecction: coleccion,
                image : req.file ? req.file.filename  : 'default-img.png'
            }

            if(req.file){
                if(fs.existsSync(path.resolve(__dirname,'..', '..', 'public', 'images','Buzos',  product.image)) && product.image !== 'default-img.png'){
                    fs.unlinkSync(path.resolve(__dirname,'..', '..', 'public', 'images','Buzos',  product.image))
                }
            }

            return productEdit
        }   
        
            return product

        })

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'),JSON.stringify(productsEdit,null,3),'utf-8')

        res.redirect('/products')
    },

    remove:(req,res) => {

        const {id} = req.params

    
        const productsEdit = products.filter(product => product.id !== +id)

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'),JSON.stringify(productsEdit,null,3),'utf-8')

        if(req.file){
            if(fs.existsSync(path.resolve(__dirname,'..', '..', 'public', 'images','Buzos',  product.image)) && product.image !== 'default-img.png'){
                fs.unlinkSync(path.resolve(__dirname,'..', '..', 'public', 'images','Buzos',  product.image))
            }
        }


        res.redirect('/products')


    }
}