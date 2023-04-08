// Находим popup
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add");
const popupOpenImageElement = document.querySelector(".popup_type_image");

const popupEditCloseButtonElement = popupEditElement.querySelector(".popup__close");
const popupAddCloseButtonElement = popupAddElement.querySelector(".popup__close");

// Находим кнопки
const profileButtonElement = document.querySelector(".profile");
const profileEditButtonElement = profileButtonElement.querySelector(".profile__edit-button");
const profileAddButtonElement = profileButtonElement.querySelector(".profile__add-button");



// Находим поля формы в DOM
const formElementEdit = popupEditElement.querySelector(".form");
const formElementAdd = popupAddElement.querySelector(".form");

const nameEditInput = formElementEdit.querySelector(".form__item_type_name");
const jobEditInput = formElementEdit.querySelector(".form__item_type_job");

const nameAddInput = popupAddElement.querySelector(".form__item_type_name");
const jobAddInput = popupAddElement.querySelector(".form__item_type_job");

const buttonSavedInput = formElementEdit.querySelector(".popup__saved-button");
const buttonCreateInput = popupAddElement.querySelector(".popup__saved-button");

const nameTitle = profileButtonElement.querySelector(".profile__title");
const jobSubtitle = profileButtonElement.querySelector(".profile__subtitle");

//функция открытия попапа
function openPopup(popup) {
    popup.classList.add("popup_opened")
};
//функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove("popup_opened")
};

//Закрытия попапа нажатием на оверлей
function closeButtonByClickOnOverlay (event) {
    console.log(event.target, event.currentTarget);
    if (event.target === event.currentTarget) {
        closePopup(popupEditElement)
        closePopup(popupAddElement)
        closePopup(popupOpenImageElement)
    }
} 
//Закрытия попапа нажатием на Escape
function closePopupCloseEsc(evt) {
    if (evt.key === "Escape") {
        closePopup(popupEditElement)
        closePopup(popupAddElement)
        closePopup(popupOpenImageElement)
        console.log(evt)
    }
}
document.addEventListener("keydown", closePopupCloseEsc)


popupEditElement.addEventListener("click", closeButtonByClickOnOverlay)
popupAddElement.addEventListener("click", closeButtonByClickOnOverlay)
popupOpenImageElement.addEventListener("click", closeButtonByClickOnOverlay)






profileEditButtonElement.addEventListener("click", () => openPopup(popupEditElement));
profileAddButtonElement.addEventListener("click", () => openPopup(popupAddElement));
popupEditCloseButtonElement.addEventListener("click", () => closePopup(popupEditElement));
popupAddCloseButtonElement.addEventListener("click", () => closePopup(popupAddElement));
formElementEdit.addEventListener('submit', handleFormSubmitEdit);


function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameEditInput.value;
    jobSubtitle.textContent = jobEditInput.value;
    formElementEdit.reset();
    const formButtonEdit = formElementEdit.querySelector(".popup__saved-button")
    disableButton(formButtonEdit, validationConfig)
    closePopup(popupEditElement)
   
}

/////////////////////////////////////////////////////////

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const elementsTemplate = document.querySelector('#elements-template').content;
const listCard = document.querySelector('.elements__list-template')

//initialCards.forEach(item => createCard(item.name, item.link, item.alt));
initialCards.forEach(item => listCard.append(createCard(item.name, item.link, item.alt)));
// Coздание карточек
function createCard(name, link, alt) {
    //Клонирование
    const elementsTemplateClone = elementsTemplate.querySelector('.element').cloneNode(true);
    // Определение всех нужных const
    const elementsTemplateTitle = elementsTemplateClone.querySelector('.element__title');
    const elementsTemplateImage = elementsTemplateClone.querySelector('.element__image');
    const likeButton = elementsTemplateClone.querySelector('.element__like-button')
    const deleteButton = elementsTemplateClone.querySelector('.element__delete')
    elementsTemplateTitle.textContent = name;
    elementsTemplateImage.alt = name;
    elementsTemplateImage.src = link;

    // слушатель лайка
    likeButton.addEventListener('click', likeCard)

    // слушатель удалялки
    deleteButton.addEventListener('click', deleteCard)

    // Слушатель открытия каринки
    elementsTemplateClone.querySelector('.element__image').addEventListener('click', () => openPopupImage(name, link, alt)) //функцияОткрытияКартинки

    return elementsTemplateClone
}

//функцияОткрытияКартинки
function openPopupImage(name, link, alt) {
    //const popupOpenImageElement = document.querySelector(".popup_type_image");
    const popupOpenImage = popupOpenImageElement.querySelector(".popup__image");
    const popupOpenImageText = popupOpenImageElement.querySelector(".popup__text");
    const popupCloseImageContainer = popupOpenImageElement.querySelector(".popup__close_image-cls");

    // разбираем данные, кладём их в попап, открывает попап с картинкой
    popupOpenImageElement.querySelector('.popup__image').src = link;
    popupOpenImageElement.querySelector('.popup__image').alt = name;
    popupOpenImageElement.querySelector('.popup__text').textContent = name

    openPopup(popupOpenImageElement)

    popupCloseImageContainer.addEventListener("click", () => closePopup(popupOpenImageElement));
}

//Функция создания карточки
function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    const elementsTemplateClone = elementsTemplate.querySelector('.element').cloneNode(true);
    const newCard = createCard(nameAddInput.value, jobAddInput.value);
    formElementAdd.reset();
    listCard.prepend(newCard)
    const formButtonAdd = formElementAdd.querySelector(".popup__saved-button")
    disableButton(formButtonAdd, validationConfig)
    closePopup(popupAddElement)
}
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

// Функция лайка
function likeCard(evt) {
    evt.target.classList.toggle('element__like-button_active')
};
//Функция удаления
function deleteCard(evt) {
    const card = evt.target.closest('.element')
    card.remove()
};