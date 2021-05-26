import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageSource = document.querySelector('.popup__large-image');
        this._imageTitle = document.querySelector('.popup__image-title');
    }
    open(data) {

        this._imageTitle.textContent = data.card_title;
        this._imageSource.alt = data.card_title;
        this._imageSource.src = data.card_link;
        super.open();
    }
}