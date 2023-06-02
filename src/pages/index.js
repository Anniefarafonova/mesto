import Card from "../components/Card.js"
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupWithDelete from '../components/PopupWithDelete.js'

import { validationConfig } from '../components/FormValidator.js'
import { FormValidator } from '../components/FormValidator.js'
import './index.css'

import { popupEditElement, popupEditElementSelector, popupAddElement, popupAddElementSelector, popupOpenImageElement, popupOpenImageElementSelector, popupCloseElement, popupConfirmElementSelector, popupAvatarElement, popupAvatarElementSelector, profileButtonElement, profileEditButtonElement, profileAddButtonElement, avatarButton, formElementEdit, formElementAdd, formElementAvatar, config } from '../utils/constants.js'

/////////////////////////////////////Подкюч. к серверу/////////////////////////////////////////////////
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '26786be3-fed9-4d83-9ae2-1348eee1b7d5',
        'Content-Type': 'application/json'
    }
});

let userId;

/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Попап открытия карточек////////////////////////////////////////////
const popupOpenImageSection = new PopupWithImage(popupOpenImageElementSelector)
popupOpenImageSection.setEventListeners()
///////////////////////////////////////////////////////////////////////////////////////////
//Попап EDIT
const userInfo = new UserInfo(config);
////////////////////////////////////////Попап EDIT/////////////////////////////////////////////////
const editPopupWithForm = new PopupWithForm(popupEditElementSelector, handleFormSubmitEdit)
function handleFormSubmitEdit(data) {
    api.setUserInfo(data)
        .then(res => {
            const userInfoAll = { avatar: res.avatar, firstname: res.name, description: res.about }
            userInfo.serUserInfo(userInfoAll)
            editPopupWithForm.close()
        })
        .catch((error => console.error(`Ошибка при редактировании ${error}`)))
        .finally(() => editPopupWithForm.setButtonText())

}
editPopupWithForm.setEventListeners()
///Иконка EDIT/////////////////////////
profileEditButtonElement.addEventListener('click', clickProfileEditButtonElement);
function clickProfileEditButtonElement() {
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

const addtPopupWithForm = new PopupWithForm(popupAddElementSelector, handleFormSubmitAdd)
function handleFormSubmitAdd(data) {
    console.log('open');
    formElementAdd.reset();
    formAddValidator.resetValidation()
    Promise.all([api.getInfo(), api.addCard(data)])
        .then(([dataUser, dataCard]) => {
            console.log(dataCard);
            userId = dataUser._id  
            dataCard.myid = userId
            // dataCard.myid = dataUser._id
            cardsListSection.addItem(createCard(dataCard));
            addtPopupWithForm.close();
        })
        .catch((error => console.error(`Ошибка при создании карточки ${error}`)))
        .finally(() => addtPopupWithForm.setButtonText())
};
addtPopupWithForm.setEventListeners()
///Иконка ADD/////////////////////////
profileAddButtonElement.addEventListener('click', clickProfileAddButtonElement);
function clickProfileAddButtonElement() {
    addtPopupWithForm.open()
    formAddValidator.resetValidation()
}
//////////////////////////////////////////////////Попап AVATAR///////////////////////////////////////
const avatarPopup = new PopupWithForm(popupAvatarElementSelector, handleFormSubmitAvatar)
function handleFormSubmitAvatar(data) {
    // formElementAvatar.reset();
    // formAvatarValidator.resetValidation()
    api.setUserAvatar(data)
        .then(res => {
            console.log(res);
            userInfo.serUserInfo({ avatar: res.avatar, firstname: res.name, description: res.about })
           avatarPopup.close()
        })
        .catch((error => console.error(`Ошибка при редактировании аватара ${error}`)))
        .finally(() => avatarPopup.setEventListeners())
};
avatarPopup.setEventListeners()

console.log(avatarButton);
///Иконка CLOSE/////////////////////////
avatarButton.addEventListener('click', clickAvatarButton)
function clickAvatarButton() {
    formElementAvatar.reset();
    formAvatarValidator.resetValidation()
    avatarPopup.open()

}

//////////////////////////////////////////////Попап CONFIRM//////////////////////////////////////////////////////


const popupDelete = new PopupWithDelete(popupConfirmElementSelector, handleFormSubmitConfirm)
function handleFormSubmitConfirm({ card, cardId }) {
    console.log('x');
    // const text = 'Да...'
    popupDelete.getButtonText()
    api.deleteCard(cardId)
        .then(res => {
            console.log(res);
            card.deleteButtonCard()
            popupDelete.getButtonText()
            popupDelete.close()
        })
        .catch((error => console.error(`Ошибка при удалении карточки ${error}`)))
}
popupDelete.setEventListeners()

///////////////////////////реализация класса Section//////////////////////////////////////

function createCard(item) {
    const cards = new Card(item, popupOpenImageSection
        .open, '.elements-template',
        () => {
            const id = cards.getId()
            console.log(id);
            console.log('x');
            popupDelete.open(),
                popupDelete.setSubmitHanlder(() => {
                    api.deleteCard(id)
                    .then(() => {
                        cards.deleteButtonCard()
                        popupDelete.close()
                    })
                    .catch((error => console.error(`Ошибка при удалении картинки ${error}`)))
                .finally(() => popupDelete.setButtonText())
            })
        },
        (likeElement, cardId) => {
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
popupDelete.setSubmitHanlder()
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
        userId = dataUser._id
        console.log(userId);
        dataCard.forEach(element => {
            element.myid = userId
        });
        console.log(dataUser);
        userInfo.serUserInfo({ avatar: dataUser.avatar, firstname: dataUser.name, description: dataUser.about })
        cardsListSection.renderItems(dataCard.reverse())

    })
    .catch((error) => console.error(`Ошибка при начальных данный страницы ${error}`))
//////////////////////////////////////////////////////////////////////////////////////////////////////////


