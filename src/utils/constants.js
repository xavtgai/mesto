export const profileForm = document.querySelector('.popup__edit-profile');
export const addCardForm = document.querySelector('.popup__add-card-form');
export const nameInput = document.getElementById('name');
export const jobInput = document.getElementById('job');
export const cardTitle = document.getElementById('card_title');
export const cardLink = document.getElementById('card_link');
export const profileTitle = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
export const popup = document.querySelector('.popup');
export const popups = Array.from(document.querySelectorAll('.popup'));
export const popupEdit = document.querySelector('.popup_profile');
export const popupAddCard = document.querySelector('.popup_add-card');
export const editButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const elements = document.querySelector('.elements');
export const placeTemplate = document.querySelector('#places').content;
export const viewer = document.querySelector('.popup_viewer');
export const source = document.querySelector('.popup__large-image');
export const imgTitle = document.querySelector('.popup__image-title');

export const initialCards = [{
        card_title: 'Архангай',
        card_link: 'https://images.unsplash.com/photo-1589654888866-4b717275499f',
        alt: 'Архангай'
    },
    {
        card_title: 'Баянхонгор',
        card_link: 'https://images.unsplash.com/photo-1547371131-4f509bd884c1',
        alt: 'Баянхонгор'
    },
    {
        card_title: 'Арвайхээр',
        card_link: 'https://images.unsplash.com/photo-1595692732588-2e8a32b77911',
        alt: 'Арвайхээр'
    },
    {
        card_title: 'Хэнтэй',
        card_link: 'https://images.unsplash.com/photo-1589654615616-6756a5653100',
        alt: 'Хэнтэй'
    },
    {
        card_title: 'Хубсугул',
        card_link: 'https://images.unsplash.com/photo-1589655145047-5abb2abff076',
        alt: 'Хубсугул'
    },
    {
        card_title: 'Ховд',
        card_link: 'https://images.unsplash.com/photo-1536395155544-a3ba483e0b9b',
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