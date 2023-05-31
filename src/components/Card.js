export default class Card {
    constructor(cardData, handleCardClick, templateSelector, openConfirm, putLike) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._myid = cardData.myid;
        this._cardId = cardData._id
        this._likes = cardData.likes;
        this._likesLength = cardData.likes.length;
        this._putLike = putLike;
        this._ownerId = cardData.owner._id;
        this._openConfirm = openConfirm
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
    _visibleDeleteButton() {
        if (this._myid === this._ownerId) {
            this._detete.style.visibility = 'visible'
        } else if (this._myid !== this._ownerId) {
            this._detete.style.visibility = 'hidden'
        }
    }
    _countLike() {
        this._likes.forEach(element => {
            if (element._id === this._myid) {
                this._button.classList.add('element__like-button_active')
                return
            }
            this._counter.textContent = this._likesLength
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._counter = this._element.querySelector('.element__like-count')
        this._detete = this._element.querySelector('.element__delete')
        this._button = this._element.querySelector('.element__like-button')
        this._image = this._element.querySelector('.element__image')
        this._text = this._element.querySelector('.element__title')
        this._text.textContent = this._name;
        this._image.alt = this._name;
        this._image.src = this._link;
        this._countLike()
        this._visibleDeleteButton()
        this._setEventListeners()
        return this._element;
    }

    // Функция лайка
    _likeCard() {
        this._putLike(this._button, this._cardId)
        // this._button.classList.toggle('element__like-button_active')
    };
    toggleLike(likes) {
        this._button.classList.toggle('element__like-button_active')
        this._counter.textContent = likes.length
    }
    //Функция удаления
    _deleteButtonCard() {
        this._element.remove();
        this._element = null
    }

    openImg() {
        this.handleCardClick(this._name, this._link)
    }
    _handleOpenDelete() {
        this._openConfirm({card: this, cardID: this._cardID })
   
    }
    //слушатели
    _setEventListeners() {
        //слушатель лайка
        this._button.addEventListener('click', () => {
            this._likeCard()
        })
        //слушатель удалялки
        // this._detete.addEventListener('click', () => {
        //     this._deleteButtonCard()
        // })
        //слушатель открытия картинки
        this._image.addEventListener('click', () => {
            this.openImg()
        });
        // //слушатель 
        this._detete.addEventListener('click', () => {
            this._handleOpenDelete()

        })

    }
}

