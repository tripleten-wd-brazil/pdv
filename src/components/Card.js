export default class Card {
  constructor({ name, price, category, image, id }) {
    this._name = name;
    this._price = price;
    this._category = category;
    this._image = image;
    this._id = id;
  }

  getTemplate(addOrderFunction) {
    const card = document
      .querySelector("#product-card")
      .content.cloneNode(true);

    const cardImage = card.querySelector(".product__image");
    const cardName = card.querySelector(".product__name");
    const cardPrice = card.querySelector(".product__price");
    const cardCategory = card.querySelector(".product__category");
    const cardButton = card.querySelector(".product__button");
    cardButton.addEventListener("click", addOrderFunction);

    cardImage.src = this._image;
    cardImage.alt = this._name;

    cardName.textContent = this._name;
    cardPrice.textContent = this._price;
    cardCategory.textContent = this._category;

    return card;
  }

  _setEventListeners() {}
}
