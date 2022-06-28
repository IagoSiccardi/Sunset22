const db = require('../database/models')
const {Op} = require('sequelize')

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

        db.Product.findAll({
            where: {
                [Op.or] : [
                   { 
                    name : {
                        [Op.substring] : keyword
                    }
                   }
                ]
            }
        }).then(productsFilter => {

            return res.render('result',{ 
                productsFilter,
                keyword
            })
        })

    }
   
}