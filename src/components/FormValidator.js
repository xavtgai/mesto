export class FormValidator {
    constructor(params, form) {
        this._params = params;
        this._formElement = form;
        this._inputList = Array.from(form.querySelectorAll(params.fieldSelector));
        this._buttonElement = form.querySelector(params.buttonSelector);
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._params.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
        errorElement.classList.remove(this._params.errorClass);
        errorElement.textContent = '';
    };
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };


    _toggleButtonState() {

        if (this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this._buttonElement.classList.add(this._params.activeClass);
            this._buttonElement.classList.remove(this._params.inactiveClass);
            this._buttonElement.removeAttribute('disabled');
        }
    };
    _setEventListeners() {

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };
    disableButton() {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._params.inactiveClass);
        this._buttonElement.classList.remove(this._params.activeClass);
    }
    enableValidation() {
        this._setEventListeners();
    };

}