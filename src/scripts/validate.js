function checkInputValidity(input, config) {
  const isInputValid = input.checkValidity();
  const errorElement = input.parentElement.querySelector(config.errorSelector);
  if (isInputValid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
  }
}

function checkFormValidity(formElement, config) {
  const isFormValid = formElement.checkValidity();
  const submitElement = formElement.querySelector(config.submitButtonSelector);
  if (isFormValid) {
    submitElement.disabled = false;
  } else {
    submitElement.disabled = true;
  }
}

function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputList = formElement.querySelectorAll(config.inputSelector);

  inputList.forEach((input) => {
    input.addEventListener("input", (event) => {
      checkInputValidity(event.target, config);
      checkFormValidity(formElement, config);
    });
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
  errorSelector: ".form__error",
});
