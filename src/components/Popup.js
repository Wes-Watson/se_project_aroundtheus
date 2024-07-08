export default class Popup {
  constructor({ popupSelector }) {
    this._selector = popupSelector;
    this._button = popupSelector.quereySelector(".modal_close");
    this._overlay = popupSelector.quereySelector("modal");
  }
  open() {
    this._element.classList.add("modal_open");
  }

  close() {
    this._element.classList.remove("modal_open");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._button.addEventListener("click", () => this.close());
    this._overlay.addEventListener("click", () => this.close());
    this._element.addEventListener("keydown", this._handleEscapeClose());
  }
}
