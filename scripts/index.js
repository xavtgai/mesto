let formElement = document.querySelector('.popup__edit-profile');
const addCardForm = document.querySelector('.popup__add-card-form');

let nameInput = document.getElementById('name');
let jobInput = document.getElementById('job');

let cardTitle = document.getElementById('card_title');
let cardLink = document.getElementById('card_link');


let profileTitle = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

let popupEdit = document.querySelector('.popup');
let popupAddCard = document.querySelector('.popup__add-card');


//let popup = document.querySelector('.popup');


function openPopup(popup_type) {
    popup_type.classList.add('popup_visible');
}

function closePopup(popup_type) {
    popup_type.classList.remove('popup_visible')
}


let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let closeCardButton = document.querySelector('.popup__close-new-card');
let addCardButton = document.querySelector('.profile__add-button');


editButton.addEventListener('click', function() {
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
});

closeButton.addEventListener('click', function() {
    closePopup(popupEdit)
});
closeCardButton.addEventListener('click', function() {
    closePopup(popupAddCard)
});

addCardButton.addEventListener('click', function() {
    openPopup(popupAddCard);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}



const elements = document.querySelector('.elements');

const placeTemplate = document.querySelector('#places').content;

function newCardSubmitHandler(evt) {
    evt.preventDefault();
    const placeElement = placeTemplate.cloneNode(true);
    placeElement.querySelector('.element__photo').src = card_link.value;
    placeElement.querySelector('.element__photo').alt = cardTitle.value;
    placeElement.querySelector('.element__photo-title').textContent = cardTitle.value;
    elements.prepend(placeElement);

    console.log(elements);
    closePopup(popupAddCard);
}
formElement.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', newCardSubmitHandler);

initialCards.forEach(function(item) {
    const placeElement = placeTemplate.cloneNode(true);
    placeElement.querySelector('.element__photo').src = item.link;
    placeElement.querySelector('.element__photo-title').textContent = item.name;
    elements.append(placeElement);
})

elements.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('element__like')) {
            evt.target.classList.toggle('element__like_selected');
        }
    })
    //const deleteButton = document.querySelector('.element__delete');

elements.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('element__delete')) {
        const card = evt.target.closest('.element');
        card.remove();
    }
})

let viewer = document.querySelector('.popup__viewer');
let closeViewerButton = document.querySelector('.popup__close-viewer');

elements.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('element__photo')) {
        openPopup(viewer);
        console.log(evt);
        const source = document.querySelector('.popup__large-image');
        source.src = evt.target.attributes.src.nodeValue;
        const imgTitle = document.querySelector('.popup__image-title');
        imgTitle.textContent = evt.target.offsetParent.childNodes[5].childNodes[1].firstChild.nodeValue;
    }
})

closeViewerButton.addEventListener('click', function() {
    closePopup(viewer)
});