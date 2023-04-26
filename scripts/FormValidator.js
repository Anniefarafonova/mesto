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
            this._errorClass = config.errorClass;
    }

    // кнопка актив
    _enableButton(button) {
        button.classList.remove(this._inactiveButtonClass)
        button.removeAttribute("disabled")
    }
    // кнопка неактив
    _disableButton(button) {
        button.classList.add(this._inactiveButtonClass)
        button.setAttribute("disabled", true)
    }

    // Функция  поля c ошибкой
    _showInputError(input) {
        const formError = document.querySelector(`#${input.id}-error`);
        console.log(formError)
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
        const inputList = Array.from(this.formSelector.querySelectorAll(this._inputSelector))
        console.log(inputList)
        const formButton = this.formSelector.querySelector(this._submitButtonSelector)
        console.log(formButton)
        this._disableButton(formButton)
        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                console.log( this._checkInputValidity)
                if (this._hasInvalidInput(inputList)) {
                    this._disableButton(formButton)
                } else {
                    this._enableButton(formButton)
                }
            });
        })
    };

    //   //функция запуска вылидации
    enableValidation() {
        this.setEventListeners()
        console.log(this.setEventListeners)
    }
}

 