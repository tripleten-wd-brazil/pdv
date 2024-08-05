import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super(".popup_image");
    this.setEventListeners();
  }

  open(product) {
    const image = this._popup.querySelector(".popup__image");
    image.src = product.image;
    image.alt = product.name;
    super.open();
  }
}
