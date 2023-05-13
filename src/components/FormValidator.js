export const validationConfig = ({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.popup__saved-button',
    inactiveButtonClass: 'popup__saved-button_disabled',
    inputErrorClass: 'form__item-error',
    errorClass: 'error_opened'
});

export class FormValidator {
    constructor(config, form) {
        this.formSelector = form,
            this._inputSelector = config.inputSelector,
            this._submitButtonSelector = config.submitButtonSelector,
            this._inactiveButtonClass = config.inactiveButtonClass,
            this._inputErrorClass = config.inputErrorClass,
            this._errorClass = config.errorClass,

            //this._form = Array.from(this.formSelector.querySelectorAll(this._inputSelector))
            //console.log(this._form)
            this._inputList = Array.from(this.formSelector.querySelectorAll(this._inputSelector))
        this._submitButton = this.formSelector.querySelector(this._submitButtonSelector)
    }

    // кнопка актив
    _enableButton(button) {
        button.classList.remove(this._inactiveButtonClass)
        button.removeAttribute("disabled")
    }
    // кнопка неактив
    disableButton(button) {
        button.classList.add(this._inactiveButtonClass)
        button.setAttribute("disabled", true)
    }

    // Функция  поля c ошибкой
    _showInputError(input) {
        const formError = document.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        formError.textContent = input.validationMessage
        formError.classList.add(this._errorClass);
    };

    //  // Функция  поля без ошибки
    _hideInputError(input) {
        const formError = document.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        formError.textContent = ""
        formError.classList.remove(this._errorClass);
    };

    _hasInvalidInput(formInput) {
        return formInput.some(item => !item.validity.valid)
    }

    _checkInputValidity(input) {
        if (input.checkValidity()) {
            this._hideInputError(input)
        } else {
            this._showInputError(input)
        }
    }
    // //функция слушателей
    setEventListeners() {
           this.disableButton(this._submitButton)
            this._inputList.forEach(input => {
                input.addEventListener('input', () => {
                    this.toggleButtonState();
                    this._checkInputValidity(input)
            //         // if (this._hasInvalidInput(this._inputList)) {
            //         //     this._disableButton(this._submitButton)
            //         // } else {
            //         //     this._enableButton(this._submitButton)
            //         // }
                });
            })
    };
    toggleButtonState(){
    
        if (this._hasInvalidInput(this._inputList)) {
            this.disableButton(this._submitButton)
        } else {
            (this._enableButton((this._submitButton)))
        }
    }
    
    resetValidation() {
        this.toggleButtonState(); 
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
        });
  
      }
    //   //функция запуска вылидации
    enableValidation() {
        this.setEventListeners()
    }
}

