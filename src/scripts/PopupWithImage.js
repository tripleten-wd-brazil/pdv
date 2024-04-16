import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(image, name) {
    // pegar os elementos do popup pra setar valores
    const imageElement = this._popup.querySelector(".popup__image");
    const nameElement = this._popup.querySelector(".popup__product-name");
    // setar a imagem e o nome da imagem no popup
    imageElement.src = image;
    imageElement.alt = name;
    nameElement.textContent = name;
    super.open();
  }
}
