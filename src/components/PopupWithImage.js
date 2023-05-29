import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._text = this._popup.querySelector(".popup__text");
  }

  open = (name, link) => {
    this._text.textContent = name;
    this._image.alt = name
    this._image.src = link;
    super.open()
  }
}
