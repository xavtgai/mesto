const showInputError = (formElement, inputElement, errorMessage, params) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorClass);
};

const hideInputError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, params) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, params);
    } else {
        hideInputError(formElement, inputElement, params);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const disableButton = (buttonElement, params) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(params.inactiveClass);
    buttonElement.classList.remove(params.activeClass);
}

const toggleButtonState = (inputList, buttonElement, params) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        disableButton(buttonElement, params);
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.add(params.activeClass);
        buttonElement.classList.remove(params.inactiveClass);
        buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.fieldSelector));
    const buttonElement = formElement.querySelector(params.buttonSelector);
    formElement.addEventListener('submit', function(evt) {
        disableButton(buttonElement, params);
        evt.preventDefault();
    });
    toggleButtonState(inputList, buttonElement, params);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, params);
            toggleButtonState(inputList, buttonElement, params);
        });
    });
};

const enableValidation = (params) => {
    const formList = Array.from(document.forms);
    formList.forEach((formElement) => {
        setEventListeners(formElement, params);
    });
};

enableValidation({

    fieldSelector: '.popup__field',
    buttonSelector: '.popup__save',
    errorClass: 'popup__field_error',
    activeClass: 'popup__save',
    inactiveClass: 'popup__save_inactive'

});