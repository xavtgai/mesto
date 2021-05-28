export const profileForm = document.querySelector('.popup__edit-profile');
export const addCardForm = document.querySelector('.popup__add-card-form');
export const nameInput = document.getElementById('name');
export const jobInput = document.getElementById('job');
export const cardTitle = document.getElementById('name');
export const cardLink = document.getElementById('link');
export const popup = document.querySelector('.popup');
export const popups = Array.from(document.querySelectorAll('.popup'));
export const popupEdit = document.querySelector('.popup_profile');
export const popupAddCard = document.querySelector('.popup_add-card');
export const editButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const elements = document.querySelector('.elements');
export const placeTemplate = document.querySelector('#places').content;
export const viewer = document.querySelector('.popup_viewer');
export const submitButton = document.querySelector('.popup__save');
export const likeButton = document.querySelector('.element__like');

export const initialCards = [{
        likes: [],
        name: 'Архангай',
        link: 'https://images.unsplash.com/photo-1589654888866-4b717275499f',
        alt: 'Архангай'
    },
    {
        likes: [],
        name: 'Баянхонгор',
        link: 'https://images.unsplash.com/photo-1547371131-4f509bd884c1',
        alt: 'Баянхонгор'
    },
    {
        likes: [],
        name: 'Арвайхээр',
        link: 'https://images.unsplash.com/photo-1595692732588-2e8a32b77911',
        alt: 'Арвайхээр'
    },
    {
        likes: [],
        name: 'Хэнтэй',
        link: 'https://images.unsplash.com/photo-1589654615616-6756a5653100',
        alt: 'Хэнтэй'
    },
    {
        likes: [1, 3, 4],
        name: 'Хубсугул',
        link: 'https://images.unsplash.com/photo-1589655145047-5abb2abff076',
        alt: 'Хубсугул'
    },
    {
        likes: [],
        name: 'Ховд',
        link: 'https://images.unsplash.com/photo-1536395155544-a3ba483e0b9b',
        alt: 'Ховд'
    }
];

export const settings = {

    fieldSelector: '.popup__field',
    buttonSelector: '.popup__save',
    errorClass: 'popup__field_error',
    activeClass: 'popup__save',
    inactiveClass: 'popup__save_inactive'

};