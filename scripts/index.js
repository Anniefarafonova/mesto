import Card from "./Card.js"
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

//export{ nameAddInput, jobAddInput}


const buttonSavedInput = formElementEdit.querySelector(".popup__saved-button");
const buttonCreateInput = popupAddElement.querySelector(".popup__saved-button");

const nameTitle = profileButtonElement.querySelector(".profile__title");
const jobSubtitle = profileButtonElement.querySelector(".profile__subtitle");

//функция открытия попапа
export function openPopup(popup) {
    popup.classList.add("popup_opened")
    document.addEventListener("keydown", closePopupCloseEsc)
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



popupEditElement.addEventListener("mousedown", closeButtonByClickOnOverlay)
popupAddElement.addEventListener("mousedown", closeButtonByClickOnOverlay)
popupOpenImageElement.addEventListener("mousedown", closeButtonByClickOnOverlay)

profileEditButtonElement.addEventListener("click", () => openPopup(popupEditElement));
profileAddButtonElement.addEventListener("click", () => openPopup(popupAddElement));
popupEditCloseButtonElement.addEventListener("click", () => closePopup(popupEditElement));
popupAddCloseButtonElement.addEventListener("click", () => closePopup(popupAddElement));
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