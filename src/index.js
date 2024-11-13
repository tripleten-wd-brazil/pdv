import Section from "./components/Section.js";

// Elemento HTML popup para remover o display none;
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
const popupProfile = document.querySelector(".popup_edit_profile");

const buttonOpenProfile = document.querySelector(".seller__edit");
buttonOpenProfile.addEventListener("click", function () {
  openPopup(popupProfile);
});

// Fechar popup
// aplicar display none;

const buttonCloseProfile = document.querySelector(".popup__close-button");
buttonCloseProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});

// Salvar info do perfil
//
const formElement = document.querySelector(".form");
function handleProfileFormSubmit(evt) {
  // Esta linha impede o navegador
  // de enviar o formulário da forma padrão.
  evt.preventDefault();
  // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
  // Explicaremos em mais detalhes posteriormente.

  // Vamos encontrar os campos de formulário do DOM
  const nameInput = document.querySelector(".form__input_name");
  const jobInput = document.querySelector(".form__input_about");

  // Pegue os valores de cada campo do valor da propriedade correspondente
  const name = nameInput.value;
  const job = jobInput.value;

  // Selecione os elementos aos quais os valores dos campos serão inseridos
  const nameElement = document.querySelector(".seller__name");
  const jobElement = document.querySelector(".seller__job");
  // Insira novos valores usando a
  // propriedade textContent

  nameElement.textContent = name;
  jobElement.textContent = job;

  popupProfile.classList.remove("popup_opened");
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
formElement.addEventListener("submit", handleProfileFormSubmit);

const initialProducts = [
  {
    name: "Caldo de Cana",
    category: "Bebidas",
    price: "R$ 4,00",
    image: "https://i.ibb.co/Bs081pB/caldo-de-cana.jpg",
  },
  {
    name: "Caipirinha",
    category: "Bebidas",
    price: "R$ 10,00",
    image: "https://i.ibb.co/DbhdZ2k/caipirinha.jpg",
  },
  {
    name: "Cachorro-quente",
    category: "Lanches",
    price: "R$ 12,00",
    image: "https://i.ibb.co/nbBwQxX/cachorro-quente.webp",
  },
  {
    name: "Joelho",
    category: "Lanches",
    price: "R$ 6,00",
    image: "https://i.ibb.co/qpKG0Dv/joelho.webp",
  },
  {
    name: "Brigadeiro",
    category: "Doces",
    price: "R$ 3,50",
    image: "https://i.ibb.co/HKvKfjy/brigadeiro.jpg",
  },
  {
    name: "Paçoca",
    category: "Doces",
    price: "R$ 1,00",
    image: "https://i.ibb.co/M5p9MLj/pacoca.jpg",
  },
];

// Iterar pelos objetos do array

// Criar cada cartão (criar elemento HTML - template)
function createProduct(product) {
  // Pegar o template;
  const cardTemplate = document.querySelector("#product-template").content;
  // Faz a cópia;
  const cardElement = cardTemplate.querySelector(".product").cloneNode(true);
  // Pegar os elementos de dentro da cópia;
  const cardImage = cardElement.querySelector(".product__image");
  const cardPrice = cardElement.querySelector(".product__price");
  const cardName = cardElement.querySelector(".product__name");
  // Popular os sub-elementos com as informações do objeto;
  cardPrice.textContent = product.price;
  cardName.textContent = product.name;
  cardImage.setAttribute("src", product.image);
  cardImage.setAttribute("alt", product.name);
  return cardElement;
}

const section = new Section(
  { items: initialProducts, renderer: createProduct },
  ".products"
);
section.renderItems();

const buttonPopupProduto = document.querySelector(".cta_product_add");
const popupProduct = document.querySelector(".popup_create-product");

buttonPopupProduto.addEventListener("click", () => {
  openPopup(popupProduct);
});

const buttonCloseProduct = document.querySelector("#close-product-popup");
buttonCloseProduct.addEventListener("click", () => {
  closePopup(popupProduct);
});

const formAddCard = popupProduct.querySelector(".form");
formAddCard.addEventListener("submit", (evt) => {
  // atrasar o evendo dubmite ou click (atrasa o evento)
  evt.preventDefault();

  // Pegar os valores do input
  const inputs = formAddCard.querySelectorAll(".form__input");
  const product = {};
  inputs.forEach((input) => {
    product[input.name] = input.value;
  });
  createProduct(product);
});
