import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import {
    FormValidator
} from '../components/FormValidator.js';
import Api from '../components/Api.js';

import {
    avatarButton,
    avatarForm,
    profileForm,
    addCardForm,
    nameInput,
    jobInput,
    editButton,
    addCardButton,
    settings,
    myJob,
    myName,
    elements,
    saveProfileButton,
    createCardButton,
    avatarReplaceButton
} from '../utils/constants.js';



const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: '56499e83-904f-41b8-8eb4-95712821cfa6',
        'Content-Type': 'application/json'
    }
});

function renderLoading(isLoading, button, currentText) {

    if (isLoading) {
        button.textContent = "Сохранение...";
    } else {
        button.textContent = currentText;
    }

}

const myInfo = new UserInfo({ name: '.profile__title', about: '.profile__subtitle', userPic: '.profile__avatar' });

// open profile change dialogue
editButton.addEventListener('click', () => {
    nameInput.value = myInfo.getUserInfo().name;
    jobInput.value = myInfo.getUserInfo().about;
    popupProfile.open();
});

//open add card dialogue

addCardButton.addEventListener('click', () => {
    formNewCard.disableButton();
    popupCardAdd.open();

})

//open avatar replacement dialogue
avatarButton.addEventListener('click', () => {
    formAvatar.disableButton();
    avatarPopup.open();

})

// form submitting
const profileSubmitHandler = function(data) {
    const currentText = saveProfileButton.textContent;
    renderLoading(true, saveProfileButton, currentText);
    api.profileEdit(data["username"], data["profession"])
        .then((res) => {
            myInfo.setUserInfo(res);
        })
        .then(() => popupProfile.close())
        .catch(console.error)
        .finally(() => renderLoading(false, saveProfileButton, currentText));
}

//change profile
const popupProfile = new PopupWithForm('.popup_profile', profileSubmitHandler);
popupProfile.setEventListeners();

//add cards
const popupCardAdd = new PopupWithForm('.popup_add-card', submitHandlerCard);
popupCardAdd.setEventListeners();

//replace avatar
const avatarPopup = new PopupWithForm('.popup_avatar-replace', avatarSubmitHandler);
avatarPopup.setEventListeners();


//deleting card

const deleteSubmitHandler = () => {
    const cardForDeletion = deleteCardConfirmation.currentCard;
    return api.deleteCard(cardForDeletion._data._id)
        .then(cardForDeletion.remove)
        .then(() => deleteCardConfirmation.close())
        .catch(console.error);
}

//delete card confirmation
const deleteCardConfirmation = new PopupWithForm('.popup_delete-confirmation', deleteSubmitHandler);
deleteCardConfirmation.setEventListeners();

//open large image view
const imagePopup = new PopupWithImage('.popup_viewer');

function handleCardClick(data) {
    imagePopup.open(data);
}
imagePopup.setEventListeners();

function createCard(item) {
    const card = new Card(item,
        '#places',
        handleCardClick,
        () => {
            deleteCardConfirmation.currentCard = card;
            deleteCardConfirmation.open();
        },
        () => {
            (item.isLiked ?
                api.removeLike(item._id) :
                api.addLike(item._id))
            .then(res => {

                    card.renewLikes(res.likes.length);
                    item.isLiked = !item.isLiked;
                })
                .catch(console.error);
        }
    );

    return card.generateCard();
}

function avatarSubmitHandler(values) {
    const currentText = avatarReplaceButton.textContent;
    renderLoading(true, avatarReplaceButton, currentText);
    api.avatarReplace(values["avatar_link"])
        .then((res) => myInfo.setUserInfo({ avatar: res.avatar }))
        .then(() => avatarPopup.close())
        .catch(console.error)
        .finally(() => renderLoading(false, avatarReplaceButton, currentText))

}

const formNewCard = new FormValidator(
    settings,
    addCardForm
)
const formProfile = new FormValidator(
    settings,
    profileForm
)

const formAvatar = new FormValidator(
    settings,
    avatarForm
)

formProfile.enableValidation();
formNewCard.enableValidation();
formAvatar.enableValidation();

let cardList;

Promise.all([
        api.myData(),
        api.getInitialCards(),
    ])
    .then(([myData, initialCards]) => {
        myInfo.setUserInfo({
            name: myData.name,
            about: myData.about,
            avatar: myData.avatar
        });
        cardList = new Section({
                items: initialCards,
                renderer: item => {

                    if (item.owner._id === myData._id) {
                        item.trashIcon = 1;
                    } else { item.trashIcon = 0; }

                    if (item.likes.filter(user => user._id === myData._id).length != 0) {
                        item.isLiked = 1;
                    }

                    const cardElement = createCard(item);
                    cardList.addItem(cardElement);
                }

            },
            '.elements');
        cardList.renderItems();
    }).catch(console.error);

function submitHandlerCard(values) {
    const currentText = createCardButton.textContent;
    renderLoading(true, createCardButton, currentText);
    api.addCard(values["placename"], values["link"])
        .then((res) => {
            const newCard = createCard({
                name: values["placename"],
                link: values["link"],
                trashIcon: 1,
                isLiked: 0,
                likes: [],
                _id: res._id
            });
            cardList.addItem(newCard);

        })
        .then(() => popupCardAdd.close())
        .finally(() => renderLoading(false, createCardButton, currentText));

}