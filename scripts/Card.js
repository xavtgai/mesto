import {
    viewer,
    source,
    imgTitle,
    openPopup
} from '../scripts/index.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }
    _setEventListeners() {

        //like
        const placeLike = this._element.querySelector('.element__like');
        placeLike.addEventListener('click', function() {
            placeLike.classList.toggle('element__like_selected');
        });

        //delete
        const deleteButton = this._element.querySelector('.element__delete');
        deleteButton.addEventListener('click', function(evt) {
            evt.target.closest('.element').remove();
        });
        //open viewer
        this._element.querySelector('.element__photo').addEventListener('click', function() {
            imgTitle.textContent = this.alt;
            source.alt = this.alt;
            source.src = this.src;
            openPopup(viewer);
        });

    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        const photo = this._element.querySelector('.element__photo');
        this._element.querySelector('.element__photo-title').textContent = this._name;
        photo.src = this._link
        photo.alt = this._name
        this._setEventListeners();
        return this._element;
    }
}