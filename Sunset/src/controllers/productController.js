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



console.log(result)




  

module.exports = {
    productCart: (req,res) => {
        
        res.render ('./products/productCart')
    },
    
    productDetail: (req,res) => {

        const {id} = req.params
        const product = products.find(product => product.id == +id)
        
        res.render ('./products/productDetail',{
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

       

        res.render('./products/colecciones',{
            products,
            colecction,
            colections,
            resultado
            

        })
    },

    productos: (req,res) => {
        res.render ('./products/productos',{
            products
        })
    },

    add: (req,res) => {
        res.render('productAdd',{
            products
        })
    },

    edit: (req,res) => {


        res.render('productEdit',{
            products
        })
    }
}