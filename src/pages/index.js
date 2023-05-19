import Card from "../components/Card.js"
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { validationConfig } from '../components/FormValidator.js'
import { FormValidator } from '../components/FormValidator.js'
import { initialCards } from '../utilss/constants.js'
import './index.css'
initialCards.reverse();
// Находим popup
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add");
const popupOpenImageElement = document.querySelector(".popup_type_image");

const popupOpenImageText = popupOpenImageElement.querySelector(".popup__text");
const popupOpenImage = popupOpenImageElement.querySelector(".popup__image");
//export { popupOpenImageElement, popupOpenImageText, popupOpenImage }

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
///Событие EDIT/////////////////////////
const popupEditElementSelector = ".popup_type_edit"
const editPopupWithForm = new PopupWithForm(popupEditElementSelector, formSubmitEdit)

function formSubmitEdit(item) {
    userInfo.serUserInfo(item);
    editPopupWithForm.close()
}
editPopupWithForm.setEventListeners()
///Иконка EDIT/////////////////////////
profileEditButtonElement.addEventListener('click', profileEditButtonElementFunction);
function profileEditButtonElementFunction() {
    editPopupWithForm.setInputsValues(userInfo.getUserInfo())
    console.log(userInfo.getUserInfo());
    editPopupWithForm.open()
}

// function profileEditButtonElementFunction() {
//     editPopupWithForm.open()
//     const profileData  = userInfo.getUserInfo() // Вот тут в переменную profileData положили объект, тот что ты консольлогируешь на скриншоте 
//   console.log(profileData);
//     nameEditInput.value = profileData.firstname
//     jobEditInput.value = profileData.description
//   }
  
/////////////////////////////////////////////////////////////////////////////////////////
//Попап AD
//ПРОБЛЕМА С СОБЫТИЕМ//
const popupAddElementSelector = ".popup_type_add"
const addtPopupWithForm = new PopupWithForm(popupAddElementSelector, formSubmitAdd)

function formSubmitAdd(item) {
    console.log('open');
    cardsListSection.addItem(createCard(item));
    addtPopupWithForm.close()
};
addtPopupWithForm.setEventListeners()

///Иконка ADD/////////////////////////
profileAddButtonElement.addEventListener('click', profileAddButtonElementFunction);
function profileAddButtonElementFunction() {
    addtPopupWithForm.open()
}

/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////реализация класса Section//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
function createCard(item) {
    const cards = new Card(item.title, item.link, popupOpenImageSection
        .open, '.elements-template');
    const cardElement = cards.generateCard()
    return cardElement;
}

const cardListSelector = '.elements__list-template';
const cardsListSection = new Section({
    data: initialCards,
    renderer: (item) => {
        cardsListSection.addItem(createCard(item));
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

