export const initialCards = [
    {
        title: 'Сахалин',
        link: 'https://live.staticflickr.com/65535/51664313705_5713791257_k.jpg'
    },
    {
        title: 'Дагестан',
        link: 'https://live.staticflickr.com/1958/44368978304_2732b58325_k.jpg'
    },
    {
        title: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        link: 'https://live.staticflickr.com/65535/48820100532_87a1ceb10d_k.jpg'
    },
    {
        title: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        link: 'https://live.staticflickr.com/65535/51421205434_8913f4a1a5_k.jpg'
    }
];
initialCards.reverse();
//import { openPopup, closePopup } from '../pages/index.js'

import {popupOpenImageElement, popupOpenImageText, popupOpenImage } from "../pages/index.js"


export default class Card {
constructor(title, link, handleCardClick, templateSelector) {
        this._name = title;
        this._link = link;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
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

        this._element.querySelector('.element__title').textContent = this._name;
        this._image = this._element.querySelector('.element__image')
        this._image.alt = this._name;
        this._image.src = this._link;


        this._detete = this._element.querySelector('.element__delete')
        this._button = this._element.querySelector('.element__like-button')

        this._setEventListeners()
        return this._element;
    }

    // Функция лайка
    _likeCard() {
        this._button.classList.toggle('element__like-button_active')
    };
    //Функция удаления
    _deleteCard() {
        this._detete = this._detete.closest('.element')
        this._detete.remove()

    }
    // Функция открытия картинки 
    // handleCardClick(){
    //     this._image.open()
    // }
    openImg (){
        this.handleCardClick(this._name, this._link)
    }
    //слушатели
    _setEventListeners() {
        //слушатель лайка
        this._button.addEventListener('click', () => {
            this._likeCard()
        })

        //слушатель удалялки
        this._detete.addEventListener('click', () => {
            this._deleteCard()
        })

        // слушатель открытия картинки 
        // this._image.addEventListener('click', () => {
        //     this.handleCardClick();
        // })

          this._image.addEventListener('click', () => {
            this.openImg()
          });
        // this._image.addEventListener('click', () => {
        //     this.handleCardClick(this._name, this._link)
        //   });

    }
}

