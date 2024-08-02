import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputs = this._popup.querySelectorAll(".modal__input");
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    this._form = this._popup.querySelector(".modal__form");
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  handleLoad(isLoading, loadingText) {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      console.log("loading");
      console.log(this._submitButton);
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}

export default PopupWithForm;
