 const validationConfig = ({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__saved-button',
    inactiveButtonClass: 'popup__saved-button_disabled',
    inputErrorClass: 'form__item-error',
    errorClass: 'error_opened'
  }); 

class FormValidator {
    constructor(config, form ){
        this.formSelector = form.formSelector,
        this.inputSelector = config.inputSelector,
        this.submitButtonSelector= config.submitButtonSelector,
        this.inactiveButtonClass = config.inactiveButtonClass,
        this.inputErrorClass = config.inputErrorClass,
        this.errorClass = config.errorClass;

    }
   
 // кнопка актив
  enableButton () {
    this.submitButtonSelector.classList.remove( this.inactiveButtonClass)
    this.submitButtonSelector.removeAttribute("disabled")
   
  }
 // кнопка неактив
     disableButton  () {
        this.submitButtonSelector.classList.add(this.inactiveButtonClass)
        this.submitButtonSelector.setAttribute("disabled", true)
    }
 // Функция  поля c ошибкой
  showInputError () {
    const formError = document.querySelector(`#${this.inputSelector.id}-error`);
    console.log(formError)
    this.inputSelector.classList.add(this.inputErrorClass);
  formError.textContent = input.validationMessage
  formError.classList.add( this.errorClass);
   };

//  // Функция  поля без ошибки
   hideInputError  () {
    const formError = document.querySelector(`#${this.inputSelector.id}-error`);
    this.inputSelector.classList.remove(this.inputErrorClass);
formError.textContent = ""
formError.classList.remove( this.errorClass);
   };

hasInvalidInput (formInput)  {
        return formInput.some(item => !item.validity.valid)
        }
    
    checkInputValidity (input)  {
          if(input.checkValidity()){
              hideInputError(input) 
          } else{
              showInputError(input)
          }
}
}
function enableValidation() {
    const forms = document.querySelector(this.formSelector);
//const forms = Array.from(document.querySelectorAll(this.formSelector));
console.log(forms)
}
enableValidation()








// FormValidator.js
// class FormValidator {
//     constructor(settings, form) {
//        // Ниже кладем в this все, что планируем использовать в других методах. Я ниже "раскукоживаю" settings на отдельные свойства и кладу в this, но можно вместо этого просто сделать this._settings = settings и обращаться в дальнейшем всегда к this.settings
//        const { inputSelector, buttonSelector, errorSelector } = settings
//        this._form =  form
//        this._inputSelector =  inputSelector
//        this._buttonSelector =  buttonSelector
//        this._errorSelector =  errorSelector
//     }
 
//     enableValidation() {
//       // вот тут внутри this._form находим все инпуты, обходим их делаем подписку на событие ввода и тп. По сути копипастим старый код + рефакторим, чтобы брать всякие селекторы и форму из this, например this._form.querySelectorAll(this._settings.inputSelector)
//      }
  
//    ...
//  }
 


const config = {validationConfig}// тот же конфиг, что и раньше передавали в enableValidation аргументом
console.log(config )
//  //Находим все формы в соответствующих модалках
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add");
 const form1 = popupEditElement.querySelector('.form')
 console.log(form1 )
 const form2 = popupAddElement.querySelector('.form')
 console.log(form2 )
//  //Для каждой создаем экремпляр класса валидатора. Экземпляр или инстанс - это результат вызова new FormValidator()
 const form1Validator = new FormValidator(config, form1)
 const form2Validator = new FormValidator(config, form2)
//  //"Включаем" подписки на изменения в инпутах
form1Validator.enableValidation()
form2Validator.enableValidation()


//  // index.js
//  const config = {...} // тот же конфиг, что и раньше передавали в enableValidation аргументом
//  //Находим все формы в соответствующих модалках
//  const form1 = popup1.querySelector('.form')
//  const form2 = popup2.querySelector('.form')
 
//  //Для каждой создаем экремпляр класса валидатора. Экземпляр или инстанс - это результат вызова new FormValidator()
//  const form1Validator = new FormValidator(config, form1)
//  const form2Validator = new FormValidator(config, form2)
 
//  //"Включаем" подписки на изменения в инпутах
//  form1Validator.enableValidation()
//  form2Validator.enableValidation()
 