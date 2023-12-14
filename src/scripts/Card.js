export default class Card {
  constructor({ name, price, image }, templateSelector) {
    this._name = name;
    this._price = price;
    this._image = image;
    this._templateSelector = templateSelector;
  }

  _getElement() {
    const templateProduct = document.querySelector(this._templateSelector);
    return templateProduct.content.cloneNode(true);
  }

  _setEventListeners() {}

  generate() {
    const productElement = this._getElement();

    const nameElement = productElement.querySelector(".product__name");
    nameElement.textContent = this._name;

    const priceElement = productElement.querySelector(".product__price");
    priceElement.textContent = this._price;

    const imageElement = productElement.querySelector(".product__image");
    imageElement.src = this._image;
    imageElement.alt = this._name;
    this._setEventListeners();

    return productElement;
  }
}
