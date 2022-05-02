module.exports = {
    productCart: (req,res) => {
        res.render ('./products/productCart')
    },
    
    productDetail: (req,res) => {
        res.render ('./products/productDetail')
    },

    productos: (req,res) => {
        res.render ('./products/productos')
    }
}