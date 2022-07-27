
console.log('script done')

let burgerButton = document.getElementById('burgerMenu')
let responsiveMenu = document.getElementById('responsiveMenu')
let contador = 0


burgerButton.addEventListener('click', () => {
    
    setTimeout(()=> {
        responsiveMenu.classList.toggle('show')
    },300)

    if(contador === 0){
        setTimeout(() => {
          responsiveMenu.style.zIndex = ('1')
       },700)
       contador++
    
    }else {
        contador = 0
        responsiveMenu.style.zIndex = ('-1')

        
    }
})


responsiveMenu.addEventListener('mouseover',() => {
    responsiveMenu.classList.add('show')
})

responsiveMenu.addEventListener('mouseout',() => {
    responsiveMenu.classList.remove('show')
    responsiveMenu.style.zIndex = ('-1')
})


const qs = (element) => document.getElementById(element)


let enlace = qs("enlace_random")
let price = qs("price_random")
let nameR = qs("name_random")
let enlace1 = qs("enlace_random1")
let price1 = qs("price_random1")
let nameR1= qs("name_random1")
let enlace2 = qs("enlace_random2")
let price2 = qs("price_random2")
let nameR2 = qs("name_random2")

window.addEventListener("load", async(event) => {
    
    // HEADER //
    
    let searchForm = qs('search_input')

    searchForm.addEventListener ('keydown', async function() {

        console.log(this.value)

        try {
            
            let products = []

            let response = await fetch(UrlActual + '/products/api')
            let result = await response.json()

            result.forEach(product => {

                if(product.name.toLowerCase().includes(this.value.toLowerCase())){

                    products.push(product)
                }

            });    
                
            if(products.length > 0){

                alert(products[0].name)
            }


            console.log(products)


        }catch (error) {
            console.log(error)
        }

    })



    // PRODUCT DETAIL // 

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
    

    let UrlActual = "http://localhost:3000"
    
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


    
