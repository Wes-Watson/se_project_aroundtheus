export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popupSelector.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popupSelector.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  setEventListeners() {
    this._button = this._popupSelector.querySelector(".modal__close");
    this._popupSelector.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal_open") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
