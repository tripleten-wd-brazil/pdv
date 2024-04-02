export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    const inputs = this._formElement.querySelectorAll(
      this._config.inputSelector,
    );
    inputs.forEach((input) => this._setEventListeners(input));
  }

  _setEventListeners(input) {
    input.addEventListener("input", () => {
      const isValid = input.checkValidity();
      const errorElement = input.parentNode.querySelector(
        this._config.errorSelector,
      );
      if (isValid) {
        errorElement.classList.remove(this._config.errorClass);
        input.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
      } else {
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._config.errorClass);
        input.classList.add(this._config.inputErrorClass);
      }
      this._validateSubmitButton();
    });
  }

  _validateSubmitButton() {
    const submitButtonElement = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
    const isFormValid = this._formElement.checkValidity();
    if (isFormValid) {
      submitButtonElement.removeAttribute("disabled");
    } else {
      submitButtonElement.setAttribute("disabled", "disabled");
    }
  }
}
