export default class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._form = document.querySelector(formSelector);
  }

  enableValidation() {
    const inputs = document.querySelectorAll(this._config.inputSelector);
    inputs.forEach(this._setEventListeners.bind(this));
  }

  _setEventListeners(input) {
    input.addEventListener("input", this._validateInput.bind(this));
  }

  _validateInput(event) {
    const inputElement = event.target;
    const errorElement = inputElement.closest(this._config.inputContainerSelector).querySelector(this._config.errorSelector);
    if (inputElement.validity.valid) {
      this._hideInputError(errorElement);
    } else {
      this._showInputError(errorElement, inputElement.validationMessage);
    }
  }

  _hideInputError(errorElement) {
    errorElement.classList.remove(this._config.inputErrorClass)
  }

  _showInputError(errorElement, message) {
    errorElement.classList.add(this._config.inputErrorClass)
    errorElement.textContent = message;
  }
}


