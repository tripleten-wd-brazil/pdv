function enableValidation() {
  const popupEditProfile = document.querySelector(".popup_edit_profile");
  // pegar os inputs;
  const inputs = popupEditProfile.querySelectorAll(".form__input");

  // addEventListener change dos inputs
  inputs.forEach((input) => {
    input.addEventListener("input", (evt) => {
      const currentInput = evt.target;
      const isValid = currentInput.checkValidity();
      if (!isValid) {
        // pegar o form button
        const buttonSubmit = popupEditProfile.querySelector(".button_submit");
        // disable form button
        buttonSubmit.disabled = true;
      }
    });
  });
}

