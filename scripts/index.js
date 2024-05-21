const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const closeButton = document.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__discriptor");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-descriptor-input"
);
const editProfileModal = document.querySelector("#edit-modal");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addCardModal = document.querySelector("#add-card-modal");
const addButton = document.querySelector(".profile__add-button");
const closeCardModalButton = document.querySelector("#card-modal-close");
const addCardFormElement = document.querySelector("#add-card-modal-form");
const newCardLink = addCardFormElement.querySelector("#card-link-input");
const newCardName = addCardFormElement.querySelector("#card-title-input");

function closeModal() {
  editProfileModal.classList.remove("modal_open");
}

function closeCardModal() {
  addCardModal.classList.remove("modal_open");
}

closeCardModalButton.addEventListener("click", closeCardModal);

closeButton.addEventListener("click", closeModal);

const editButton = document.querySelector(".profile__edit-button");

editButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  editProfileModal.classList.add("modal_open");
});

const profileFormElement = document.querySelector(".modal__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTextEl = cardElement.querySelector(".card__text");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardTextEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

addButton.addEventListener("click", function () {
  addCardModal.classList.add("modal_open");
});

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = newCardName.value;
  const link = newCardLink.value;
  const cardElement = getCardElement({ name, link });
  cardListEl.prepend(cardElement);
  closeCardModal();
}

addCardFormElement.addEventListener("submit", handleAddFormSubmit);
