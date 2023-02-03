import Product from "./Product.js";

export default class ProductForm {
  constructor() {
    this._form = document.forms["form-product"];
    this._setEventListeners();
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
    buttonOpenModal.addEventListener("click", () => this._toggleModal());

    const buttonCloseModal = document.querySelector("#close-product-modal");
    buttonCloseModal.addEventListener("click", () => this._toggleModal());
  }
}

const productForm = document.forms["form-product"];

productForm.addEventListener("submit", saveProduct);
function saveProduct(evt) {
  evt.preventDefault();
  if (!productForm.checkValidity()) {
    productForm.elements.button_submit.disabled = true;
    return;
  }

  const { name, price, category, image } = productForm.elements;
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

  product.createCard();
  toggleProductModal();
  productForm.reset();
}

function validateInputState(event) {
  const input = event.target;
  const isInvalidInput = !input.checkValidity();
  if (isInvalidInput) {
    productForm.elements.button_submit.disabled = true;
    input.classList.add("form__input_invalid");
    return;
  }

  input.classList.remove("form__input_invalid");
  const isValidForm = productForm.checkValidity();
  if (isValidForm) {
    productForm.elements.button_submit.disabled = false;
  }
}

function enableValidation(config) {
  const inputs = document.querySelectorAll(".form__input");

  inputs.forEach((input) => {
    input.addEventListener("input", validateInputState);
    input.addEventListener("blur", validateInputState);
  });
}

enableValidation({});

function showProductsAlert({ type, productName }) {
  const types = {
    add: { title: "PRODUTO ADICIONADO", action: "adicionado" },
    edit: { title: "PRODUTO ALTERADO", action: "alterado" },
    remove: { title: "PRODUTO EXCLUIDO", action: "excluído" },
  };

  // Lança um erro se o tipo for inválido
  if (!Object.keys(types).includes(type)) {
    throw new Error("Passed invalid type to showProductsAlert function");
  }

  const alertTemplate = document.querySelector("#alert-template");
  const alertElement = alertTemplate.content.cloneNode(true);

  const alertContainer = document.querySelector(".alert_container");

  const alert = alertElement.querySelector(".alert");
  const title = alertElement.querySelector(".alert__title");
  const textProduct = alertElement.querySelector(".alert__text-product");
  const textAction = alertElement.querySelector("#alert__text-action");

  alert.classList.add(`alert_${type}`);
  title.textContent = types[type].title;
  textProduct.textContent = productName;
  textAction.textContent = types[type].action;

  alertContainer.append(alert);

  setTimeout(() => {
    alert.addEventListener("animationend", (evt) => {
      alert.remove();
    });
    alert.classList.add("hide_alert");
  }, 2500);
}
