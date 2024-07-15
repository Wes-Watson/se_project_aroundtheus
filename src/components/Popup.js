export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popup.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popup.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal_open") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
