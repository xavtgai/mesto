import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import {
    FormValidator
} from '../components/FormValidator.js';


import {
    initialCards,
    profileForm,
    addCardForm,
    nameInput,
    jobInput,
    editButton,
    addCardButton,
    settings
} from '../utils/constants.js';

// open profile
editButton.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().info;
    popupProfile.open();
});

//open add card dialogue

addCardButton.addEventListener('click', () => {
    formNewCard.disableButton();
    popupCardAdd.open();

})

const userInfo = new UserInfo({ name: '.profile__title', info: '.profile__subtitle' });

// form submitting
const profileSubmitHandler = function(data) {
    userInfo.setUserInfo(data);
    popupProfile.close();
}

//change profile
const popupProfile = new PopupWithForm('.popup_profile', profileSubmitHandler);
popupProfile.setEventListeners();

//add cards
const popupCardAdd = new PopupWithForm('.popup_add-card', submitHandlerCard);
popupCardAdd.setEventListeners();

//open large image view
const Image = new PopupWithImage('.popup_viewer');

function handleCardClick(data) {
    Image.open(data);
}
Image.setEventListeners();

//new card
function createCard(item) {
    const card = new Card(item, '#places', handleCardClick);
    return card.generateCard();
}

// initial cards adding
const CardList = new Section({
        items: initialCards,
        renderer: (items) => {
            items.reverse().forEach(item => {
                const cardElement = createCard(item);
                CardList.addItem(cardElement);
            })
        }
    },
    '.elements');
CardList.renderItems();

function submitHandlerCard(values) {
    CardList.addItem(createCard(values));
}

const formNewCard = new FormValidator(
    settings,
    addCardForm
)
const formProfile = new FormValidator(
    settings,
    profileForm
)

formProfile.enableValidation();
formNewCard.enableValidation();