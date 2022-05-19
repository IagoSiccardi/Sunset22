const path = require ('path')
const fs = require('fs')

const products = require ('../data/products.json')


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

        const {id} = req.params
        const product = products.find(product => product.id == +id)
        
        return res.render ('./products/productDetail',{
            product,
            products,
            result

        })
    },

    colecciones: (req,res) => {

        const {colections} = req.params
        
        const colecction = products.find(products => products.colecction == colections)

        const resultado = products.filter(product => product.colecction == colections)

        console.log(result)

       

        return res.render('./products/colecciones',{
            products,
            colecction,
            colections,
            resultado
            

        })
    },

    productos: (req,res) => {

       const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')))

        return res.render ('./products/productos',{
            products
        })
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
            image: 'default-img.png'
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
                image : 'default-img.png'
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

        res.redirect('/products')


    }
}