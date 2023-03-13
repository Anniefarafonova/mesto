const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const profileButtonElement = document.querySelector(".profile");
const profileEditButtonElement = profileButtonElement.querySelector(".profile__edit-button");

let formElement = document.querySelector(".form");
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".form__item_type_name");// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".form__item_type_job");// Воспользуйтесь инструментом .querySelector()
let nameTitle = profileButtonElement.querySelector(".profile__title");
let jobSubtitle = profileButtonElement.querySelector(".profile__subtitle");


const editButton = function () {
    popupElement.classList.add("popup_opened")
    nameTitle.value = nameInput.textContent;
    jobSubtitle.value = jobInput.textContent;
};
const closeButton = function () {
    popupElement.classList.remove("popup_opened")
};

/*const closeButtonByClickOnOverlay = function (event) {
    console.log(event.target, event.currentTarget);
    if (event.target === event.currentTarget) {
        closeButton()
    }
}  
popupElement.addEventListener("click", closeButtonByClickOnOverlay); */

popupCloseButtonElement.addEventListener("click", closeButton);
profileEditButtonElement.addEventListener("click", editButton);



function handleFormSubmit (evt) {
    evt.preventDefault(); 
nameTitle.textContent = nameInput.value;
jobSubtitle.textContent = jobInput.value;
closeButton()
}
formElement.addEventListener('submit', handleFormSubmit); 



