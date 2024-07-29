export function openImagePopup(product) {
  const popupImage = document.querySelector(".popup_image");
  const image = popupImage.querySelector(".popup__image");
  image.src = product.image;
  image.alt = product.name;
  popupImage.classList.add("popup_opened");
}
