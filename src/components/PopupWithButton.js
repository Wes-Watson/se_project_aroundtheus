import Popup from "../components/Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  setSubmitAction(action) {
    this.handleYesButtonClick = action;
  }

  setEventListeners() {
    this._button = this._popup.querySelector(".modal__button");
    this._button.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.handleYesButtonClick();
    });

    super.setEventListeners();
  }
}
