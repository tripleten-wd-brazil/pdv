function currencyToNumber(currency) {
  return Number(currency.replace("R$ ", "").replace(",", "."));
}

function numberToCurrency(number) {
  return `R$ ${number.toFixed(2).replace(".", ",")}`;
}

function calculateTotal(value, productPrice) {
  const newTotal =
    currencyToNumber(value.textContent) +
    currencyToNumber(productPrice.textContent);

  return numberToCurrency(newTotal);
}

const addProductToOrder = function (event) {
  // Pegar o produto para resgatar as informações
  const productElement = event.target.closest(".product");
  const productName = productElement.querySelector(".product__name");
  const productPrice = productElement.querySelector(".product__price");

  // Checar se já tem o produto na lista
  // Pegar a listagem do pedido de vendas
  const order = document.querySelector(".order__list");
  const existentProducts = Array.from(order.querySelectorAll(".item__name"));

  const existentProduct = existentProducts.find(function (currentItem) {
    return currentItem.textContent === productName.textContent;
  });

  if (existentProduct) {
    // Para adicionar a quantidade no produto existente!!!!
  } else {
    // Criar um item de vendas
    const templateItem = document.querySelector("#template-item");
    const item = templateItem.content.cloneNode(true);

    // Popular esse item com as informações do meu produto
    const itemName = item.querySelector(".item__name");
    const itemPrice = item.querySelector(".item__price");
    const itemTotal = item.querySelector(".item__total");
    itemName.textContent = productName.textContent;
    itemPrice.textContent = productPrice.textContent;
    itemTotal.textContent = productPrice.textContent;

    // e adicionar o produto na lista
    order.append(item);

    // Atualizar o total e o subtotal
    const orderTotal = document.querySelector(".order__total");
    const orderSubTotal = document.querySelector(".order__subtotal");

    orderTotal.textContent = calculateTotal(orderTotal, productPrice);
    orderSubTotal.textContent = calculateTotal(orderSubTotal, productPrice);
  }
};

const productButtons = document.querySelectorAll(".product__button");
for (let button of productButtons) {
  // callback
  button.addEventListener("click", addProductToOrder);
}

const formAddItem = document.forms.form_add_item;
function toggleModal() {
  modalAddItem.classList.toggle("modal_opened");
}

const modalAddItem = document.querySelector(".modal_add_item");
const buttonAddItem = document.querySelector(".button_add_item");
const buttonCloseModal = document.querySelector(".button_close_modal");
buttonAddItem.addEventListener("click", toggleModal);
buttonCloseModal.addEventListener("click", toggleModal);

formAddItem.addEventListener("submit", (evt) => {
  evt.preventDefault();
  // Object Destructuring

  const { image, name, price, category } = formAddItem.elements;
  const card = document.querySelector("#product-card").content.cloneNode(true);
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
  toggleModal();
  formAddItem.reset();
});
