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
    initialCards,
    avatarButton,
    avatarForm,
    profileForm,
    addCardForm,
    nameInput,
    jobInput,
    editButton,
    addCardButton,
    submitButton,
    likeButton,
    settings,
    myJob,
    myName,
    myAvatar,
    elements
} from '../utils/constants.js';



const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: '56499e83-904f-41b8-8eb4-95712821cfa6',
        'Content-Type': 'application/json'
    }
});

function renderLoading(isLoading, currentText) {

    if (isLoading) {
        submitButton.textContent = "Сохранение...";
    } else {
        submitButton.textContent = currentText;
    }

}

const myInfo = new UserInfo({ name: '.profile__title', about: '.profile__subtitle', userpic: '.profile__avatar' });

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
    avatar.open();

})

// form submitting
const profileSubmitHandler = function(data) {
    myInfo.setUserInfo(data);
    myName.textContent = data['username'];
    myJob.textContent = data['profession'];
    let currentText = submitButton.textContent;
    renderLoading(true, currentText);
    api.profileEdit(data["username"], data["profession"]);
    renderLoading(false, currentText);
    popupProfile.close();
}

//change profile
const popupProfile = new PopupWithForm('.popup_profile', profileSubmitHandler);
popupProfile.setEventListeners();

//add cards
const popupCardAdd = new PopupWithForm('.popup_add-card', submitHandlerCard);
popupCardAdd.setEventListeners();

//replace avatar
const avatar = new PopupWithForm('.popup_avatar-replace', avatarSubmitHandler);
avatar.setEventListeners();


//deleting card

const deleteSubmitHandler = () => {
    const cardForDeletion = deleteCardConfirmation.currentCard;
    return api.deleteCard(cardForDeletion._data._id)
        .then(cardForDeletion.remove);
}

//delete card confirmation
const deleteCardConfirmation = new PopupWithForm('.popup_delete-confirmation', deleteSubmitHandler);
deleteCardConfirmation.setEventListeners();

//open large image view
const Image = new PopupWithImage('.popup_viewer');

function handleCardClick(data) {
    Image.open(data);
}
Image.setEventListeners();

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
                card.toggleLike();
                card.renewLikes(res.likes.length);
                item.isLiked = !item.isLiked;
            });
        }
    );

    return card.generateCard();
}

api.myData()
    .then((result) => {
        //после редактирования данных будем обновлять текст в профиле с сервера и 
        //он не будет теряться при обновлении страницы. В задании этого не было, но кажется, что это логично
        document.querySelector('.profile__title').textContent = result.name;
        document.querySelector('.profile__subtitle').textContent = result.about;
        myAvatar.src = result.avatar;
    })

function submitHandlerCard(values) {
    let currentText = submitButton.textContent;
    renderLoading(true, currentText);
    api.addCard(values["placename"], values["link"]).then((res) => {
        const newCard = createCard({
            name: values["placename"],
            link: values["link"],
            trash_icon: 1,
            isLiked: 0,
            likes: [],
            _id: res._id
        });
        elements.prepend(newCard);

    });
    renderLoading(false, currentText);
}


function avatarSubmitHandler(values) {
    let currentText = submitButton.textContent;
    renderLoading(true, currentText);
    myAvatar.src = values["avatar_link"];
    api.avatarReplace(values["avatar_link"]);
    renderLoading(false, currentText);
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

function renderCards(initialCards, myId) {
    const CardList = new Section({
            items: initialCards,
            renderer: (items) => {
                items.forEach(item => {
                    if (item.owner._id === myId) {
                        item.trash_icon = 1;
                    } else { item.trash_icon = 0; }

                    if (item.likes.filter(user => user._id === myId).length != 0) {
                        item.isLiked = 1;
                    }

                    const cardElement = createCard(item);
                    CardList.addItem(cardElement);
                })
            }
        },
        '.elements');
    CardList.renderItems();
}
Promise.all([
        api.myData(),
        api.getInitialCards(),
    ])
    .then(([myData, initialCards]) => {
        myInfo.setUserInfo({
            name: myData.name,
            about: myData.about,
            userpic: myData.avatar
        });
        renderCards(initialCards, myData._id);

    }).catch(console.error);