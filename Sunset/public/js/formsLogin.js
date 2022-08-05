window.addEventListener('load', () => {

console.log('Forms done!')

// LOGIN VALIDATION //

const form = qs('login_form')
const email = qs('email_input')
const password = qs('password_input')
const errorP = document.createElement('p')
const label = qs('label_login')
const labelPassword = qs('label_password')
const iconPassword = qs('errorIconPassword')
const iconPassword2 = qs('doneIconPassword')
const icon = qs('errorIcon')
const icon2 = qs('doneIcon')
const divCont = qs('container_div')
const divContPassword = qs('container_divPassword')


let regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const emailValidation = () => {
    switch (true) {
        case email.value.length ===  0 :     
        
        divCont.appendChild(errorP)
        errorP.classList.add('errorForm')
        errorP.innerHTML = 'Debes colocar tu email!'

        label.classList.remove('labelDone')
        label.classList.add('labelError')
        
        icon.classList.add('errorIcon')
        icon.classList.remove('iconTransparent')

        icon2.classList.add('iconTransparent')
        icon2.classList.remove('doneIcon')

        break;

        case !regExEmail.test(email.value) :     
        
            divCont.appendChild(errorP)
            errorP.classList.add('errorForm')
            errorP.innerHTML = 'El email no es valido!'

            label.classList.remove('labelDone')
            label.classList.add('labelError')
            
            icon.classList.add('errorIcon')
            icon.classList.remove('iconTransparent')

            icon2.classList.add('iconTransparent')
            icon2.classList.remove('doneIcon')

            break;
    
        default:
            label.classList.remove('labelError')
            label.classList.add('labelDone')

            icon.classList.remove('errorIcon')
            icon.classList.add('iconTransparent')

            icon2.classList.remove('iconTransparent')
            icon2.classList.add('doneIcon')
            
            errorP.classList.remove('errorForm')
            errorP.innerHTML = ''


            break;
    }

}

const passwordValidation = () => {
    switch (true) {
      case password.value.length === 0:
        divContPassword.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML = "Debes colocar tu contraseña!";

        labelPassword.classList.remove("labelDone");
        labelPassword.classList.add("labelError");

        iconPassword.classList.add("errorIcon");
        iconPassword.classList.remove("iconTransparent");

        iconPassword2.classList.add("iconTransparent");
        iconPassword2.classList.remove("doneIcon");

        break;

      case password.value.length < 5:
        divContPassword.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML = "La contraseña no es valida!";

        labelPassword.classList.remove("labelDone");
        labelPassword.classList.add("labelError");

        iconPassword.classList.add("errorIcon");
        iconPassword.classList.remove("iconTransparent");

        iconPassword2.classList.add("iconTransparent");
        iconPassword2.classList.remove("doneIcon");

        break;

      default:

        labelPassword.classList.remove('labelError')
        labelPassword.classList.add('labelDone')

        iconPassword.classList.remove('errorIcon')
        iconPassword.classList.add('iconTransparent')

        iconPassword2.classList.remove('iconTransparent')
        iconPassword2.classList.add('doneIcon')
        
        errorP.classList.remove('errorForm')
        errorP.innerHTML = ''
        break;
    }
}

password.addEventListener('keyup', e => {
    passwordValidation()
})

email.addEventListener('keyup', e => {
    
    emailValidation()

})


form.addEventListener('submit',e => {
    e.preventDefault()

    let elements = e.target.elements;
    let error = false

    for (let i = 0; i < elements.length -  1; i++) {
        if (elements[i].classList.contains('labelError') || !elements[i].value.trim()) {
            if (!elements[i].value.trim()) {
                divContPassword.appendChild(errorP)
                errorP.classList.add('errorForm')
                errorP.innerHTML = 'Debes completar los campos!'

                label.classList.add('labelError')
                icon.classList.add('errorIcon')
                icon.classList.remove('iconTransparent')

                labelPassword.classList.add('labelError')
                iconPassword.classList.add('errorIcon')
                iconPassword.classList.remove('iconTransparent')

                error = true

            }
        
        }
        

    }
    
    !error && e.target.submit()
   
})

})