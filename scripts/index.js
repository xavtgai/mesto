import {
    Card
} from '../scripts/Card.js';
import {
    FormValidator
}
from '../scripts/FormValidator.js';


const profileForm = document.querySelector('.popup__edit-profile');
const addCardForm = document.querySelector('.popup__add-card-form');

const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');

const cardTitle = document.getElementById('card_title');
const cardLink = document.getElementById('card_link');

const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popup = document.querySelector('.popup');
const popups = Array.from(document.querySelectorAll('.popup'));

const popupEdit = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add-card');

const editButton = document.querySelector('.profile__edit-button');


const addCardButton = document.querySelector('.profile__add-button');

const elements = document.querySelector('.elements');
const placeTemplate = document.querySelector('#places').content;

export const viewer = document.querySelector('.popup_viewer');
export const source = document.querySelector('.popup__large-image');
export const imgTitle = document.querySelector('.popup__image-title');


function closePopup(popupType) {
    popupType.classList.remove('popup_visible');
    document.removeEventListener('keydown', closeByEscape);

}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_visible')
        closePopup(openedPopup);
    }
}

export function openPopup(popupType) {
    popupType.classList.add('popup_visible');
    document.addEventListener('keydown', closeByEscape);
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

function createCard(item) {
    const card = new Card(item, '#places');
    return card.generateCard();
}

function newCardSubmitHandler(evt) {
    evt.preventDefault();
    const newCard = createCard({ name: cardTitle.value, link: card_link.value })
    elements.prepend(newCard);
    addCardForm.reset();
    closePopup(popupAddCard);
}

editButton.addEventListener('click', function() {
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
});

popups.forEach((popupWindow) => popupWindow.addEventListener('click',
    function(event) {
        if (event.target.classList.contains('popup_visible')) {
            closePopup(popupWindow)
        }
        if (event.target.classList.contains('popup__close-button')) {
            closePopup(popupWindow)
        }
    }))


addCardButton.addEventListener('click', function() {
    openPopup(popupAddCard);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
});


profileForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', newCardSubmitHandler);



initialCards.forEach((item) => {
    const cardElement = createCard(item)
    elements.append(cardElement);
});


const settings = {

    fieldSelector: '.popup__field',
    buttonSelector: '.popup__save',
    errorClass: 'popup__field_error',
    activeClass: 'popup__save',
    inactiveClass: 'popup__save_inactive'

};
const formProfile = new FormValidator(
    settings,
    profileForm
)

const formNewCard = new FormValidator(
    settings,
    addCardForm
)
formProfile.enableValidation();
formNewCard.enableValidation();