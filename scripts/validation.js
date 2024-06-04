// enabling validation by calling enableValidation()
// pass all the settings on call

function toggleButtonState(inputs, submitButton, options) {
  let invalid = false;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      invalid = true;
    }
  });

  if (invalid) {
    submitButton.classList.add(options.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function showInputError(form, input, options) {
  const errorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.add(options.inputErrorClass);
  errorMessage.textContent = input.validationMessage;
}

function hideInputError(form, input, options) {
  const errorMessage = form.querySelector(`#${input.id}-error`);
  input.classList.remove(options.inputErrorClass);
  errorMessage.textContent = "";
}

function checkInputValidity(form, input, options) {
  if (!input.validity.valid) {
    showInputError(form, input, options);
  } else {
    hideInputError(form, input, options);
  }
}

function setEventListeners(form, options) {
  const inputs = Array.from(form.querySelectorAll(options.inputSelector));
  const submitButton = form.querySelector(".modal__button");
  inputs.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(form, input, options);
      toggleButtonState(inputs, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, options);
  });
}

const validationVariables = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(validationVariables);
