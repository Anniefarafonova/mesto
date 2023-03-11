const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupCavedButtonElement = popupElement.querySelector(".popup__saved-button");
const profileButtonElement = document.querySelector(".profile");
const profileEditButtonElement = profileButtonElement.querySelector(".profile__edit-button");
const profileAddButtonElement = profileButtonElement.querySelector(".profile__add-button");

const EditButton = function () {
    popupElement.classList.add("popup_opened")
    console.log("Edit Button");
};
const CloseButton = function () {
    popupElement.classList.remove("popup_opened")
    console.log("Close Button");
};


const CloseButtonByClickOnOverlay = function (event) {
    console.log(event.target, event.currentTarget);
    if (event.target === event.currentTarget) {
        CloseButton()
    }
}

popupCloseButtonElement.addEventListener("click", CloseButton);
profileEditButtonElement.addEventListener("click", EditButton);
popupElement.addEventListener("click", CloseButtonByClickOnOverlay)


popupCavedButtonElement
// Находим форму в DOM
let formElement = document.querySelector(".form");
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".form__item_name");// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".form__item_theme");// Воспользуйтесь инструментом .querySelector()
let nameTitle = profileButtonElement.querySelector(".profile__title");
let jobSubtitle = profileButtonElement.querySelector(".profile__subtitle");


function handleFormSubmit (evt) {
    evt.preventDefault(); 

nameTitle.textContent = nameInput.value;
jobSubtitle.textContent = jobInput.value;
CloseButton()

}
formElement.addEventListener('submit', handleFormSubmit); 



