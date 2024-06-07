// Feature: abrir popup
// Quando? Ao clicar no button "Editar"
// event: click;

let buttonSellerEdit = document.querySelector(".seller__edit");
let popup = document.querySelector(".popup_edit_profile");
buttonSellerEdit.addEventListener("click", function () {
  popup.classList.add("popup_opened");
});

function closePopup() {
  popup.classList.remove("popup_opened");
}
let buttonClose = document.querySelector(".popup__close-button");
buttonClose.addEventListener("click", closePopup);
