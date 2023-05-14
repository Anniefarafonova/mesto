import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitAdd) {
        super(popupSelector);
        this.formSubmitAdd = formSubmitAdd;
        this._form = this._popup.querySelector('.form');
        this._input = this._popup.querySelectorAll('.form__item');
        this._formButton = this._popup.querySelectorAll('.popup__saved-button');
        console.log( this._form);
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

