import Popup from '../components/Popup.js';
import {
    source,
    imgTitle
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(data) {
        console.log(data);
        imgTitle.textContent = data.alt;
        source.alt = data.alt;
        source.src = data.card_link;
        super.open();
    }
}