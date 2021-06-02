import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageSource = this._popup.querySelector('.popup__large-image');
        this._imageTitle = this._popup.querySelector('.popup__image-title');
    }
    open(data) {

        this._imageTitle.textContent = data.name;
        this._imageSource.alt = data.name;
        this._imageSource.src = data.link;
        super.open();
    }
}