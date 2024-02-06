const editProfileButton = document.querySelector(".seller__edit");
const editProfilePopup = document.querySelector(".popup_edit_profile");

editProfileButton.addEventListener("click", () => {
  editProfilePopup.classList.add("popup_opened");
});

const editProfileCloseButton = editProfilePopup.querySelector(
  ".popup__close-button",
);
editProfileCloseButton.addEventListener("click", () => {
  editProfilePopup.classList.remove("popup_opened");
});

const formEditProfile = editProfilePopup.querySelector(".form");
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = formEditProfile.querySelector(".form__input_name").value;
  const about = formEditProfile.querySelector(".form__input_job").value;
  const nameProfile = document.querySelector(".seller__name");
  const jobProfile = document.querySelector(".seller__job");
  nameProfile.textContent = name;
  jobProfile.textContent = about;
  editProfilePopup.classList.remove("popup_opened");
});
