const initialCards = [
    {
        name: 'Сахалин',
        link: 'https://live.staticflickr.com/65535/51664313705_5713791257_k.jpg'
    },
    {
        name: 'Дагестан',
        link: 'https://live.staticflickr.com/1958/44368978304_2732b58325_k.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://live.staticflickr.com/65535/48820100532_87a1ceb10d_k.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://live.staticflickr.com/65535/51421205434_8913f4a1a5_k.jpg'
    }
];

import { openPopup, closePopup } from './index.js'

const popupOpenImageElement = document.querySelector(".popup_type_image");
const popupAddElement = document.querySelector(".popup_type_add");
const popupOpenImageText = popupOpenImageElement.querySelector(".popup__text");
const popupOpenImage = popupOpenImageElement.querySelector(".popup__image");
const popupCloseImageContainer = popupOpenImageElement.querySelector(".popup__close_image-cls");
const listCard = document.querySelector('.elements__list-template')
const formElementAdd = popupAddElement.querySelector(".form");
const nameAddInput = popupAddElement.querySelector(".form__item_type_name");
const jobAddInput = popupAddElement.querySelector(".form__item_type_job");




export default class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }
    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners()
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__title').alt = this._name;
        this._element.querySelector('.element__image').src = this._link;
        return this._element;
    }

    // Функция лайка
    _likeCard() {
        const likeButton = this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active')
    };
    //Функция удаления
    _deleteCard() {
        const deleteButton = this._element.querySelector('.element__delete').closest('.element')
        deleteButton.remove()
    }
    // Функция открытия картинки 
    _handleOpenPopup() {
        popupOpenImage.src = this._link;
        popupOpenImageText.textContent = this._name
        popupOpenImageText.alt = this._name
        popupOpenImageElement.classList.add('popup_opened');
        openPopup(popupOpenImageElement)
    }
    // Функция закрытия картинки 
    _handleClosePopup() {
        popupOpenImage.src = '';
        popupOpenImageElement.classList.remove('popup_opened');
    }

    //слушатели
    _setEventListeners() {
        //слушатель лайка
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._likeCard()
        })

        //слушатель удалялки
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard()
        })

        // слушатель открытия картинки 
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup();
        })
        // слушатель закрытия картинки 
        popupCloseImageContainer.addEventListener('click', () => {
            this._handleClosePopup();
        });
    }

}
initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '.elements-template');
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.elements__list-template').append(cardElement);
});


//Функция создания карточки
function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    const cards = new Card(nameAddInput.value, jobAddInput.value, '.elements-template');
    formElementAdd.reset();
    const cardElements = cards.generateCard();
    listCard.prepend(cardElements)
    closePopup(popupAddElement)
}
formElementAdd.addEventListener('submit', handleFormSubmitAdd);


