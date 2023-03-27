// Находим popup
const popupElement = document.querySelector(".popup");
const popupEditElement = document.querySelector(".popup_type_edit");
const popupAddElement = document.querySelector(".popup_type_add");

const popupEditCloseButtonElement = popupEditElement.querySelector(".popup__close");
const popupAddCloseButtonElement = popupAddElement.querySelector(".popup__close");

// Находим кнопки
const profileButtonElement = document.querySelector(".profile");
const profileEditButtonElement = profileButtonElement.querySelector(".profile__edit-button");
const profileAddButtonElement = profileButtonElement.querySelector(".profile__add-button");

// Находим поля формы в DOM
let formElement = document.querySelector(".form");
let formElementAdd = popupAddElement.querySelector(".form");

let nameEditInput = formElement.querySelector(".form__item_type_name");
let jobEditInput = formElement.querySelector(".form__item_type_job");

let nameAddInput = popupAddElement.querySelector(".form__item_type_name");
let jobAddInput = popupAddElement.querySelector(".form__item_type_job");

let buttonSavedInput = formElement.querySelector(".popup__saved-button");
let buttonCreateInput = popupAddElement.querySelector(".popup__saved-button");

let nameTitle = profileButtonElement.querySelector(".profile__title");
let jobSubtitle = profileButtonElement.querySelector(".profile__subtitle");

//функция открытия попапа
function openPopup(popup) {
    popup.classList.add("popup_opened")
};
//функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove("popup_opened")
};

profileEditButtonElement.addEventListener("click", () => openPopup(popupEditElement));
profileAddButtonElement.addEventListener("click", () => openPopup(popupAddElement));
popupEditCloseButtonElement.addEventListener("click", () => closePopup(popupEditElement));
popupAddCloseButtonElement.addEventListener("click", () => closePopup(popupAddElement));
buttonSavedInput.addEventListener("click", () => formElement.addEventListener('submit', handleFormSubmit));


function handleFormSubmit(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameEditInput.value;
    jobSubtitle.textContent = jobEditInput.value;
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
const list = document.querySelector('.element__list-template')

initialCards.forEach(item => createCard(item.name, item.link, item.alt));
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
    elementsTemplateTitle.alt = alt;
    elementsTemplateImage.src = link;

    // слушатель лайка
    likeButton.addEventListener('click', likePopup)

    // слушатель удалялки
    deleteButton.addEventListener('click', deletePopup)

    // Слушатель открытия каринки
    elementsTemplateClone.querySelector('.element__image').addEventListener('click', () => openPopupImage(name, link)) //функцияОткрытияКартинки

    list.append(elementsTemplateClone);
    return elementsTemplateClone
}

//функцияОткрытияКартинки
function openPopupImage(name, link, alt) {
    const popupOpenImageElement = document.querySelector(".popup_type_image");
    const popupOpenImageContainer = popupOpenImageElement.querySelector(".popup__container_image-cntr");
    const popupOpenImage = popupOpenImageElement.querySelector(".popup__image");
    const popupOpenImageText = popupOpenImageElement.querySelector(".popup__text");
    const popupCloseImageContainer = popupOpenImageElement.querySelector(".popup__close_image-cls");

    // разбираем данные, кладём их в попап, открывает попап с картинкой
    popupOpenImageElement.querySelector('.popup__image').src = link;
    popupOpenImageElement.querySelector('.popup__text').textContent = name

    popupOpenImageElement.classList.add('popup_opened')

    popupCloseImageContainer.addEventListener("click", () => closePopup(popupOpenImageElement));
}

//Функция создания карточки
function handleSubmit(evt) {
    evt.preventDefault();
    const elementsTemplateClone = elementsTemplate.querySelector('.element').cloneNode(true);
    const newCard = createCard(nameAddInput.value, jobAddInput.value);
    list.append(newCard)
    closePopup(popupAddElement)
    return handleSubmit
}

buttonCreateInput.addEventListener('click', () => formElementAdd.addEventListener('submit', handleSubmit));

// Функция лайка
function likePopup(evt) {
    evt.target.classList.toggle('element__like-button_active')
};

//Функция удаления
function deletePopup(evt) {
    const card = evt.target.closest('.element')
    card.remove()
};

//////////////////////////////////////


