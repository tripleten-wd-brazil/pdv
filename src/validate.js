function enableSubmitButton(form, buttonSubmit) {
  const isFormValid = form.checkValidity();
  if (isFormValid) {
    buttonSubmit.disabled = false;
  }
}

function validateInput(input, config, formElement) {
  // verificar se o input é válido
  const formButton = formElement.querySelector(config.submitButtonSelector);
  const isValid = input.checkValidity();
  const errorElement = input.nextElementSibling;
  if (isValid) {
    // se for válido, esconder mensagem de erro
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    // se for inválido, mostrar mensagem de erro
    const errorMessage = input.validationMessage;
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);

    // desabilitar button do form
    formButton.disabled = true;
  }

  // se todos os inputs forem válidos, habilitar o button do form;
  enableSubmitButton(formElement, formButton);
}

// enableValidation
function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputs = formElement.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", () =>
      validateInput(input, config, formElement)
    );
  });
}

enableValidation({
  formSelector: ".form_edit_profile",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_active",
});
