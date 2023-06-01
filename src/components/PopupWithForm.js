import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitAdd) {
        super(popupSelector);
        this.formSubmitAdd = formSubmitAdd;
        this._form = this._popup.querySelector('.form');
        this._input = this._popup.querySelectorAll('.form__item');
        console.log(this._input);
        this._popupButton = this._popup.querySelector('.popup__saved-button');
        this._popupButtonLoading = this._popupButton.textContent;

    }
    close() {
        super.close()
        this._form.reset();
    }
    _getInputValues() {
        this.values = {};
        this._input.forEach((input) => {
            this.values[input.name] = input.value;
        })
        return this.values;
    }
    setInputsValues(dataUser) {
        this._input.forEach((input) => {
            input.value = dataUser[input.name];
        });
    }

    _onSubmit = (evt) => {
        evt.preventDefault();
        this._popupButton.textContent = `${this._popupButton.textContent}...`;
        this.formSubmitAdd(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._onSubmit)
    }

    setButtonText() {
        this._popupButton.textContent =  this._popupButtonLoading
   
    }


}




