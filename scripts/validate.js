const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__field_error');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
    errorElement.classList.remove('popup__field_error');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('popup__save_inactive');
        buttonElement.classList.remove('popup__save');
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.add('popup__save');
        buttonElement.classList.remove('popup__save_inactive');
        buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
    const buttonElement = formElement.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.forms);
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

enableValidation();