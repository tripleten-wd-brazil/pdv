import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super(".popup_image");
    this.setEventListeners();
  }

  open(imageUrl, imageName) {
    const popupImageElement = document.querySelector(".popup__image");
    popupImageElement.src = imageUrl;
    popupImageElement.alt = imageName;
    super.open();
  }
}

