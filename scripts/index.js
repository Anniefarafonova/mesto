import Card from "./Card.js"
// Находим popup
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add");
const popupOpenImageElement = document.querySelector(".popup_type_image");

const popupOpenImageText = popupOpenImageElement.querySelector(".popup__text");
const popupOpenImage = popupOpenImageElement.querySelector(".popup__image");
export {popupOpenImageElement, popupOpenImageText, popupOpenImage }

// Находим кнопки
const profileButtonElement = document.querySelector(".profile");
const profileEditButtonElement = profileButtonElement.querySelector(".profile__edit-button");
const profileAddButtonElement = profileButtonElement.querySelector(".profile__add-button");

// Находим поля формы в DOM
const formElementEdit = popupEditElement.querySelector(".form");
const formElementAdd = popupAddElement.querySelector(".form");

const nameEditInput = formElementEdit.querySelector(".form__item_type_name");
const jobEditInput = formElementEdit.querySelector(".form__item_type_job");

const buttonSavedInput = formElementEdit.querySelector(".popup__saved-button");
export const buttonCreateInput = popupAddElement.querySelector(".popup__saved-button");

const nameTitle = profileButtonElement.querySelector(".profile__title");
const jobSubtitle = profileButtonElement.querySelector(".profile__subtitle");


const listCard = document.querySelector('.elements__list-template')
const nameAddInput = popupAddElement.querySelector(".form__item_type_name");
const jobAddInput = popupAddElement.querySelector(".form__item_type_job");


// export function handleCardClick(name, link) {
//     popupOpenImage.src = link;
//     popupOpenImageText.textContent = name
//     popupOpenImage.alt = name
//     openPopup(popupOpenImageElement)
// }


//функция открытия попапа
export function openPopup(popup) {
    popup.classList.add("popup_opened")
    document.addEventListener("keydown", closePopupCloseEsc)
   formAddValidator.resetValidation()
};
//функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove("popup_opened")
    document.removeEventListener("keydown", closePopupCloseEsc)
};

//Закрытия попапа нажатием на оверлей
function closeButtonByClickOnOverlay(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target)
    }
}

//Закрытия попапа нажатием на Escape
function closePopupCloseEsc(evt) {
    if (evt.key === "Escape") {
        const popup = document.querySelector(".popup_opened");
        closePopup(popup)
    }
}
const buttonCloseList = document.querySelectorAll('.popup__close');
console.log(buttonCloseList)
buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    popup.addEventListener('mousedown', closeButtonByClickOnOverlay);
    btn.addEventListener('click', () => closePopup(popup));
})
profileAddButtonElement.addEventListener("click", () => openPopup(popupAddElement));
formElementEdit.addEventListener('submit', handleFormSubmitEdit);


function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameEditInput.value;
    jobSubtitle.textContent = jobEditInput.value;
    closePopup(popupEditElement)
}
profileEditButtonElement.addEventListener("click", function () {
    nameEditInput.value = nameTitle.textContent;
    jobEditInput.value = jobSubtitle.textContent;
    openPopup(popupEditElement);
});


function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    createCard(nameAddInput.value, jobAddInput.value, '.elements-template');
    formElementAdd.reset();
    closePopup(popupAddElement)
}

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

//Функция создания карточки 
function createCard(name, link, templateSelector) {
    const cards = new Card(name, link, templateSelector)
    const cardElement = cards.generateCard()
    listCard.prepend(cardElement)
}

import { initialCards } from './Card.js'
initialCards.forEach(card => {
    createCard(card.name, card.link, '.elements-template')
})


import { validationConfig } from './FormValidator.js'
import { FormValidator } from './FormValidator.js'
//Для каждой создаем экремпляр класса валидатора. Экземпляр или инстанс - это результат вызова new FormValidator()
const formEditValidator = new FormValidator(validationConfig, formElementEdit)
const formAddValidator = new FormValidator(validationConfig, formElementAdd)

//  //"Включаем" подписки на изменения в инпутах
formEditValidator.enableValidation()
formAddValidator.enableValidation()




