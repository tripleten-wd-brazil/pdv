import { openImagePopup } from "./utils.js";

export default class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._price = cardData.price;
    this._image = cardData.image;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const productTemplate = document.querySelector(this._templateSelector);
    return productTemplate.content.cloneNode(true);
  }

  _setEventListeners() {
    const productImage = this._element.querySelector(".product__image");
    productImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _remove() {}

  _handleImageClick() {
    openImagePopup({ name: this._name, image: this._image });
  }

  generate() {
    this._element = this._getTemplate();

    // Pegar os sub elementos da cópia
    const productImage = this._element.querySelector(".product__image");
    const productName = this._element.querySelector(".product__name");
    const productPrice = this._element.querySelector(".product__price");

    // Popular a cópia com os dados do produto;
    productImage.src = this._image;
    productImage.alt = this._name;
    productName.textContent = this._name;
    productPrice.textContent = this._price;
    this._setEventListeners();

    return this._element;
  }
}

