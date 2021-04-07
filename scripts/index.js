const popup = document.querySelector('.popup');
console.log(popup);

function openPopup() {
    popup.classList.add('.popup_visible')
}

function closePopup() { popup.classList.remove('.popup_visible') }

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function() { openPopup(); })