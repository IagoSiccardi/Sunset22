const products = require ('../data/products.json')


const getRandom = (min, max) => {

    return Math.round( Math.random() * (max - min) + min)

  }
  
  const resultado = (getRandom(1,products.length))
  const resultado2 = (getRandom(1,products.length))
  const resultado3 = (getRandom(1,products.length))
  let result = []
  
for (let i = 0; i < 1; i++) {


    result.push(resultado)
    result.push(resultado2)
    result.push(resultado3)

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

    productos: (req,res) => {
        res.render ('./products/productos',{
            products
        })
    }
}