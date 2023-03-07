// objeto como parâmetro
function enableValidation(config) {
  const form = document.forms[config.formName];
  const inputs = document.querySelectorAll(config.inputSelector);

  inputs.forEach((input) => {
    input.addEventListener("input", (evt) => {
      validateInput(evt, form, config);
    });

    input.addEventListener("blur", (evt) => {
      validateInput(evt, form, config);
    });
  });
}

function validateInput(evt, form, config) {
  const errorElement = evt.target.nextElementSibling;
  const errorMessage = getErrorMessage(evt);

  if (!evt.target.checkValidity()) {
    form.elements[config.submitButton].disabled = true;
    errorElement.textContent = errorMessage;
    evt.target.classList.add(config.errorClass);
    return;
  }

  evt.target.classList.remove(config.errorClass);
  if (form.checkValidity()) {
    form.elements[config.submitButton].disabled = false;
  }
}

function getErrorMessage(evt) {
  if (evt.target.validity.valueMissing) {
    return "Campo obrigatório";
  }

  return "Valor inválido.";
}
