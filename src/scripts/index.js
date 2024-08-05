import { enableValidation } from "./validate.js";
import Section from "./Section.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";

const buttonSellerEdit = document.querySelector(".seller__edit");
const buttonAddProduct = document.querySelector(".cta_product_add");

const addProductPopup = document.querySelector(".popup_add_product");
const popupImage = document.querySelector(".popup_image");

const editProfilePopup = new Popup(".popup_edit_profile");
editProfilePopup.setEventListeners();
buttonSellerEdit.addEventListener("click", editProfilePopup.open);

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

// const editProfileForm = editProfilePopup.querySelector(".form");
// editProfileForm.addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   const sellerName = document.querySelector(".seller__name");
//   const sellerAbout = document.querySelector(".seller__job");
//   const sellerNameInput = document.querySelector("#name");
//   const sellerAboutInput = document.querySelector("#about");
//
//   sellerName.textContent = sellerNameInput.value;
//   sellerAbout.textContent = sellerAboutInput.value;
//   closeAllPopups();
// });

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

const popupWithImage = new PopupWithImage();
const section = new Section(
  {
    items: initialProducts,
    renderer: (produto) => {
      const product = new Card(produto, "#product-template", (item) => {
        popupWithImage.open(item);
      });
      const productCopy = product.generate();

      section.addItem(productCopy);
    },
  },
  ".products"
);

section.renderItems();

// function criaProduto(produto) {
//   const product = new Card(produto, "#product-template");
//   const productCopy = product.generate();
//
//   // Pegar a lista de produtos;
//   const productList = document.querySelector(".products");
//   // Adicionar a cópia na lista de produtos;
//   productList.prepend(productCopy);
// }

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
