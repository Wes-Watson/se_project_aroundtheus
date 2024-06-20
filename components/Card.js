export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handlelikeButton();
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

  _handlelikeButton() {
    this._likeButton.classList.toggle("card__like-button_active").style;
    console.log(this._likeButton);
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._cardElement;
  }

  _handleImageClick() {
    console.log("sup");
  }

  getCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = `${this._link}`;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__text").textContent = this._name;
    return this._element;
  }
}
