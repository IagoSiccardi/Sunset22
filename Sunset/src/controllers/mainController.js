const products = require ('../data/products.json')

module.exports = {
    home : (req,res) => {
        res.render('home',{
            products
        })
    },

    nosotros: (req,res) => {
        res.render('nosotros')
    },

   
}