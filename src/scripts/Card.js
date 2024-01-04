export default class Card {
  constructor({ name, price, image }, templateSelector, handleCardClick) {
    this._name = name;
    this._price = price;
    this._image = image;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const templateProduct = document.querySelector(this._templateSelector);
    return templateProduct.content.cloneNode(true);
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", () =>
      this._handleCardClick(this._image, this._name),
    );
  }

  generate() {
    this._productElement = this._getElement();

    const nameElement = this._productElement.querySelector(".product__name");
    nameElement.textContent = this._name;

    const priceElement = this._productElement.querySelector(".product__price");
    priceElement.textContent = this._price;

    this._imageElement = this._productElement.querySelector(".product__image");
    this._imageElement.src = this._image;
    this._imageElement.alt = this._name;
    this._setEventListeners();

    return this._productElement;
  }
}
