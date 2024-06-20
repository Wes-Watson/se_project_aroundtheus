export default class FormValidator {
  constructor({ formClass, formSelector }, form) {
    this._formClass = formClass;
    this._formSelector = formSelector;
    this._form = form;
  }

  enableValidation() {}
}
