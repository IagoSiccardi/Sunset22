
console.log('Script done!')
const qs = (element) => document.getElementById(element)


// BOTON DE HAMBURGUESA//

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



let UrlActual = "http://localhost:3000"

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

   
   

    // CART //
    let body = document.querySelector('body')
    let modal = document.createElement('article')
    let cart = qs('cart_header')
    let divCart = document.createElement("div")


    const addItem = async (id) => {
        try {
          let response = await fetch("/cartApi/add-items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
            }),
          });
          let result = await response.json();
          showCart(result.carts);
        } catch (error) {
          console.error;
        }
      };

      const removeItem = async (id) => {
        try {
          let response = await fetch("/cartApi/remove-item", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
            }),
          });
          let result = await response.json();
          showCart(result.carts);
        } catch (error) {
          console.error;
        }
      };




      // MODAL CARRITO //
    
    cart && cart.addEventListener('click',async e => {
        
        e.preventDefault()
        body.appendChild(divCart)
        divCart.classList.add('containerModal')
        divCart.setAttribute('id','containerModal')

        divCart.appendChild(modal)
        modal.classList.add('modal')
        modal.setAttribute('id','modal')

        modal.innerHTML = `<i id="btn_modalClose" class="fas fa-times"></i><h2 class="CartH2">Carrito de compras</h2><div id="resultContainer_cart"  class="result_container"></div><div class="buyDivCart"><a href=# class="buyButtonCart">Comprar <i class="fas fa-credit-card"></i></a><p class="buyPCart" id="buyPCart"></p></div>`
        
        
        // MOSTRAR CARRITO //
        
        const getCart = async () => {
        
            try {
            let response = await fetch(UrlActual + '/cartApi/show-items')    
            let result = await response.json()
            return result
    
        
            }catch (error) {
                console.log(error)
            }
            
        }
        let {order,carts} = await getCart() 


        if(cart.length = 0 || order === null){

            qs('resultContainer_cart').innerHTML += '<div class="emptyCart">¡Aún no hay articulos en el carrito! </div>'
        }
        
        
        // CREACION DE ITEMS CARRITO //


        
        carts.forEach(({product,quantity}) => {
            
            
            let {image,id,name,price} = product
            
         
            
            qs('resultContainer_cart').innerHTML += `<a href=/products/detail//${id} class="result_image"><img src="/images/Buzos/${image}"></a><div class="result_description"><p class="result_name">${name}</p><span class="result_price">Cantidad: <button class="btnCart" id="btnCartRemove" value="${id}"><i class="fa-solid fa-minus"></i></button> <input type="text" value="${quantity}" id="quantityInput"> <button id="btnCartAdd" value="${id}" class="btnCart"><i class="fa-solid fa-plus"></i></button></span><span class="result_price">$${price}</span></div>`
        
        
        })

        // AÑADIR ITEM //

        let butonCartAdd = document.querySelectorAll('#btnCartAdd')

        butonCartAdd && butonCartAdd.forEach(butonAdd => {
            butonAdd.addEventListener('click', async e => {


                await addItem(butonAdd.value)


                let inputValue = butonAdd.previousSibling.previousElementSibling

                inputValue.value = +inputValue.value + 1
                
            })
            
            
        })
        

        // ELIMINAR ITEM //

        let butonCartRemove = document.querySelectorAll('#btnCartRemove')
        
        butonCartRemove && butonCartRemove.forEach(butonRemove => {
            butonRemove.addEventListener('click', async e => {

                await removeItem(butonRemove.value)


                let inputValue = butonRemove.nextSibling.nextElementSibling

                inputValue.value = +inputValue.value - 1
                
            })
            
            
        })
        


    })
    

   
   /*   qs('buyPCart').innerTEXT += `Total: $  ` */


   // CERRAR MODAL //

    modal && modal.addEventListener('click', (e) => {
        if(e.target.id === 'btn_modalClose'){
            modal.innerHTML = ''
            divCart.remove()
        }

    })

    divCart && divCart.addEventListener('click', (e) => {
        if (e.target.id === 'containerModal') {
            modal.innerHTML = ''
            divCart.remove()
        }

    })

    

    
    

    
    // HEADER //
    let header = document.querySelector('header')
    let searchForm = qs('search_form')
    let searchInput = qs('search_input')
    const div = document.createElement("div")


    // BUSCAR ITEMS //


    searchForm.addEventListener('click', () => {
        header.appendChild(div)
        div.classList.add('divHeader')

    } )

    searchInput.addEventListener ('keyup', async function() {

        if(this.value == ''){
            div.classList.remove('result_div')
            div.innerHTML = '' 
        }
        
        try {
    
    
            let response = await fetch(UrlActual + '/api/result?keyword=' +this.value)
            let result = await response.json()

            if(result.length > 0 && this.value !== ''){
                div.classList.add('result_div')
                div.innerHTML = `<a href=/products/detail/${result[0].id} class="result_container"><img class="result_image" src="/images/Buzos/${result[0].image}">
                <div class="result_description">
                <p class="result_name">${result[0].name}</p>
                <span class="result_price">$${result[0].price}</span>
                </div>
                </a>`
            }

               
           

        }catch (error) {
            console.log(error)
        }

    })

});


    
