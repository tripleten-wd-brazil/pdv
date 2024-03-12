function setEventListeners(input, formElement, config) {
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
    validateSubmitButton(formElement, config);
  });
}

function validateSubmitButton(formElement, config) {
  const submitButtonElement = formElement.querySelector(
    config.submitButtonSelector,
  );
  const isFormValid = formElement.checkValidity();
  if (isFormValid) {
    submitButtonElement.removeAttribute("disabled");
  } else {
    submitButtonElement.setAttribute("disabled", "disabled");
  }
}

function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputs = formElement.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => setEventListeners(input, formElement, config));
}

enableValidation({
  formSelector: ".form_edit_seller",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  errorSelector: ".form__error",
});
