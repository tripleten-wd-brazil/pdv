function enableValidation(config) {
  const inputs = document.querySelectorAll(config.inputSelector);
  inputs.forEach(function(input) {
    input.addEventListener("input", function(event) {
      const inputElement = event.target;
      const errorElement = inputElement.closest(".form__input-container").querySelector(config.errorSelector);
      if (inputElement.validity.valid) {
        hideInputError(errorElement);
      } else {
        showInputError(errorElement, inputElement.validationMessage);
      }
    });
  })

}

function hideInputError(errorElement) {
  errorElement.classList.remove("form__error_active")
}

function showInputError(errorElement, message) {
  errorElement.classList.add("form__error_active")
  errorElement.textContent = message;
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".form__input",
  errorSelector: ".form__error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}
enableValidation(config);
