export default class Card {
constructor(name, link, handleCardClick, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        // this._handleDeletCard = handleDeletCard;
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
        //this._detete = this._detete.closest('.element')
        //this._detete.remove()
        this._element.remove();
       this._element = null
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

   

          this._image.addEventListener('click', () => {
            this.openImg()
          });
        
        // this._detete.addEventListener('click', () => {
        //     this._handleDeletCard()
        // })

    }
}

