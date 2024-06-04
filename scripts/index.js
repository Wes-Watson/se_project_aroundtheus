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

const profileCloseButton = document.querySelector("#profile-modal-close");
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
const addCardButton = document.querySelector(".profile__add-button");
const closeCardModalButton = document.querySelector("#card-modal-close");
const addCardFormElement = document.querySelector("#add-card-modal-form");
const newCardLink = addCardFormElement.querySelector("#card-link-input");
const newCardName = addCardFormElement.querySelector("#card-title-input");
const imagePreviewModal = document.querySelector("#image-preview-modal");
const closeButtons = document.querySelectorAll(".modal__close");
const cardOverlay = "#add-card-modal";
const imageOverlay = "#image-preview-modal";
const overlays = document.querySelectorAll(".modal");

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  });
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  });
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

const editProfileButton = document.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(editProfileModal);
});

const profileFormElement = document.querySelector(".modal__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTextEl = cardElement.querySelector(".card__text");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeCardButton = cardElement.querySelector(".card__like-button");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", () => {
    openModal(imagePreviewModal);
    const imagePreview = document.querySelector(".modal__card-image");
    imagePreview.src = cardImageEl.src;
    imagePreview.alt = cardImageEl.alt;
    const imagePreviewDescription = document.querySelector(
      ".modal__image-description"
    );
    imagePreviewDescription.textContent = cardData.name;
  });

  deleteCardButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeCardButton.addEventListener("click", () => {
    likeCardButton.classList.toggle("card__like-button_active");
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

addCardButton.addEventListener("click", function () {
  openModal(addCardModal);
});

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = newCardName.value;
  const link = newCardLink.value;
  const cardElement = getCardElement({ name, link });
  cardListEl.prepend(cardElement);
  closeModal(addCardModal);
  evt.target.reset();
}

addCardFormElement.addEventListener("submit", handleAddFormSubmit);

overlays.forEach((overlay) => {
  overlay.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("modal")) {
      closeModal(overlay);
    }
  });
});
