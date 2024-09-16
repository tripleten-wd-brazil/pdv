// Elemento HTML popup para remover o display none;
let popupProfile = document.querySelector(".popup");

let buttonOpenProfile = document.querySelector(".seller__edit");
buttonOpenProfile.addEventListener("click", function () {
  popupProfile.classList.add("popup_opened");
});

// Fechar popup
// aplicar display none;

let buttonCloseProfile = document.querySelector(".popup__close-button");
buttonCloseProfile.addEventListener("click", function () {
  popupProfile.classList.remove("popup_opened");
});

// Salvar info do perfil
//
let formElement = document.querySelector(".form");
function handleProfileFormSubmit(evt) {
  // Esta linha impede o navegador
  // de enviar o formulário da forma padrão.
  evt.preventDefault();
  // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
  // Explicaremos em mais detalhes posteriormente.

  // Vamos encontrar os campos de formulário do DOM
  let nameInput = document.querySelector(".popup__name");
  let jobInput = document.querySelector(".popup__job");

  // Pegue os valores de cada campo do valor da propriedade correspondente
  let name = nameInput.value;
  let job = jobInput.value;

  // Selecione os elementos aos quais os valores dos campos serão inseridos
  let nameElement = document.querySelector(".profile__title");
  let jobElement = document.querySelector(".profile__job");
  // Insira novos valores usando a
  // propriedade textContent

  nameElement.textContent = name;
  jobElement.textContent = job;
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

  // Adicionar cardElement no HTML;
  //
  // Pegar a lista
  const productList = document.querySelector(".products");
  productList.prepend(cardElement);
}

initialProducts.forEach(createProduct);
