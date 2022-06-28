const db = require('../database/models')
const {Op} = require('sequelize')

module.exports = {
    home : (req,res) => {

        db.Product.findAll()
            .then(products => {

                return res.render('home',{
                    products
                })
            })

            .catch(error => console.log(error))

      
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
        }).catch(error => console.log(error))

    }
   
}