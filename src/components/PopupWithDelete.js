import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this.formSubmit = formSubmit;
        this.popupButton = this._popup.querySelector('.popup__saved-button');
        this.popupButtonLoading = this.popupButton.textContent;

    }
    _submit = (evt) => {
        evt.preventDefault();
         this.popupButton.textContent = `${this.popupButton.textContent}...`;
        this.formSubmit(({ card: this._element, cardID: this._cardID }));
        
      }

    setEventListeners() {
        super.setEventListeners();
       this.popupButton.addEventListener('click', this._submit)
    }
    
    setSubmitHanlder (newFormSubmit ){
        this.formSubmit = newFormSubmit
    }
    
    setButtonText( ) {
        this.popupButton.textContent = this.popupButtonLoading
    }

    open = (card, cardId ) => {
        super.open()
        this._element = card;
        this._cardID = cardId;
    }
}