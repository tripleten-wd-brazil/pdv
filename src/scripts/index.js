const addProductToOrder = function (event) {
  // Criar um item de vendas
  const templateItem = document.querySelector("#template-item");
  const item = templateItem.content.cloneNode(true);

  // Pegar o produto para resgatar as informações
  const productElement = event.target.closest(".product");
  const productName = productElement.querySelector(".product__name");
  const productPrice = productElement.querySelector(".product__price");

  // Popular esse item com as informações do meu produto
  const itemName = item.querySelector(".item__name");
  const itemPrice = item.querySelector(".item__price");
  const itemTotal = item.querySelector(".item__total");
  itemName.textContent = productName.textContent;
  itemPrice.textContent = productPrice.textContent;
  itemTotal.textContent = productPrice.textContent;

  // Pegar a listagem do pedido de vendas e adicionar o produto na lista
  const order = document.querySelector(".order__list");
  order.append(item);

  // Atualizar o total e o subtotal
};

const productButtons = document.querySelectorAll(".product__button");
for (let button of productButtons) {
  // callback
  button.addEventListener("click", addProductToOrder);
}
