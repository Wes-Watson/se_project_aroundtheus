import Card from "../src/components/Card.js";

import FormValidator from "../src/components/FormValidator.js";

import Section from "../src/utils/Section.js";

import PopupWithForm from "../src/components/PopupWithForm.js";

import PopupWithImage from "../src/components/PopupWithImage.js";

import UserInfo from "../src/components/UserInfo.js";

import { initialCards } from "../src/utils/constants.js";

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

function handleProfileFormSubmit() {
  userInfo.setUserInfo({
    name: profileNameInput.value,
    job: profileDescriptionInput.value,
  });
  newProfileModal.close();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getCard(cardData);
  return cardElement;
}

addCardButton.addEventListener("click", function () {
  newCardCreatorModal.open();
});

function handleAddFormSubmit(evt) {
  const name = newCardName.value;
  const link = newCardLink.value;
  const cardElement = createCard({ name, link });
  cardListEl.prepend(cardElement);
  addCardFormElement.reset();
  newCardCreatorModal.close();
}

function handleImageClick(card) {
  newImageModal.open(card);
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
