import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super(".popup_product-image");
    this.setEventListeners();
  }

  open(src, alt) {
    const popupImageElement = document.querySelector(".popup__image");
    popupImageElement.src = src;
    popupImageElement.alt = alt;
    super.open();
  }
}
