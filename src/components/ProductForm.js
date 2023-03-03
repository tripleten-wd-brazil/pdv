import Product from "./Product.js";
import Alert from "./Alert.js";
import Modal from "./Modal.js";

export default class ProductForm extends Modal {
  constructor(formName, { order, api }) {
    super(".modal_create-product", formName);
    this._order = order;
    this._api = api;
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

    this._api
      .create(data)
      .then(() => {
        const product = new Product(data);
        product.createCard(this._order);

        this._form.reset();
        Alert.showProductAlert({ productName: data.name, type: "add" });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.close();
      });
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
