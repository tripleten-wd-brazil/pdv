export default class Card {
  constructor({ name, price, category, image }) {
    this._name = name;
    this._price = price;
    this._category = category;
    this._image = image;
  }
}

const card = document.querySelector("#product-card").content.cloneNode(true);

const cardImage = card.querySelector(".product__image");
const cardName = card.querySelector(".product__name");
const cardPrice = card.querySelector(".product__price");
const cardCategory = card.querySelector(".product__category");

cardImage.src = image.value;
cardImage.alt = name.value;

cardName.textContent = name.value;
cardPrice.textContent = price.value;
cardCategory.textContent = category.value;
