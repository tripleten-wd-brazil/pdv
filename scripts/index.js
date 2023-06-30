// Pegar o botão no HTML
let buttonAddProduct = document.querySelector(".button_add_product");
// Ao clicar no botão de adicionar item

// função de callback
let popup = document.querySelector(".popup");
function openPopup() {
  popup.classList.add("popup_opened");
}
// Abre o popup
buttonAddProduct.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_opened");
}
let buttonClosePopup = document.querySelector(".popup__close-button");
buttonClosePopup.addEventListener("click", closePopup);

let form = document.querySelector(".form");
form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let inputName = document.querySelector(".form__name");
  let inputPrice = document.querySelector(".form__price");

  let productName = document.querySelector(".product__name");
  let productPrice = document.querySelector(".product__price");

  productName.textContent = inputName.value;
  productPrice.textContent = "R$ " + inputPrice.value;
  closePopup();
});
