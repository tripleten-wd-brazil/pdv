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

function calculateTotalAddProduct(price, quantity = 1) {
  const orderSubTotal = document.querySelector("#order__sub-total");
  const orderDiscount = document.querySelector("#order__discount");
  const orderTotal = document.querySelector("#order__total");

  const orderSubTotalNumber =
    currencyToNumber(orderSubTotal.textContent) + price * quantity;
  orderSubTotal.textContent = numberToCurrency(orderSubTotalNumber);
  orderTotal.textContent = numberToCurrency(
    orderSubTotalNumber - currencyToNumber(orderDiscount.textContent)
  );
}

function calculateTotalRemoveProduct(price, quantity = 1) {
  const orderSubTotal = document.querySelector("#order__sub-total");
  const orderDiscount = document.querySelector("#order__discount");
  const orderTotal = document.querySelector("#order__total");

  const orderSubTotalNumber =
    currencyToNumber(orderSubTotal.textContent) - price * quantity;
  orderSubTotal.textContent = numberToCurrency(orderSubTotalNumber);
  const orderTotalNumber =
    orderSubTotalNumber - currencyToNumber(orderDiscount.textContent) > 0
      ? orderSubTotalNumber - currencyToNumber(orderDiscount.textContent)
      : 0;
  orderTotal.textContent = numberToCurrency(orderTotalNumber);
}

function addProductToOrder(productName, price, orderList) {
  const itemTemplate = document.querySelector("#order__entry");
  const itemElement = itemTemplate.content.cloneNode(true);

  // popular o item
  const itemContainer = itemElement.querySelector(".order__item");
  const itemNameElement = itemElement.querySelector(".item__product");
  const itemPriceElement = itemElement.querySelector(".item__price");
  const itemTotalElement = itemElement.querySelector(".item__total");
  const itemButtonMinus = itemElement.querySelector(
    ".order__item-button-minus"
  );
  const itemButtonPlus = itemElement.querySelector(".order__item-button-plus");
  const itemQuantity = itemElement.querySelector(".item__quantity");

  itemNameElement.textContent = productName;
  itemPriceElement.textContent = price;
  itemTotalElement.textContent = price;

  // Cria eventos de diminuir/aumentar preço dos itens
  const priceNumber = currencyToNumber(price);
  calculateTotalAddProduct(priceNumber);

  itemButtonMinus.addEventListener("click", (evt) => {
    const newQuantity = Number(itemQuantity.textContent) - 1;
    if (newQuantity > 0) {
      itemQuantity.textContent = newQuantity;
      itemTotalElement.textContent = numberToCurrency(
        newQuantity * priceNumber
      );
    } else {
      itemContainer.classList.add("order__item-remove");
      itemContainer.addEventListener("animationend", () => {
        itemContainer.remove();
      });
    }
    calculateTotalRemoveProduct(priceNumber);
  });

  itemButtonPlus.addEventListener("click", (evt) => {
    const newQuantity = Number(itemQuantity.textContent) + 1;
    itemQuantity.textContent = newQuantity;
    itemTotalElement.textContent = numberToCurrency(newQuantity * priceNumber);

    calculateTotalAddProduct(priceNumber);
  });

  // adicionar o produto na listagem da venda
  orderList.prepend(itemElement);
}

const buttons = document.querySelectorAll(".product__button");
buttons.forEach(function (button) {
  button.addEventListener("click", addProduct);
});

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

productForm.addEventListener("submit", createProduct);

function createProduct(evt) {
  evt.preventDefault();
  if (!productForm.checkValidity()) {
    productForm.elements.button_submit.disabled = true;
    return;
  }

  const { name, price, category, image } = productForm.elements;
  const productCard = document
    .querySelector("#product-card")
    .content.cloneNode(true);

  const nameElement = productCard.querySelector(".product__name");
  const priceElement = productCard.querySelector(".product__price");
  const imageElement = productCard.querySelector(".product__image");
  const categoryElement = productCard.querySelector(".product__category");

  nameElement.textContent = name.value;
  priceElement.textContent = numberToCurrency(price.value);

  imageElement.src = image.value;
  imageElement.alt = name.value;

  categoryElement.textContent = category.value;
  const productList = document.querySelector(".products");
  productList.append(productCard);
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
