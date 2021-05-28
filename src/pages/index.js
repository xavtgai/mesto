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
    profileForm,
    addCardForm,
    nameInput,
    jobInput,
    editButton,
    addCardButton,
    submitButton,
    likeButton,
    settings
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

const userInfo = new UserInfo({ name: '.profile__title', info: '.profile__subtitle', id: '#0' });

let myId = null;
let userid = null;
api.myData().then((data) => {

    userInfo.setUserInfo2(data);
    console.log(userInfo.getUserInfo2(), "userinfo");
});
console.log(userInfo.getUserInfo2(), "userinfo2");

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


// form submitting
const profileSubmitHandler = function(data) {
    userInfo.setUserInfo(data);
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


//deleting card

const deleteSubmitHandler = function(data) {
        deleteCardConfirmation.close();
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

//new card
// function like(cardId) {
//     likeButton.addEventListener('click', () => {
//         console.log("like!")
//         api.addLike(cardId);
//     })
// }

function createCard(item) {
    const card = new Card(item, '#places', handleCardClick);
    //console.log(item["owner"]["_id"]);
    return card.generateCard();
}

api.myData()
    .then((result) => {
        //после редактирования данных будем обновлять текст в профиле с сервера и 
        //он не будет теряться при обновлении страницы. В задании этого не было, но кажется, что это логично
        document.querySelector('.profile__title').textContent = result.name;
        document.querySelector('.profile__subtitle').textContent = result.about;
    })


function pictureIsMine() {

}
// // initial cards adding
// const CardList = new Section({
//         items: initialCards,
//         renderer: (items) => {
//             items.reverse().forEach(item => {
//                 const cardElement = createCard(item);
//                 CardList.addItem(cardElement);
//             })
//         }
//     },
//     '.elements');
// CardList.renderItems();

function submitHandlerCard(values) {
    let currentText = submitButton.textContent;
    renderLoading(true, currentText);
    api.addCard(values["name"], values["link"]);

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

formProfile.enableValidation();
formNewCard.enableValidation();




// api.getInitialCards();
// api.profileEdit("Jugderdemediin Gurragchaa", "Mongolian astronaut");
api.myData();
//api.addCard("Монголия", "https://images.unsplash.com/photo-1603602943247-93dc0c81a932")
// api.deleteCard("60ae40475a5d3b0036d4144f");

api.getInitialCards()
    .then((data) => renderCards(data));

function renderCards(initialCards) {
    const CardList4 = new Section({
            items: initialCards,
            renderer: (items) => {
                items.forEach(item => {
                    const cardElement = createCard(item);
                    CardList4.addItem(cardElement);
                })
            }
        },
        '.elements');
    CardList4.renderItems();
}


// function renderCards(data) {
//     const CardList3 = new Section({
//             items: data,
//             renderer: (data) => {
//                 const card = createCard(data);
//                 console.log(card);
//                 CardList3.addItem(card);
//             }
//         },
//         '.elements');
//     CardList3.renderItems();
// }


// initial cards adding through api
// const CardList2 = new Section({
//         renderer: (item) => {
//             CardList2.addItem(createCard(item));
//         }
//     },
//     '.elements');
// api.getCards().then((result) => {
//     result.forEach((item) => {
//         console.log(createCard(item));
//     });
// });


// api.getInitialCards()
//     .then(result => {
//         CardList2.renderItems(result)
//     })
//     .then((data) => console.log(data))
//     .catch(console.log("no"));

// Promise.all([api.getInitialCards()])
//     .then(([pictures]) => {
//         CardList2.renderItems(pictures)
//     }).catch(console.log("все плохо"));
//     }).catch(console.log("все плохо"));
//     }).catch(console.log("все плохо"));