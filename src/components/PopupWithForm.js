import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitAdd) {
        super(popupSelector);
        this.formSubmitAdd = formSubmitAdd;
        this._form = document.querySelector('.form');
        this._input = document.querySelectorAll('.form__item');
        this._formButton = document.querySelectorAll('.popup__saved-button');
    }
    close() {
        super.close()
        //this.close()
        this._form.reset();
    }
    getInputValues() {
    this.values = {};
        this._input.forEach((input) => {
            this.values[input.name] = input.value;
        })
        console.log(this.values);
        return this.values;
    }
   

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this.formSubmitAdd)
        // (evt) => { 
        //     evt.preventDefault();
        //     this._formSubmitAdd(this.getInputValues());
        //     this.close()
        // })
    }
        

    }

