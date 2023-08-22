// Pegar o botão no HTML
const buttonAddProduct = document.querySelector(".button_add_product");
// Ao clicar no botão de adicionar item

const closePopupWithEsc = function(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

// função de callback
const popupFormProduct = document.querySelector(".popup_form_product");
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", function(event) {
    if (event.target.classList.contains("popup")) {
      closePopup();
    }
  });
  document.addEventListener("keydown", closePopupWithEsc);
}
// Abre o popup
buttonAddProduct.addEventListener("click", function() {
  openPopup(popupFormProduct);
});

export function closePopup() {
  document.removeEventListener("keydown", closePopupWithEsc)
  const popups = document.querySelectorAll(".popup");
  popups.forEach(function(popup) {
    popup.classList.remove("popup_opened");
  });
}
const buttonsClosePopup = document.querySelectorAll(".popup__close-button");
buttonsClosePopup.forEach(function(buttonClosePopup) {
  buttonClosePopup.addEventListener("click", function() {
    closePopup();
  });
});

const popupImage = document.querySelector(".popup_image");
export function handleImageClick(event) {
  const popupImageElement = document.querySelector(".popup__image");
  popupImageElement.src = event.target.src;
  popupImageElement.alt = event.target.alt;
  openPopup(popupImage);
}
