module.exports = {
    productCart: (req,res) => {
        res.render ('productCart')
    },
    
    productDetail: (req,res) => {
        res.render ('productDetail')
    },

    productos: (req,res) => {
        res.render ('productos')
    }
}