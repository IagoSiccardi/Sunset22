const products = require ('../data/products.json')


const getRandom = (min, max) => {

    return Math.round( Math.random() * (max - min) + min)

  }


  

module.exports = {
    productCart: (req,res) => {
        
        res.render ('./products/productCart')
    },
    
    productDetail: (req,res) => {

        const {id} = req.params
        const product = products.find(product => product.id == +id)
        
        res.render ('./products/productDetail',{
            product,
            getRandom

        })
    },

    productos: (req,res) => {
        res.render ('./products/productos',{
            products
        })
    }
}