// enableValidation
function enableValidation(config) {
  const formElement = document.querySelector(config.formSelector);
  const inputs = formElement.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      // verificar se o input é válido
      const isValid = input.checkValidity();
      if (isValid) {
        // se for válido, esconder mensagem de erro
      } else {
        // se for inválido, mostrar mensagem de erro
        // desabilitar button do form
      }
      // se todos os inputs forem válidos, habilitar o button do form;
    });
  });
}

enableValidation({
  formSelector: ".form_edit_profile",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
