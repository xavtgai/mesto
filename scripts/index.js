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
const closeButton = document.querySelector('.popup__close-button');

const closeCardButton = document.querySelector('.popup__close-new-card');
const addCardButton = document.querySelector('.profile__add-button');

const elements = document.querySelector('.elements');
const placeTemplate = document.querySelector('#places').content;

const viewer = document.querySelector('.popup_viewer');
const closeViewerButton = document.querySelector('.popup__close-viewer');


function closePopup(popupType) {
    popupType.classList.remove('popup_visible')
}

function closeByEscape(event, popupType) {
    if (event.key === "Escape") {
        closePopup(popupType);
        window.removeEventListener('keydown', function() {
            closeByEscape(event, popupType)
        });
    }
}

function openPopup(popupType) {
    popupType.classList.add('popup_visible');
    window.addEventListener('keydown', function() {
        closeByEscape(event, popupType)
    });
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

function removeCard(evt) {
    evt.target.closest('.element').remove();
}

function getCardElement(data) {

    const placeElement = placeTemplate.cloneNode(true);
    const placeImage = placeElement.querySelector('.element__photo');
    placeImage.src = data.link;
    placeImage.alt = data.name;
    placeElement.querySelector('.element__photo-title').textContent = data.name;
    //like
    const placeLike = placeElement.querySelector('.element__like');
    placeLike.addEventListener('click', function() {
        placeLike.classList.toggle('element__like_selected');
    });
    //delete
    const deleteButton = placeElement.querySelector('.element__delete');
    deleteButton.addEventListener('click', removeCard);
    //open zoom
    placeImage.addEventListener('click', function(evt) {
        openPopup(viewer);
        const source = document.querySelector('.popup__large-image');
        const imgTitle = document.querySelector('.popup__image-title');
        const imgText = evt.target.offsetParent.childNodes[5].childNodes[1].firstChild.nodeValue;
        imgTitle.textContent = imgText;
        source.alt = imgText;
        source.src = evt.target.attributes.src.nodeValue;

    });
    return placeElement;
}

function newCardSubmitHandler(evt) {
    evt.preventDefault();
    const newCard = getCardElement({ name: cardTitle.value, link: card_link.value })
    elements.prepend(newCard);
    addCardForm.reset();
    closePopup(popupAddCard);
}

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

function closeByOverlay(event, popupType) {
    if (event.currentTarget === event.target) {
        closePopup(popupType);
    }
}

popups.forEach((popupWindow) => popupWindow.addEventListener('click',
    function(event) {
        if (event.target.classList.contains('popup_profile')) {
            closeByOverlay(event, popupEdit)
        } else if (event.target.classList.contains('popup_add-card')) {
            closeByOverlay(event, popupAddCard);
        } else {
            closeByOverlay(event, viewer);
        }

    }))


addCardButton.addEventListener('click', function() {
    openPopup(popupAddCard);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
});


profileForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', newCardSubmitHandler);

closeViewerButton.addEventListener('click', function() {
    closePopup(viewer)
});

initialCards.forEach(function(item) {
    const placeElement = getCardElement(item);

    elements.append(placeElement);
})