window.addEventListener("load", () => {
  // LOGIN VALIDATION //

  console.log("Form done!");

  const errorP = document.createElement("p");
  const errorP2 = document.createElement("p");

  const regExEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regExPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/;

  const registerForm = qs('registerForm')

  const containerNYA = qs("registerContainer_NYA");
  const labelNYA = qs("registerLabel_NYA");
  const iconErrorNYA = qs("register_errorIconNYA");
  const iconDoneNYA = qs("register_doneIconNYA");
  const nombreRegisterInput = qs("registerInput_NYA");

  const containerEmail = qs("registerContainer_email");
  const labelEmail = qs("registerLabel_email");
  const iconErrorEmail = qs("register_errorIconEmail");
  const iconDoneEmail = qs("register_doneIconEmail");
  const emailRegisterInput = qs("registerInput_email");

  const containerPassword = qs("registerContainer_password");
  const labelPassword = qs("registerLabel_password");
  const iconErrorPassword = qs("errorIconPassword");
  const iconDonePassword = qs("doneIconPassword");
  const passwordRegisterInput = qs("registerInput_password");

  const containerRepassword = qs("registerContainer_repassword");
  const labelRepassword = qs("registerLabel_repassword");
  const iconErrorRepassword = qs("errorIconrepassword");
  const iconDoneRepassword = qs("doneIconrepassword");
  const repasswordRegisterInput = qs("registerInput_repassword");

  const containerTerminos = qs('registerContainer_terminos')
  const terminosRegisterInput = qs("registerInput_terminos");


  const validationNYA = () => {
    switch (true) {
      case !nombreRegisterInput.value.trim():
        containerNYA.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML = "Debes completar este campo!";

        labelNYA.classList.remove("labelDone");
        labelNYA.classList.add("labelError");

        iconErrorNYA.classList.add("errorIcon");
        iconErrorNYA.classList.remove("iconTransparent");

        iconDoneNYA.classList.add("iconTransparent");
        iconDoneNYA.classList.remove("doneIcon");

        break;

      case nombreRegisterInput.value.trim().length < 6:
        containerNYA.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML = "Debes colocar un minimo de 6 letras!";

        labelNYA.classList.remove("labelDone");
        labelNYA.classList.add("labelError");

        iconErrorNYA.classList.add("errorIcon");
        iconErrorNYA.classList.remove("iconTransparent");

        iconDoneNYA.classList.add("iconTransparent");
        iconDoneNYA.classList.remove("doneIcon");

        break;

      default:
        labelNYA.classList.remove("labelError");
        labelNYA.classList.add("labelDone");

        iconErrorNYA.classList.remove("errorIcon");
        iconErrorNYA.classList.add("iconTransparent");

        iconDoneNYA.classList.remove("iconTransparent");
        iconDoneNYA.classList.add("doneIcon");

        errorP.classList.remove("errorForm");
        errorP.innerHTML = "";

        break;
    }
  };

  const emailValidation = () => {
    switch (true) {
      case emailRegisterInput.value.length === 0:
        containerEmail.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML = "Debes completar este campo!";

        labelEmail.classList.remove("labelDone");
        labelEmail.classList.add("labelError");

        iconErrorEmail.classList.add("errorIcon");
        iconErrorEmail.classList.remove("iconTransparent");

        iconDoneEmail.classList.add("iconTransparent");
        iconDoneEmail.classList.remove("doneIcon");

        break;

      case !regExEmail.test(emailRegisterInput.value):
        containerEmail.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML = "El email no es valido!";

        labelEmail.classList.remove("labelDone");
        labelEmail.classList.add("labelError");

        iconErrorEmail.classList.add("errorIcon");
        iconErrorEmail.classList.remove("iconTransparent");

        iconDoneEmail.classList.add("iconTransparent");
        iconDoneEmail.classList.remove("doneIcon");

        break;

      default:
        labelEmail.classList.remove("labelError");
        labelEmail.classList.add("labelDone");

        iconErrorEmail.classList.remove("errorIcon");
        iconErrorEmail.classList.add("iconTransparent");

        iconDoneEmail.classList.remove("iconTransparent");
        iconDoneEmail.classList.add("doneIcon");

        errorP.classList.remove("errorForm");
        errorP.innerHTML = "";

        break;
    }
  };

  const passwordValidation = () => {
    switch (true) {
      case passwordRegisterInput.value.length === 0:
        containerPassword.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML = "Debes completar este campo!";

        labelPassword.classList.remove("labelDone");
        labelPassword.classList.add("labelError");

        iconErrorPassword.classList.add("errorIcon");
        iconErrorPassword.classList.remove("iconTransparent");

        iconDonePassword.classList.add("iconTransparent");
        iconDonePassword.classList.remove("doneIcon");

        break;

      case !regExPassword.test(passwordRegisterInput.value):
        containerPassword.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML =
          "La contraseña debe tener un minimo de 6 caracteres, una mayúscula y un numero.";

        labelPassword.classList.remove("labelDone");
        labelPassword.classList.add("labelError");

        iconErrorPassword.classList.add("errorIcon");
        iconErrorPassword.classList.remove("iconTransparent");

        iconDonePassword.classList.add("iconTransparent");
        iconDonePassword.classList.remove("doneIcon");

        break;

      default:
        labelPassword.classList.remove("labelError");
        labelPassword.classList.add("labelDone");

        iconErrorPassword.classList.remove("errorIcon");
        iconErrorPassword.classList.add("iconTransparent");

        iconDonePassword.classList.remove("iconTransparent");
        iconDonePassword.classList.add("doneIcon");

        errorP.classList.remove("errorForm");
        errorP.innerHTML = "";

        break;
    }
  };

  const repasswordValidation = () => {
    switch (true) {
      case repasswordRegisterInput.value.length === 0:
        containerRepassword.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML = "Debes completar este campo!";

        labelRepassword.classList.remove("labelDone");
        labelRepassword.classList.add("labelError");

        iconErrorRepassword.classList.add("errorIcon");
        iconErrorRepassword.classList.remove("iconTransparent");

        iconDoneRepassword.classList.add("iconTransparent");
        iconDoneRepassword.classList.remove("doneIcon");

        break;

      case passwordRegisterInput.value !== repasswordRegisterInput.value:
        containerRepassword.appendChild(errorP);
        errorP.classList.add("errorForm");
        errorP.innerHTML = "La contraseña debe ser igual!";

        labelRepassword.classList.remove("labelDone");
        labelRepassword.classList.add("labelError");

        iconErrorRepassword.classList.add("errorIcon");
        iconErrorRepassword.classList.remove("iconTransparent");

        iconDoneRepassword.classList.add("iconTransparent");
        iconDoneRepassword.classList.remove("doneIcon");

        break;

      default:
        labelRepassword.classList.remove("labelError");
        labelRepassword.classList.add("labelDone");

        iconErrorRepassword.classList.remove("errorIcon");
        iconErrorRepassword.classList.add("iconTransparent");

        iconDoneRepassword.classList.remove("iconTransparent");
        iconDoneRepassword.classList.add("doneIcon");

        errorP.classList.remove("errorForm");
        errorP.innerHTML = "";

        break;
    }
  };

  nombreRegisterInput.addEventListener("keyup", () => {
    validationNYA();
  });

  emailRegisterInput.addEventListener("keyup", () => {
    emailValidation();
  });

  passwordRegisterInput.addEventListener("keyup", () => {
    passwordValidation();
  });

  repasswordRegisterInput.addEventListener("keyup", () => {
    repasswordValidation();
  });

  terminosRegisterInput.addEventListener('change', () => {
    if(terminosRegisterInput.checked){
        errorP.innerHTML = ''
        errorP.classList.remove('errorForm')

    } else {
        containerTerminos.appendChild(errorP)
        errorP.classList.add('errorForm')
        errorP.innerHTML = 'Debes aceptar los términos y condiciones!'
    }
})



  registerForm.addEventListener('submit', e => {
      
    e.preventDefault()

    let error = false
    let elements = e.target.elements

    for (let i = 0; i < elements.length - 1 ; i++) {
        if(elements[i].classList.contains('labelError') || !elements[i].value.trim() || !terminosRegisterInput.checked ){
            

            error = true

            if (!terminosRegisterInput.checked) {
                containerTerminos.appendChild(errorP2)
                errorP2.classList.add('errorForm')
                errorP2.innerHTML = 'Debes aceptar los términos y condiciones!'


                

            }else if (!elements[i].value.trim()) {

                labelNYA.classList.add("labelError");
                iconErrorNYA.classList.add("errorIcon");
                iconErrorNYA.classList.remove("iconTransparent");
    
                labelEmail.classList.add("labelError");
                iconErrorEmail.classList.add("errorIcon");
                iconErrorEmail.classList.remove("iconTransparent");
                
                labelPassword.classList.add("labelError");
                iconErrorPassword.classList.add("errorIcon");
                iconErrorPassword.classList.remove("iconTransparent");
                
                labelRepassword.classList.add("labelError");
                iconErrorRepassword.classList.add("errorIcon");
                iconErrorRepassword.classList.remove("iconTransparent");

                containerRepassword.appendChild(errorP);
                errorP.classList.add("errorForm");
                errorP.innerHTML = "Debes completar los campos!";
            }

                labelNYA.classList.add("labelError");
                labelEmail.classList.add("labelError");
                labelPassword.classList.add("labelError");
                labelRepassword.classList.add("labelError");


        }

       
        
    }
    
    !error && e.target.submit()


  })

});
