import Modal from "./Modal.js";

export default class ProductModal extends Modal {
  constructor() {
    super(".modal_add_item");
    this._buttonClose = document.querySelector(".button_close_modal");
    this._form = document.forms.form_add_item;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._buttonClose.addEventListener("click", this.close.bind(this));
    this._form.addEventListener("submit", (evt) => this._save(evt));
  }

  _save(evt) {
    evt.preventDefault();
    if (!this._form.checkValidity()) {
      return;
    }

    // Object destructuring
    const { image, name, price, category } = this._form.elements;

    const card = document
      .querySelector("#product-card")
      .content.cloneNode(true);

    const cardImage = card.querySelector(".product__image");
    const cardName = card.querySelector(".product__name");
    const cardPrice = card.querySelector(".product__price");
    const cardCategory = card.querySelector(".product__category");

    cardImage.src = image.value;
    cardImage.alt = name.value;

    cardName.textContent = name.value;
    cardPrice.textContent = price.value;
    cardCategory.textContent = category.value;

    const productList = document.querySelector(".products");
    productList.append(card);
    this.close();
    this._reset();
  }

  _reset() {
    this._form.reset();
    this._form.elements.submit.disabled = true;
    const inputs = document.querySelectorAll(".form__control");
    inputs.forEach((input) => input.classList.remove("form__control_invalid"));
  }
}
