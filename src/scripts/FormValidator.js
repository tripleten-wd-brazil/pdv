export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    const inputList = this._formElement.querySelectorAll(
      this._config.inputSelector,
    );

    this._setEventListeners(inputList);
  }

  _setEventListeners(inputList) {
    inputList.forEach((input) => {
      input.addEventListener("input", (event) => {
        this._checkInputValidity(event.target);
        this._checkFormValidity();
      });
    });
  }

  _checkInputValidity(input) {
    const isInputValid = input.checkValidity();
    const errorElement = input.parentElement.querySelector(
      this._config.errorSelector,
    );
    if (isInputValid) {
      input.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
    } else {
      input.classList.add(this._config.inputErrorClass);
      errorElement.classList.add(this._config.errorClass);
      errorElement.textContent = input.validationMessage;
    }
  }

  _checkFormValidity() {
    const isFormValid = this._formElement.checkValidity();
    const submitElement = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
    if (isFormValid) {
      submitElement.disabled = false;
    } else {
      submitElement.disabled = true;
    }
  }
}
