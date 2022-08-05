window.addEventListener("load", async(event) => {
    
    // PRODUCT DETAIL // 
    console.log('Product detail done!')

    let id = window.location.pathname.slice(-1)
    
    
    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }



    
    let result = []
    
    for (let i = 0; i < 6; i++) {
    
        let resultado;
    
        resultado = getRandom(1,9)
            
        if (resultado !== +id && !result.includes(resultado)){
            result.push(resultado)
            
        }else {
            resultado = getRandom(1,9)
            if (resultado !== +id && !result.includes(resultado)){
                result.push(resultado)
                
            }
        }
        
        
    }
    

    
        try {
            
            let response = await fetch(UrlActual + '/products/api')
            let producto = await response.json()

            

                
             if(producto) {
        
        
                 enlace.innerHTML = `<a href="/products/detail/${producto[result[0]].id}" id="enlace_random"> <img id="image_random" src="/images/Buzos/${producto[result[0]].image}" alt="producto 1"> </a>`
                  price.innerHTML = `$${producto[result[0]].price}`
                  nameR.innerHTML =  `${producto[result[0]].name}`
         
            
         
         
                  enlace1.innerHTML = `<a href="/products/detail/${producto[result[1]].id}" id="enlace_random1"> <img id="image_random1" src="/images/Buzos/${producto[result[1]].image}" alt="producto 1"> </a>`
                  price1.innerHTML = `$${producto[result[1]].price}`
                  nameR1.innerHTML =  `${producto[result[1]].name}`
         
            
         
         
                  enlace2.innerHTML = `<a href="/products/detail/${producto[result[2]].id}" id="enlace_random1"> <img id="image_random1" src="/images/Buzos/${producto[result[2]].image}" alt="producto 1"> </a>`
                  price2.innerHTML = `$${producto[result[2]].price}`
                  nameR2.innerHTML =  `${producto[result[2]].name}`
        
             }else {
        
              return  window.location.reload()
        
             }
           
             
             
             
         } catch (error) {
             console.log(error)
         }
        
        

});
