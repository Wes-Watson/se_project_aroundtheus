import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import UserInfo from "../components/UserInfo.js";

import { initialCards } from "../utils/constants.js";

import "./index.css";

import { validationVariables } from "../utils/constants.js";

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

const editProfileButton = document.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", function () {
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.job;
  newProfileModal.open();
});

const profileFormElement = document.querySelector(".modal__form");

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo({
    name: data.name,
    job: data.discriptor,
  });
  newProfileModal.close();
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getCard(cardData);
  return cardElement;
}

addCardButton.addEventListener("click", function () {
  newCardCreatorModal.open();
});

function handleAddFormSubmit(data) {
  const name = data.title;
  const link = data.link;
  const cardElement = createCard({ name, link });
  cardListCreator.setItem(cardElement);
  addCardFormElement.reset();
  newCardCreatorModal.close();
}

function handleImageClick(card) {
  newImageModal.open(card);
}

const profileFormValidator = new FormValidator(
  validationVariables,
  profileFormElement
);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(
  validationVariables,
  addCardFormElement
);
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

const newImageModal = new PopupWithImage("#image-preview-modal");
newImageModal.setEventListeners();

const newCardCreatorModal = new PopupWithForm(
  "#add-card-modal",
  handleAddFormSubmit
);
newCardCreatorModal.setEventListeners();

const newProfileModal = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);
newProfileModal.setEventListeners();

const userInfo = new UserInfo({
  job: ".profile__discriptor",
  name: ".profile__name",
});
