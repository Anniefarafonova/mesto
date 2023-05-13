import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector(".popup__image");
    this._text = document.querySelector(".popup__text");

  }
 
  open = (title, link) => {
      this._text.textContent = title;
      this._image.alt = title
      this._image.src = link;
      super.open()
    }
}
