import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageSource = document.querySelector('.popup__large-image');
        this._imageTitle = document.querySelector('.popup__image-title');
    }
    open(data) {

        this._imageTitle.textContent = data.name;
        this._imageSource.alt = data.name;
        this._imageSource.src = data.link;
        super.open();
    }
}