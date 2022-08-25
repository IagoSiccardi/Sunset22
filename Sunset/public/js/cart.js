

console.log('Carrito done!')





qs('addCart') && qs('addCart').addEventListener('click', async({target}) => {


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
