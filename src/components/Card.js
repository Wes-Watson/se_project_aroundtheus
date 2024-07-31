export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteIconClick,
    handleLikeButtonClick
  ) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this.id = _id;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._isLiked = isLiked;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick(this);
    });
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteIconClick(this);
      });
  }

  handleLikeButton(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  checkLike() {
    return this._isLiked;
  }

  handleDeleteCard() {
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
