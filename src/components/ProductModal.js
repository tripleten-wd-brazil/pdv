import Modal from "./Modal.js";
import Card from "./Card.js";
import ProductApi from "../api/ProductApi.js";

export default class ProductModal extends Modal {
  constructor(addOrderFunction) {
    super(".modal_add_item");
    this._buttonClose = document.querySelector(".button_close_modal");
    this._form = document.forms.form_add_item;
    this._addOrderFunction = addOrderFunction;
    this._productApi = new ProductApi();
    this._setEventListeners();
  }

  _setEventListeners() {
    this._buttonClose.addEventListener("click", this.close.bind(this));
    this._form.addEventListener("submit", (evt) => this._save(evt));
  }

  async _save(evt) {
    evt.preventDefault();
    if (!this._form.checkValidity()) {
      return;
    }

    // Object destructuring
    const { image, name, price, category } = this._form.elements;
    const productData = {
      name: name.value,
      price: price.value,
      category: category.value,
    };

    const savedProduct = await this._productApi.create(productData);
    const { _id: id } = savedProduct;
    const card = new Card({ ...productData, image: image.value, id });

    const productList = document.querySelector(".products");
    productList.append(card.getTemplate(this._addOrderFunction));
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
