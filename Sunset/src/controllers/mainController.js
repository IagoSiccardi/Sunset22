const products = require ('../data/products.json')
const db = require('../database/models')

module.exports = {
    home : (req,res) => {

        db.Product.findAll({
            include: ['collection']
        })
            .then(products => {

                return res.render('home',{
                    products
                })
            })

      
    },

    nosotros: (req,res) => {
        return res.render('nosotros')
    },

    search: (req,res) => {

        const {keyword} = req.query

        const productsFilter = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()) || product.colecction.toLowerCase().includes(keyword.toLowerCase()))

        return res.render('result',{ 
            productsFilter,
            keyword
        })
    }
   
}