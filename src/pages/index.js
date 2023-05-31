import Card from "../components/Card.js"
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupWithDelete from '../components/PopupWithDelete.js'

import { validationConfig } from '../components/FormValidator.js'
import { FormValidator } from '../components/FormValidator.js'
//import { initialCards } from '../utils/constants.js'
//initialCards.reverse();
import './index.css'

import { popupEditElement, popupAddElement, popupOpenImageElement, popupCloseElement, popupAvatarElement, profileButtonElement, profileEditButtonElement, profileAddButtonElement, formElementEdit, formElementAdd, formElementAvatar } from '../utils/constants.js'

/////////////////////////////////////Подкюч. к серверу/////////////////////////////////////////////////
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '26786be3-fed9-4d83-9ae2-1348eee1b7d5',
        'Content-Type': 'application/json'
    }
});
//   console.log(api)
//   api.getCard()
//     .then(res => console.log(res))

//   api.getInfo()
//     .then(res => console.log(res))
/////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////Попап открытия карточек////////////////////////////////////////////
const popupOpenImageElementSelector = ".popup_type_image"

const popupOpenImageSection = new PopupWithImage(popupOpenImageElementSelector)
popupOpenImageSection.setEventListeners()
///////////////////////////////////////////////////////////////////////////////////////////


//Попап EDIT
const config = {
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar'
}
const userInfo = new UserInfo(config);
////////////////////////////////////////Попап EDIT/////////////////////////////////////////////////
const popupEditElementSelector = ".popup_type_edit"
const editPopupWithForm = new PopupWithForm(popupEditElementSelector, formSubmitEdit)

function formSubmitEdit(data) {
    api.setUserInfo(data)
        .then(res => {
            userInfo.serUserInfo({ avatar: res.avatar, firstname: res.name, description: res.about })
        })
        .catch((error => console.error(`Ошибка при редактировании ${error}`)))
        .finally(() => editPopupWithForm.setButtonText())

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

////////////////////////////////////////Попап AD/////////////////////////////////////////////////
const popupAddElementSelector = ".popup_type_add"
const addtPopupWithForm = new PopupWithForm(popupAddElementSelector, formSubmitAdd)

function formSubmitAdd(data) {
    console.log('open');
    Promise.all([api.getInfo(), api.addCard(data)])
        .then(([dataUser, dataCard]) => {
            console.log(dataCard);
            dataCard.myid = dataUser._id
            cardsListSection.addItem(createCard(dataCard));
            addtPopupWithForm.close();
        })
        .catch((error => console.error(`Ошибка при создании карточки ${error}`)))
        .finally(() => addtPopupWithForm.setButtonText())
};
addtPopupWithForm.setEventListeners()


///Иконка ADD/////////////////////////
profileAddButtonElement.addEventListener('click', profileAddButtonElementFunction);
function profileAddButtonElementFunction() {
    addtPopupWithForm.open()
}

//////////////////////////////////////////////////Попап AVATAR///////////////////////////////////////
const popupAvatarElementSelector = ".popup_type_avatar"
const avatarPopup = new PopupWithForm(popupAvatarElementSelector, formSubmitAvatar)

function formSubmitAvatar(data) {
    api.setUserAvatar(data)
        .then(res => {
            console.log(res);
            userInfo.serUserInfo({ avatar: res.avatar, firstname: res.name, description: res.about })
        })
        .catch((error => console.error(`Ошибка при редактировании аватара ${error}`)))
        .finally(() => avatarPopup.setButtonText() )
   
    avatarPopup.close()
    console.log('Close');
};
avatarPopup.setEventListeners()

const avatarButton = document.querySelector('.profile__avatar-button')
console.log(avatarButton);
///Иконка CLOSE/////////////////////////
avatarButton.addEventListener('click', form)
function form() {
    avatarPopup.open()
}

//////////////////////////////////////////////Попап CONFIRM//////////////////////////////////////////////////////
const popupConfirmElementSelector = ".popup_type_confirm"
const Button = document.querySelector('.popup__saved-button_confirms')
const defaultB = 'Да...'
const popupDelete = new PopupWithDelete(popupConfirmElementSelector, formSubmitConfirm)
function formSubmitConfirm({ card, cardId}) {
    console.log('x');
    api.deleteCard(cardId)
        .then(res => {
            console.log(res);
            cardId.deleteButtonCard()
            popupDelete.close()
        }) 
        .catch((error => console.error(`Ошибка при удалении карточки ${error}`)))
        .finally(() => popupDelete.setButtonText() )
   
}
popupDelete.setEventListeners()

///////////////////////////реализация класса Section//////////////////////////////////////
function createCard(item) {
    const cards = new Card(item, popupOpenImageSection
        .open, '.elements-template', popupDelete.open, (likeElement, cardId) => {
            if (likeElement.classList.contains('element__like-button_active')) {
                api.deleteLike(cardId)
                    .then(res => {
                        console.log(res);
                        cards.toggleLike(res.likes)
                    })
                    .catch((error => console.error(`Ошибка при удалении лайка ${error}`)))
            } else {
                api.addLike(cardId)
                    .then(res => {
                        console.log(res);
                        cards.toggleLike(res.likes)
                    })
                    .catch((error => console.error(`Ошибка при поставк лайка ${error}`)))
            }
        });
    const cardElement = cards.generateCard()
    return cardElement;
}
const cardListSelector = '.elements__list-template';
const cardsListSection = new Section((item) => {
    cardsListSection.addItem(createCard(item));
},
    cardListSelector
);
///////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////ВАЛИДАЦИЯ///////////////////////////////////////////////

const formEditValidator = new FormValidator(validationConfig, formElementEdit)
const formAddValidator = new FormValidator(validationConfig, formElementAdd)
const formAvatarValidator = new FormValidator(validationConfig, formElementAvatar)

//  //"Включаем" подписки на изменения в инпутах
formEditValidator.enableValidation()
formAddValidator.enableValidation()
formAvatarValidator.enableValidation()
///////////////////////////////////////////Основа API///////////////////////////////////////////////////////
Promise.all([api.getInfo(), api.getCard()])
    .then(([dataUser, dataCard]) => {
        console.log(dataCard);
        dataCard.forEach(element => {
            element.myid = dataUser._id
        });
        console.log(dataUser);
        userInfo.serUserInfo({ avatar: dataUser.avatar, firstname: dataUser.name, description: dataUser.about })
        cardsListSection.renderItems(dataCard)
    })
    .catch((error) => console.error(`Ошибка при начальных данный страницы ${error}`))
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// api.getInfo(data)
//     .then(res => res.json)
//     .then(res => console.log(res))