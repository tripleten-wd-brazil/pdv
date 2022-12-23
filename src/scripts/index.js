const addProduct = function (event) {
  // extrair os dados do produto
  const product = event.target.closest(".product");

  const descriptionElement = product.querySelector(".product__name");
  const priceElement = product.querySelector(".product__price");

  const description = descriptionElement.textContent;
  const price = priceElement.textContent;

  // criar o item da listagem
  const itemTemplate = document.querySelector("#order__entry");
  const itemElement = itemTemplate.content.cloneNode(true);

  // popular o item
  const itemNameElement = itemElement.querySelector(".item__product");
  const itemPriceElement = itemElement.querySelector(".item__price");
  const itemTotalElement = itemElement.querySelector(".item__total");
  itemNameElement.textContent = description;
  itemPriceElement.textContent = price;
  itemTotalElement.textContent = price;

  // adicionar o produto na listagem da venda
  const orderList = document.querySelector(".order__list");
  orderList.prepend(itemElement);
};

const buttons = document.querySelectorAll(".product__button");
buttons.forEach(function (button) {
  button.addEventListener("click", addProduct);
});
