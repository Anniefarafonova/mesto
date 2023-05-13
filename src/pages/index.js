import Card from "../components/Card.js"
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { validationConfig } from '../components/FormValidator.js'
import { FormValidator } from '../components/FormValidator.js'
import { initialCards } from '../components/Card.js'

// Находим popup
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add");
const popupOpenImageElement = document.querySelector(".popup_type_image");

const popupOpenImageText = popupOpenImageElement.querySelector(".popup__text");
const popupOpenImage = popupOpenImageElement.querySelector(".popup__image");
export { popupOpenImageElement, popupOpenImageText, popupOpenImage }

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
///////////////////////////////////////////////////////////////////////////////////////////

const popupOpenImageElementSelector = ".popup_type_image"

const popupOpenImageSection = new PopupWithImage(popupOpenImageElementSelector)
popupOpenImageSection.setEventListeners()
///////////////////////////////////////////////////////////////////////////////////////////

//Попап EDIT
const config = {
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle'
}
const userInfo = new UserInfo(config);

console.log(userInfo)
///Событие EDIT/////////////////////////
const popupEditElementSelector = ".popup_type_edit"
const editPopupWithForm = new PopupWithForm(popupEditElementSelector, (evt) => {
    evt.preventDefault();
    userInfo.serUserInfo(editPopupWithForm.getInputValues());
    editPopupWithForm.close()
});
editPopupWithForm.setEventListeners()
console.log(editPopupWithForm.setEventListeners());

///Иконка EDIT/////////////////////////
profileEditButtonElement.addEventListener('click', profileEditButtonElementFunction);
function profileEditButtonElementFunction() {
    editPopupWithForm.open(userInfo.getUserInfo());
    console.log(editPopupWithForm.open(userInfo.getUserInfo()));
    userInfo.getUserInfo();
    editPopupWithForm.open()
}
/////////////////////////////////////////////////////////////////////////////////////////
//Попап AD
//ПРОБЛЕМА С СОБЫТИЕМ//
const popupAddElementSelector = ".popup_type_add"
const addtPopupWithForm = new PopupWithForm(popupAddElementSelector, (evt) => {
    evt.preventDefault();
    console.log('open');
    cardsListSection.addItem(cardsListSection.renderer(addtPopupWithForm.getInputValues()))
    addtPopupWithForm.close()
});
addtPopupWithForm.setEventListeners()
console.log(addtPopupWithForm.getInputValues());

///Иконка ADD/////////////////////////
profileAddButtonElement.addEventListener('click', profileAddButtonElementFunction);
function profileAddButtonElementFunction() {
    addtPopupWithForm.open()
}
/////////////////////////////////////////////////////////////////////////////////////////

// const userInfo = new UserInfo(nameEditInput, jobEditInput );
// /////Попап EDIT/////////////////////////
// //const editPopupWithForm = new PopupWithForm(edd, formSubmitEdit);
// const config = {
//     nameSelector: 'profile__title',
//     jobSelector: 'profile__subtitle'
// }

///////////////////////////реализация класса Section//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const cardListSelector = '.elements__list-template';
const cardsListSection = new Section({
    data: initialCards,
    renderer: (item) => {
        const cards = new Card(item.title, item.link, popupOpenImageSection
            .open, '.elements-template')
        const cardElement = cards.generateCard()
        cardsListSection.addItem(cardElement);
    }
},
    cardListSelector
);
cardsListSection.renderItems();

//////////////////////////////////////////////////////////////////////////////////////////

//Для каждой создаем экремпляр класса валидатора. Экземпляр или инстанс - это результат вызова new FormValidator()
const formEditValidator = new FormValidator(validationConfig, formElementEdit)
const formAddValidator = new FormValidator(validationConfig, formElementAdd)

//  //"Включаем" подписки на изменения в инпутах
formEditValidator.enableValidation()
formAddValidator.enableValidation()

