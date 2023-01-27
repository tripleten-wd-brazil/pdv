function currencyToNumber(currency) {
  return Number(currency.replace("R$ ", "").replace(",", "."));
}

function numberToCurrency(number) {
  return `R$ ${Number(number).toFixed(2).replace(".", ",")}`;
}

const mobileOrderListBtn = document.querySelector("#order__mobile-button");

const showOrderList = function (event) {
  const orderList = document.querySelector("#order");
  mobileOrderListBtn.classList.add("mobile-hidden");
  orderList.classList.remove("mobile-hidden");
};

mobileOrderListBtn.addEventListener("click", showOrderList);

const orderButton = document.querySelector("#order__button");

const hideOrderList = function (event) {
  const orderList = document.querySelector("#order");
  mobileOrderListBtn.classList.remove("mobile-hidden");
  orderList.classList.add("mobile-hidden");
};

orderButton.addEventListener("click", hideOrderList);

function addProduct(event) {
  // extrair os dados do produto
  const product = event.target.closest(".product");

  const descriptionElement = product.querySelector(".product__name");
  const priceElement = product.querySelector(".product__price");

  const description = descriptionElement.textContent;
  const price = priceElement.textContent;

  const orderList = document.querySelector(".order__list");
  const orderProducts = orderList.querySelectorAll(".item__product");

  // Pega o li que possui o match do produto
  const orderProductsArray = Array.from(orderProducts);
  const existentProduct = orderProductsArray.find(function (element) {
    return element.textContent === description;
  });

  const totalElement = document.querySelector(".order__total");
  const subtotalElement = document.querySelector(".order__subtotal");

  const total = currencyToNumber(totalElement.textContent);
  const subtotal = currencyToNumber(subtotalElement.textContent);
  const priceValue = currencyToNumber(price);

  const updatedTotal = total + priceValue;
  totalElement.textContent = numberToCurrency(updatedTotal);

  const updatedSubtotal = subtotal + priceValue;
  subtotalElement.textContent = numberToCurrency(updatedSubtotal);

  if (existentProduct) return incrementExistentProduct(existentProduct, price);
  addProductToOrder(description, price, orderList);
}

function incrementExistentProduct(existentProduct, price) {
  const itemElement = existentProduct.closest(".item");
  const quantityElement = itemElement.querySelector(".item__quantity");
  const quantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = quantity + 1;

  // Aumentar o valor
  const totalElement = itemElement.querySelector(".item__total");
  const total = currencyToNumber(totalElement.textContent);
  const priceNumber = currencyToNumber(price);
  totalElement.textContent = numberToCurrency(total + priceNumber);
}

function addProductToOrder(productName, price, orderList) {
  const itemTemplate = document.querySelector("#order__entry");
  const itemElement = itemTemplate.content.cloneNode(true);

  // popular o item
  const itemNameElement = itemElement.querySelector(".item__product");
  const itemPriceElement = itemElement.querySelector(".item__price");
  const itemTotalElement = itemElement.querySelector(".item__total");
  itemNameElement.textContent = productName;
  itemPriceElement.textContent = price;
  itemTotalElement.textContent = price;

  // adicionar o produto na listagem da venda
  orderList.prepend(itemElement);
}

const productForm = document.forms["form-product"];
function toggleProductModal() {
  const productModal = document.querySelector(".modal_create-product");
  productModal.classList.toggle("modal_opened");
  Array.from(productForm.elements).forEach((input) => {
    input.classList.remove("form__input_invalid");
  });
  productForm.elements.button_submit.disabled = true;
  productForm.elements.image.focus();
}

const buttonOpenProductModal = document.querySelector("#open-product-modal");
buttonOpenProductModal.addEventListener("click", toggleProductModal);

const buttonCloseProductModal = document.querySelector("#close-product-modal");
buttonCloseProductModal.addEventListener("click", toggleProductModal);

productForm.addEventListener("submit", saveProduct);
function saveProduct(evt) {
  evt.preventDefault();
  if (!productForm.checkValidity()) {
    productForm.elements.button_submit.disabled = true;
    return;
  }

  const { name, price, category, image } = productForm.elements;
  const product = {
    name: name.value,
    image: image.value,
    price: price.value,
    category: category.value,
  };

  const products = JSON.parse(localStorage.getItem("products"));
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  createProduct(product);
  toggleProductModal();
  productForm.reset();
}

function createProduct({ name, image, price, category }) {
  const productCard = document
    .querySelector("#product-card")
    .content.cloneNode(true);

  const nameElement = productCard.querySelector(".product__name");
  const priceElement = productCard.querySelector(".product__price");
  const imageElement = productCard.querySelector(".product__image");
  const categoryElement = productCard.querySelector(".product__category");
  const buttonElement = productCard.querySelector(".product__button");

  nameElement.textContent = name;
  priceElement.textContent = numberToCurrency(price);

  imageElement.src = image;
  imageElement.alt = name;

  categoryElement.textContent = category;
  buttonElement.addEventListener("click", addProduct);

  const productList = document.querySelector(".products");
  productList.append(productCard);
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

const products = JSON.parse(localStorage.getItem("products"));
products.forEach((product) => createProduct(product));
