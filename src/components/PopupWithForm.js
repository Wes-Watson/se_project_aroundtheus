import Popup from "../components/Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    this._handleFormSubmit = handleFormSubmit;
    super({popupSelector});
    this._inputs = this._selector.quereySelectorAll(".modal_input");
  }

  _getInputValues() {
    const formData = {};
    this._inputs.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }
}
