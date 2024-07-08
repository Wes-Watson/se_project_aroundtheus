import Card from "../src/components/Card.js";

import FormValidator from "../src/components/FormValidator.js";

import Section from "../src/utils/Section.js";

//import PopupWithForm from "../src/components/sPopupWithForm.js";

//import PopupWithImage from "../src/components/PopupWithImage.js";

import UserInfo from "../src/components/UserInfo.js";

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
const imagePreview = document.querySelector(".modal__card-image");
const imagePreviewDescription = document.querySelector(
  ".modal__image-description"
);

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", handleEscape);
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleEscape);
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

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getCard(cardData);
  return cardElement;
}

addCardButton.addEventListener("click", function () {
  openModal(addCardModal);
});

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = newCardName.value;
  const link = newCardLink.value;
  const cardElement = createCard({ name, link });
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

function handleEscape(evt) {
  if (evt.key === "Escape") {
    overlays.forEach((modal) => {
      closeModal(modal);
    });
  }
}

function handleImageClick(card) {
  openModal(imagePreviewModal);
  imagePreview.src = card.link;
  imagePreview.alt = card.name;
  imagePreviewDescription.textContent = card.name;
}

const validationVariables = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileForm = document.querySelector("#edit-profile-modal-form");
const addCardForm = document.querySelector("#add-card-modal-form");
const profileFormValidator = new FormValidator(
  validationVariables,
  editProfileForm
);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationVariables, addCardForm);
cardFormValidator.enableValidation();

const cardListCreator = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardListCreator.setItem(cardElement);
    },
  },
  cardListEl
);
cardListCreator.renderItems();
