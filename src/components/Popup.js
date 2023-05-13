export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        //this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popupCloseButton = this._popup.querySelector('.popup__close');
    }

    //Открытие попап//
    open() {
        this._popup.classList.add("popup_opened")
        document.addEventListener("keydown", this._handleEscClose)
        this.setEventListeners();
    }
    //Закрытие попап//
    close() {
        this._popup.classList.remove("popup_opened")
        document.removeEventListener("keydown", this._handleEscClose)
    }
    //Закрытие попап Esc//
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close()
        }
    }
    //Слушатель закрытия, нажимая на темн.экран и закрытие на кнопку крестик//
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget)
                this.close()
        })
        this._popupCloseButton.addEventListener('click', () => {
            this.close()
        })
    }
}
