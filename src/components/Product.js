import { numberToCurrency } from "./Currency.js";
export default class Product {
  constructor(productData) {
    this._name = productData.name;
    this._price = productData.price;
    this._image = productData.image;
    this._category = productData.category;
  }

  createCard(order) {
    const productCard = document
      .querySelector("#product-card")
      .content.cloneNode(true);

    const nameElement = productCard.querySelector(".product__name");
    const priceElement = productCard.querySelector(".product__price");
    const imageElement = productCard.querySelector(".product__image");
    const categoryElement = productCard.querySelector(".product__category");
    const buttonElement = productCard.querySelector(".product__button");

    nameElement.textContent = this._name;
    priceElement.textContent = numberToCurrency(this._price);

    imageElement.src = this._image;
    imageElement.alt = this._name;

    categoryElement.textContent = this._category;
    buttonElement.addEventListener("click", order.addProduct.bind(order));

    const productList = document.querySelector(".products");
    productList.append(productCard);
  }
}
