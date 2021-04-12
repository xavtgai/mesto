let formElement = document.querySelector('.popup__form');

let nameInput = document.getElementById('name');
let jobInput = document.getElementById('job');


let profileTitle = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_visible');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;

}

function closePopup() {
    popup.classList.remove('popup_visible')
}

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);