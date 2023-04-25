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

const popupOpenImageElement = document.querySelector(".popup_type_image");
const popupCloseImageContainer = popupOpenImageElement.querySelector(".popup__close_image-cls");
const popupOpenImageText = popupOpenImageElement.querySelector(".popup__text");
const popupOpenImage = popupOpenImageElement.querySelector(".popup__image");
console.log(popupOpenImage)

const popupAddElement = document.querySelector(".popup_type_add");
const listCard = document.querySelector('.elements__list-template')



export default class Card {
    constructor(name, link, templateSelector) {
        this.name = name;
        this.link = link;
        // this.name = data.name;
        // this.link = data.link;
        this.templateSelector = templateSelector;
    }
    getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this.templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this.element = this.getTemplate();
        this.setEventListeners()
        this.element.querySelector('.element__title').textContent = this.name;
        this.element.querySelector('.element__title').alt = this.name;
        this.element.querySelector('.element__image').src = this.link;
        return this.element;
    }

    // Функция лайка
    likeCard() {
        const likeButton = this.element.querySelector('.element__like-button').classList.toggle('element__like-button_active')
    };
    //Функция удаления
    deleteCard() {
        const deleteButton = this.element.querySelector('.element__delete').closest('.element')
        deleteButton.remove()
    }
    // Функция открытия картинки 
    handleOpenPopup() {
        popupOpenImage.src = this.link;
        popupOpenImageText.textContent = this.name
        popupOpenImageText.alt = this.name
        popupOpenImageElement.classList.add('popup_opened');
        openPopup(popupOpenImageElement)
    }
    // Функция закрытия картинки 
    handleClosePopup() {
        popupOpenImage.src = '';
        popupOpenImageElement.classList.remove('popup_opened');
    }

    //слушатели
    setEventListeners() {
        //слушатель лайка
        this.element.querySelector('.element__like-button').addEventListener('click', () => {
            this.likeCard()
        })

        //слушатель удалялки
        this.element.querySelector('.element__delete').addEventListener('click', () => {
            this.deleteCard()
        })

        // слушатель открытия картинки 
        this.element.querySelector('.element__image').addEventListener('click', () => {
            this.handleOpenPopup();
        })

        // слушатель закрытия картинки 
        popupCloseImageContainer.addEventListener('click', () => {
            this.handleClosePopup();
        });
    }

}
initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '.elements-template');
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.elements__list-template').append(cardElement);
});


const formElementAdd = popupAddElement.querySelector(".form");

const nameAddInput = popupAddElement.querySelector(".form__item_type_name");
const jobAddInput = popupAddElement.querySelector(".form__item_type_job");

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