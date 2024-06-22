export default class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    form
  ) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
  }

  _toggleButtonState() {
    if (this._inputIsInvalid(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _showInputError(input) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._errorClass);
  }
  _hideInputError(input) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._errorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _inputIsInvalid(inputList) {
    return !inputList.every((input) => input.validity.valid);
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(input);
        this._toggleButtonState(this._submitButton);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._disableButton();
    });
    this._setEventListeners();
  }
}
