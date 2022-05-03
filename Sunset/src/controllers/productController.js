const products = require ('../data/products.json')

module.exports = {
    productCart: (req,res) => {
        
        res.render ('./products/productCart')
    },
    
    productDetail: (req,res) => {

        const {id} = req.params
        const product = products.find(product => product.id == +id)
        
        res.render ('./products/productDetail',{
            product,

        })
    },

    productos: (req,res) => {
        res.render ('./products/productos')
    }
}