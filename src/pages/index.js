import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import UserInfo from "../components/UserInfo.js";

import { initialCards } from "../utils/constants.js";

import "./index.css";

import { validationVariables } from "../utils/constants.js";

import PopupWithButton from "../components/PopupWithButton.js";

import API from "../components/API.js";

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
const deleteCardButton = document.querySelector(".card__delete-button");
const profileImageCover = document.querySelector(".profile__image-modal");
const profileImageForm = document.querySelector(
  "#update-profile-image-modal-form"
);

editProfileButton.addEventListener("click", function () {
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.job;
  newProfileModal.open();
});

const profileFormElement = document.querySelector(".modal__form");

function handleProfileFormSubmit({ name, discriptor }) {
  newProfileModal.handleLoad(true, "Saving...");
  api
    .updateUserInfo(name, discriptor)
    .then((data) => {
      console.log(data);
      userInfo.setUserInfo({ name: name, about: discriptor });
      newProfileModal.close();
      profileFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newProfileModal.handleLoad(false);
    });
}

function handleYesButtonClick() {
  newDeleteModal.close();
}

function handleDeleteIconClick(card) {
  newDeleteModal.open();
  newDeleteModal.setSubmitAction(() => {
    api
      .deleteCard(card.id)
      .then(() => {
        card.handleDeleteCard();
        newDeleteModal.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteIconClick,
    handleLikeButtonClick
  );
  const cardElement = card.getCard(cardData);
  return cardElement;
}

function handleLikeButtonClick(card) {
  if (card.checkLike()) {
    api
      .removeLike(card.id)
      .then((res) => {
        card.isLiked = res.isLiked;
        card.handleLikeButton(card.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(card.id)
      .then((res) => {
        card.isLiked = res.isLiked;
        card.handleLikeButton(card.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

addCardButton.addEventListener("click", function () {
  newCardCreatorModal.open();
});

profileImageCover.addEventListener("click", function () {
  newProfileImageModal.open();
});

function handleAddFormSubmit(data) {
  newCardCreatorModal.handleLoad(true, "Saving...");
  api
    .addCard({ name: data.title, link: data.link })
    .then((data) => {
      const cardElement = createCard(data);
      cardListCreator.setItem(cardElement);
      addCardFormElement.reset();
      newCardCreatorModal.close();
      cardFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardCreatorModal.handleLoad(false);
    });
}

function handleProfileImageFormSubmit(data) {
  newProfileImageModal.handleLoad(true, "Saving...");
  api
    .updateProfilePicture(data.image)
    .then(() => {
      userInfo.setProfileImage(data.image);
      newProfileImageModal.close();
      profileImageForm.reset();
      profileImageFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newProfileImageModal.handleLoad(false);
    });
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

const profileImageFormValidator = new FormValidator(
  validationVariables,
  profileImageForm
);
profileImageFormValidator.enableValidation();

const cardListCreator = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardListCreator.setItem(cardElement);
    },
  },
  cardListEl
);

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

const newProfileImageModal = new PopupWithForm(
  "#update-profile-image-modal",
  handleProfileImageFormSubmit
);
newProfileImageModal.setEventListeners();

const userInfo = new UserInfo({
  job: ".profile__discriptor",
  name: ".profile__name",
  profileImage: ".profile__image",
});

const newDeleteModal = new PopupWithButton(
  "#delete-card-modal",
  handleYesButtonClick
);
newDeleteModal.setEventListeners();

const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "407bded7-957f-4e30-ba1d-3d3bf66c7e41",
    "Content-Type": "application/json",
  },
});

//user Api

api
  .getUserInfo()
  .then((data) => {
    console.log(data);
    userInfo.setUserInfo(data);
    userInfo.setProfileImage(data.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((data) => {
    console.log(data);
    cardListCreator.renderItems(data);
  })
  .catch((err) => {
    console.error(err);
  });
