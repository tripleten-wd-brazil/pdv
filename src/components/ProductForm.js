import Product from "./Product.js";
import Alert from "./Alert.js";
import Modal from "./Modal.js";

export default class ProductForm extends Modal {
  constructor(formName, order) {
    super(".modal_create-product", formName);
    this._order = order;
    this._enableValidation();
  }

  close() {
    Array.from(this._form.elements).forEach((input) => {
      input.classList.remove("form__input_invalid");
    });
    this._form.elements.button_submit.disabled = true;
    this._form.reset();
    super.close();
  }

  open() {
    super.open();
    this._form.elements.image.focus();
  }

  setEventListeners(formName) {
    this._form = document.forms[formName];
    super.setEventListeners();
    const buttonCloseModal = document.querySelector("#close-product-modal");
    buttonCloseModal.addEventListener("click", this.close.bind(this));

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
    this.close();
    this._form.reset();
    Alert.showProductAlert({ productName: data.name, type: "add" });
  }

  _enableValidation() {
    const inputs = this._form.querySelectorAll(".modal__input");

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
