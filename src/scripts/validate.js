function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputs = formElement.querySelectorAll(config.inputSelector);
  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      const isValid = input.checkValidity();
      const errorElement = input.parentNode.querySelector(config.errorSelector);
      if (isValid) {
        errorElement.classList.remove(config.errorClass);
        input.classList.remove(config.inputErrorClass);
        errorElement.textContent = "";
      } else {
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
      }
    });
  });
}

enableValidation({
  formSelector: ".form_edit_seller",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  errorSelector: ".form__error",
});
