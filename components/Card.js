export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active").style;
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._cardElement;
  }

  getCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._element.querySelector(".card__text").textContent = this.name;
    return this._element;
  }
}
