export class FormValidator {
    constructor(params, form) {
        this._params = params;
        this._formElement = form;
    };

    _ex() { console.log('some function') };

    _showInputError(formElement, inputElement, errorMessage, params) {
        const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(params.errorClass);
    };

    _hideInputError = (formElement, inputElement, params) => {
        const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
        errorElement.classList.remove(params.errorClass);
        errorElement.textContent = '';
    };
    _checkInputValidity(formElement, inputElement, params) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, params);
        } else {
            this._hideInputError(formElement, inputElement, params);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    _disableButton(buttonElement, params) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(params.inactiveClass);
        buttonElement.classList.remove(params.activeClass);
    }

    _toggleButtonState(inputList, buttonElement, params) {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            // сделай кнопку неактивной
            this._disableButton(buttonElement, this._params);
        } else {
            // иначе сделай кнопку активной
            buttonElement.classList.add(this._params.activeClass);
            buttonElement.classList.remove(this._params.inactiveClass);
            buttonElement.removeAttribute('disabled');
        }
    };
    _setEventListeners(formElement, params) {
        const inputList = Array.from(formElement.querySelectorAll(params.fieldSelector));
        const buttonElement = formElement.querySelector(params.buttonSelector);

        formElement.addEventListener('submit', (evt) => {
            this._disableButton(buttonElement, params);
            evt.preventDefault();
        });
        this._toggleButtonState(inputList, buttonElement, params);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, params);
                this._toggleButtonState(inputList, buttonElement, this._params);
            });
        });
    };

    enableValidation() {
        this._setEventListeners(this._formElement, this._params);
    };

}