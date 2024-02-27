const editProfileButton = document.querySelector(".seller__edit");
const editProfilePopup = document.querySelector(".popup_edit_profile");

editProfileButton.addEventListener("click", function () {
  editProfilePopup.classList.add("popup_opened");
});

const editProfileCloseButton = editProfilePopup.querySelector(
  ".popup__close-button",
);
editProfileCloseButton.addEventListener("click", function () {
  editProfilePopup.classList.remove("popup_opened");
});

const formEditProfile = editProfilePopup.querySelector(".form");
formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const name = formEditProfile.querySelector(".form__input_name").value;
  const about = formEditProfile.querySelector(".form__input_job").value;
  const nameProfile = document.querySelector(".seller__name");
  const jobProfile = document.querySelector(".seller__job");
  nameProfile.textContent = name;
  jobProfile.textContent = about;
  editProfilePopup.classList.remove("popup_opened");
});

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

function renderProduct(productData) {
  // recuperar o template (query selector);
  const productTemplate = document.querySelector("#product-card");

  // criar um elemento a partir do template;
  const productElement = productTemplate.content.cloneNode(true);

  // adicionar informação no elemento (popular);
  const productImage = productElement.querySelector(".product__image");
  productImage.src = productData.image;
  productImage.alt = productData.name;

  const productName = productElement.querySelector(".product__name");
  productName.textContent = productData.name;

  const productPrice = productElement.querySelector(".product__price");
  productPrice.textContent = productData.price;
  // recuperar a lista de produtos;
  const productList = document.querySelector(".products");
  // adicionar o elemento populado na lista;
  productList.append(productElement);
}

initialProducts.forEach(renderProduct);
