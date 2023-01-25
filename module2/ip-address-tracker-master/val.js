const form = document.querySelector('#create-account');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

form.addEventListener('submit', (e)=>{
  
   validateForm();
   if (isFormValid() == true){
     form.submit();
   }else{
       e.preventDefault();
   }

});

function isFormValid() {
    const inputContainers = form.querySelectorAll('.input-group');
    let result = true
    inputContainers.forEach(container => {
        if (container.classList.contains('error')){
            result = false;
           }
    });
    return result
}

function validateForm(){
    if(usernameInput.value.trim() == ''){
        setErrorFor(usernameInput , 'Name Cannot Be Empty')
    }
    else if(usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15){
        setErrorFor(usernameInput , 'Name Cannot Be less than 5 and max 15')
    }else{
        setSucessFor(usernameInput)
    }

    if (emailInput.value.trim().length == "") {
        setErrorFor(emailInput, 'Field cannot be empty')
    }else if (isEmailValid(emailInput.value)) {
        setSucessFor(emailInput);
    } else {
        setErrorFor(emailInput , 'Provide valid email address');
    }

   


}
function setSucessFor(element){
     const parent = element.parentElement;
     if (parent.classList.contains('error')){
        parent.classList.remove('error');
    }
     parent.classList.add('sucess');
}



function setErrorFor(element , errorMessage){
    const parent = element.parentElement;

    if (parent.classList.contains('sucess')){
        parent.classList.remove('sucess');
    }

    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

function isEmailValid(email){
    const reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return reg.test(email);
 }
 








