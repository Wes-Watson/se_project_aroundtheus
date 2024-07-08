import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    //this._image = popupSelector.quereySelector("");
  }

  open({ name, link }) {
    this._element.src = link;
    this._element.alt = name;
    this._element.textContent = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
