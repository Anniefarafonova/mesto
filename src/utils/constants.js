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

// Находим popup
const popupEditElement = document.querySelector(".popup_type_edit");
const popupEditElementSelector = ".popup_type_edit"
const popupAddElement = document.querySelector(".popup_type_add");
const popupAddElementSelector = ".popup_type_add"

const popupOpenImageElement = document.querySelector(".popup_type_image");
const popupOpenImageElementSelector = ".popup_type_image"
const popupCloseElement = document.querySelector('.popup_type_confirm')
const popupConfirmElementSelector = ".popup_type_confirm"
const popupAvatarElement = document.querySelector('.popup_type_avatar')
const popupAvatarElementSelector = ".popup_type_avatar"

// Находим кнопки
const profileButtonElement = document.querySelector(".profile");
const profileEditButtonElement = profileButtonElement.querySelector(".profile__edit-button");
const profileAddButtonElement = profileButtonElement.querySelector(".profile__add-button");
const avatarButton = document.querySelector('.profile__avatar-button')



// Находим поля формы в DOM
const formElementEdit = popupEditElement.querySelector(".form");
const formElementAdd = popupAddElement.querySelector(".form");
const formElementAvatar = popupAvatarElement.querySelector(".form");

const config = {
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar'
}

export { popupEditElement, popupEditElementSelector, popupAddElement, popupAddElementSelector, popupOpenImageElement, popupOpenImageElementSelector, popupCloseElement, popupConfirmElementSelector, popupAvatarElement, popupAvatarElementSelector, profileButtonElement, profileEditButtonElement, profileAddButtonElement, avatarButton, formElementEdit, formElementAdd, formElementAvatar, config }