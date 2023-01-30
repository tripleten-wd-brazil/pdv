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

const buttons = document.querySelectorAll(".product__button");
buttons.forEach(function (button) {
  button.addEventListener("click", addProduct);
});

//navbar
const navList = document.querySelectorAll('.categories__item');

function navItemActive(e){
  const navItem = e.target.closest('.categories__item');  
  resetClasses();
  navItem.classList.add('categories__actived');
}

navList.forEach((element)=>element.addEventListener('click', navItemActive));

function resetClasses() {
  navList.forEach((element) => element.classList.remove('categories__actived'));
}

//Form do modal

const productForm = document.forms["form-product"];
function toggleProductModal() {
  const productModal = document.querySelector(".modal_create-product");
  productModal.classList.toggle("modal_opened");
  productForm.elements.image.focus();
}

const buttonOpenProductModal = document.querySelector("#open-product-modal");
buttonOpenProductModal.addEventListener("click", toggleProductModal);

const buttonCloseProductModal = document.querySelector("#close-product-modal");
buttonCloseProductModal.addEventListener("click", toggleProductModal);

productForm.addEventListener("submit", createProduct);
function createProduct(evt) {
  evt.preventDefault();
  // Object destructuring ES2015
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
