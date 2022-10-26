

console.log('Carrito done!')



  qs('addCart') && qs('addCart').addEventListener('click', async({target}) => {

    let cartIcon = document.querySelector('#cart_header')
    cartIcon.classList.add('cartHeaderDetail')

    setTimeout(() => {
      cartIcon.classList.remove('cartHeaderDetail')
      
    }, 1500);



    try {


        let response = await fetch('/cartApi/add-items',{
            method : 'POST',
            headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id : target.value
        })

        })
        
        let result = await response.json()

        console.log(result)

    } catch (error) {
        console.log(error)

    }
})  

  
