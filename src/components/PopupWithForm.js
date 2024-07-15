import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputs = this._popupSelector.querySelectorAll(".modal__input");
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    this._form = this._popupSelector.querySelector(".modal__form");
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      evt.target.reset();
    });

    super.setEventListeners();
  }
}

export default PopupWithForm;
