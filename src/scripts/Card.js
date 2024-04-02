export class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._price = cardData.price;
    this._image = cardData.image;
    this._templateSelector = templateSelector;
  }

  _setEventListeners(element) {}

  _getTemplate() {
    const productTemplate = document.querySelector(this._templateSelector);
    return productTemplate.content.cloneNode(true);
  }

  generateCard() {
    const productElement = this._getTemplate();
    const productImage = productElement.querySelector(".product__image");
    productImage.src = this._image;
    productImage.alt = this._name;

    const productName = productElement.querySelector(".product__name");
    productName.textContent = this._name;

    const productPrice = productElement.querySelector(".product__price");
    productPrice.textContent = this._price;
    this._setEventListeners(productElement);
    return productElement;
  }
}
