const viewer = document.querySelector('.popup_viewer');
const source = document.querySelector('.popup__large-image');
const imgTitle = document.querySelector('.popup__image-title');


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
        //open zoom

        this._element.querySelector('.element__photo').addEventListener('click', function() {

            imgTitle.textContent = this.alt;
            source.alt = this.alt;
            source.src = this.src;
            viewer.classList.add('popup_visible')

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
        this._element.querySelector('.element__photo').src = this._link
        this._element.querySelector('.element__photo').alt = this._name
        this._element.querySelector('.element__photo-title').textContent = this._name;

        this._setEventListeners();
        return this._element;
    }
}