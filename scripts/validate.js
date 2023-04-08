const validationConfig = ({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__saved-button',
    inactiveButtonClass: 'popup__saved-button_disabled',
    inputErrorClass: 'form__item-error',
    errorClass: 'error__opened'
  }); 


 //функция запуска вылидации
 function enableValidation({formSelector, ...rest}) {
    console.log(rest)
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(function (formElement) {
      formElement.addEventListener('submit', function (evt) {
     evt.preventDefault();
    });     
     setEventListeners (formElement, rest)         
  })
 }

//функция листенер
   function setEventListeners (formElement, {inputSelector, submitButtonSelector, ...rest}) {
    console.log(rest)
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const formButton = formElement.querySelector(submitButtonSelector)
   disableButton(formButton, rest)
    inputList.forEach(input => {
        input.addEventListener('input', () => {
           checkInputValidity(input, rest)
            if (hasInvalidInput(inputList)){
                disableButton(formButton, rest)
            } else {
                enableButton(formButton, rest)
            }
            
        });
    })
};
  
// кнопка актив
  const enableButton = (button, {inactiveButtonClass}) => {
    button.classList.remove(inactiveButtonClass)
    button.removeAttribute("disabled")
   
    }
// кнопка неактив
    const disableButton = (button, {inactiveButtonClass}) => {
        button.classList.add(inactiveButtonClass)
        button.setAttribute("disabled", true)
    }

 // Функция  поля c ошибкой
 const showInputError = (input, {inputErrorClass}) => {
  input.classList.add(inputErrorClass);
  console.log(input)
   };
 // Функция  поля без ошибки
   const hideInputError = (input, {inputErrorClass}) => {
input.classList.remove(inputErrorClass);
   };

 
  const hasInvalidInput = (formInput) => {
    return formInput.some(item => !item.validity.valid)
    }

    const checkInputValidity = ( input, {errorClass, ...rest}) => {
      const formError = document.querySelector(`#${input.id}-error`);
      console.log(formError)
      console.log(rest)
      if(input.checkValidity()){
          formError.textContent = ""
          formError.classList.remove(errorClass);
          hideInputError(input, rest) 
      } else{
          formError.textContent = input.validationMessage
          formError.classList.add(errorClass);
          showInputError(input, rest)
      }
  }
  enableValidation (validationConfig)


