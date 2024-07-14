export default class Popup {
  constructor({ popupSelector }) {
    this._selector = document.querySelector(popupSelector);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._selector.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._selector.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  setEventListeners() {
    this._button = this._selector.querySelector(".modal__close");
    this._selector.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal_open") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
    this._button.addEventListener("click", () => this.close());
  }
}
