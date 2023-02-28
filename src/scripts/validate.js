// objeto como parâmetro
function enableValidation(config) {
  const form = document.forms[config.formName];
  const inputs = document.querySelectorAll(config.inputSelector);
  // form
  // inputs
  // button de disabled
  // classe de erro

  inputs.forEach((input) => {
    input.addEventListener("input", (evt) => {
      validateInput(evt, form, config);
    });
    input.addEventListener("blur", validateInput);
  });
}

function validateInput(evt, form, config) {
  if (!evt.target.checkValidity()) {
    form.elements[config.submitButton].disabled = true;
    evt.target.classList.add(config.errorClass);
    return;
  }

  evt.target.classList.remove(config.errorClass);
  if (form.checkValidity()) {
    form.elements[config.submitButton].disabled = false;
  }
}
