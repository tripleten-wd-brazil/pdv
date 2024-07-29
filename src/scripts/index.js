import { enableValidation } from "./validate.js";
import Card from "./Card.js";

const buttonSellerEdit = document.querySelector(".seller__edit");
const buttonAddProduct = document.querySelector(".cta_product_add");

const editProfilePopup = document.querySelector(".popup_edit_profile");
const addProductPopup = document.querySelector(".popup_add_product");
const popupImage = document.querySelector(".popup_image");

editProfilePopup.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) {
    closeAllPopups();
  }
});

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    closeAllPopups();
  }
}

document.addEventListener("keydown", closeOnEsc);

const openEditProfilePopup = function () {
  editProfilePopup.classList.add("popup_opened");
};
buttonSellerEdit.addEventListener("click", openEditProfilePopup);

// Padrão alternativo
const openAddProductPopup = function () {
  addProductPopup.classList.add("popup_opened");
};
buttonAddProduct.addEventListener("click", openAddProductPopup);

function closeAllPopups() {
  editProfilePopup.classList.remove("popup_opened");
  addProductPopup.classList.remove("popup_opened");
  popupImage.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

const editProfileForm = editProfilePopup.querySelector(".form");
editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const sellerName = document.querySelector(".seller__name");
  const sellerAbout = document.querySelector(".seller__job");
  const sellerNameInput = document.querySelector("#name");
  const sellerAboutInput = document.querySelector("#about");

  sellerName.textContent = sellerNameInput.value;
  sellerAbout.textContent = sellerAboutInput.value;
  closeAllPopups();
});

const buttonsClose = document.querySelectorAll(".popup__close-button");
buttonsClose.forEach((buttonClose) => {
  buttonClose.addEventListener("click", closeAllPopups);
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

function criaProduto(produto) {
  const product = new Card(produto, "#product-template");
  const productCopy = product.generate();

  // Pegar a lista de produtos;
  const productList = document.querySelector(".products");
  // Adicionar a cópia na lista de produtos;
  productList.prepend(productCopy);
}

const handleClickImage = (product) => {
  const image = popupImage.querySelector(".popup__image");
  image.src = product.image;
  image.alt = product.name;
  popupImage.classList.add("popup_opened");
};

for (let i = 0; i < initialProducts.length; i++) {
  criaProduto(initialProducts[i]);
}

const addProductForm = addProductPopup.querySelector(".form");
addProductForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const nameInput = document.querySelector("#productName");
  const priceInput = document.querySelector("#price");
  const imageInput = document.querySelector("#image");

  const produto = {
    name: nameInput.value,
    image: imageInput.value,
    price: priceInput.value,
  };
  criaProduto(produto);
  closeAllPopups();
});

const productFormConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(productFormConfig);
