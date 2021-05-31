export default class Card {
    constructor(data, cardSelector, handleCardClick, handleDelete, handleLike) {
        this._data = data;
        this._name = this._data.name;
        this._link = this._data.link;
        this._trash_icon = this._data.trash_icon;
        this._isLiked = this._data.isLiked
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._handleLike = handleLike;

        this._likes = data.likes.length;

    }
    _setEventListeners() {

        //delete

        if (this._trash_icon === 1) {
            const deleteButton = this._element.querySelector('.element__delete');
            deleteButton.addEventListener('click', this._handleDelete);
        } else {
            this._element.querySelector('.element__delete').remove();
        };

        // like 
        const placeLike = this._element.querySelector('.element__like');
        placeLike.addEventListener('click', this._handleLike);

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
    toggleLike = () =>
        this._element.querySelector('.element__like').classList.toggle('element__like_selected');

    renewLikes(likesNum) {
        this._element.querySelector('.element__like-number').textContent = likesNum;
    };

    remove = () => this._element.remove();

    generateCard() {
        this._element = this._getTemplate();
        const photo = this._element.querySelector('.element__photo');
        this._element.querySelector('.element__photo-title').textContent = this._name;
        photo.src = this._link
        photo.alt = this._name
        if (this._isLiked) {
            this._element.querySelector('.element__like').classList.add('element__like_selected')
        }
        this._element.querySelector('.element__like-number').textContent = this._likes;
        this._setEventListeners();
        return this._element;
    }
}