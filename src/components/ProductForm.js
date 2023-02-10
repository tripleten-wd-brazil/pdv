import Product from "./Product.js";
import Alert from "./Alert.js";

export default class ProductForm {
  constructor(formName, order) {
    this._order = order;
    this._form = document.forms[formName];
    this._setEventListeners();
    this._enableValidation();
  }

  _toggleModal() {
    const productModal = document.querySelector(".modal_create-product");
    productModal.classList.toggle("modal_opened");
    Array.from(this._form.elements).forEach((input) => {
      input.classList.remove("form__input_invalid");
    });
    this._form.elements.button_submit.disabled = true;
    this._form.elements.image.focus();
  }

  _setEventListeners() {
    const buttonOpenModal = document.querySelector("#open-product-modal");
    buttonOpenModal.addEventListener("click", this._toggleModal.bind(this));

    const buttonCloseModal = document.querySelector("#close-product-modal");
    buttonCloseModal.addEventListener("click", this._toggleModal.bind(this));

    this._form.addEventListener("submit", this._saveProduct.bind(this));
  }

  _saveProduct(evt) {
    evt.preventDefault();
    if (!this._form.checkValidity()) {
      this._form.elements.button_submit.disabled = true;
      return;
    }

    const { name, price, category, image } = this._form.elements;
    const data = {
      name: name.value,
      image: image.value,
      price: price.value,
      category: category.value,
    };
    const product = new Product(data);

    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(data);
    localStorage.setItem("products", JSON.stringify(products));

    product.createCard(this._order);
    this._toggleModal();
    this._form.reset();
    Alert.showProductAlert({ productName: data.name, type: "add" });
  }

  _enableValidation() {
    const inputs = this._form.querySelectorAll(".form__input");

    inputs.forEach((input) => {
      input.addEventListener("input", this._validateInputState.bind(this));
      input.addEventListener("blur", this._validateInputState.bind(this));
    });
  }

  _validateInputState(event) {
    const input = event.target;
    const isInvalidInput = !input.checkValidity();
    if (isInvalidInput) {
      this._form.elements.button_submit.disabled = true;
      input.classList.add("form__input_invalid");
      return;
    }

    input.classList.remove("form__input_invalid");
    const isValidForm = this._form.checkValidity();
    if (isValidForm) {
      this._form.elements.button_submit.disabled = false;
    }
  }
}
