export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._data = data;
        this._name = this._data.name;
        this._link = this._data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;

        this._likes = data.likes.length;

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

        this._element.querySelector('.element__photo').addEventListener('click',
            (evt) => this._previewCard(evt));
    }

    _previewCard() {
        this._handleCardClick(this._data);
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
        this._element.querySelector('.element__like-number').textContent = this._likes;
        this._setEventListeners();
        return this._element;
    }
}