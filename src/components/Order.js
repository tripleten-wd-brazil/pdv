import { numberToCurrency, currencyToNumber } from "./Currency.js";

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

export function addProduct(event) {
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
