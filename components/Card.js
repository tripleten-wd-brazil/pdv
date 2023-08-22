export default class Card {
  constructor(productData, templateSelector, handleImageClick) {
    this._name = productData.name;
    this._imageUrl = productData.imageUrl;
    this._price = productData.price;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const productTemplate = document.querySelector(this._templateSelector);
    return productTemplate.content.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    const nameElement = this._element.querySelector(".product__name");
    const priceElement = this._element.querySelector(".product__price");
    const imageElement = this._element.querySelector(".product__image");

    nameElement.textContent = this._name;
    priceElement.textContent = this._price;
    imageElement.src = this._imageUrl;
    imageElement.alt = this._name;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    const buttonElement = this._element.querySelector(".product__button");
    buttonElement.addEventListener("click", () => this._addProductToOrder());
    const imageElement = this._element.querySelector(".product__image");
    imageElement.addEventListener("click", () => {
      this._handleImageClick(this._imageUrl, this._name);
    });
  }

  _addProductToOrder() {
    const itemTemplate = document.querySelector("#item-template");
    const itemElement = itemTemplate.content.cloneNode(true);

    const itemNameElement = itemElement.querySelector(".item__name");
    const itemPriceElement = itemElement.querySelector(".item__price");
    const itemTotalElement = itemElement.querySelector(".item__total");

    itemNameElement.textContent = this._name;
    itemPriceElement.textContent = this._price;
    itemTotalElement.textContent = this._price;

    const itemList = document.querySelector(".order__list");
    itemList.append(itemElement);
  }
}

