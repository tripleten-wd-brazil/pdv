import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { Api } from "./Api.js";

const api = new Api({
  baseUrl: "https://tripleten-pdv-api.onrender.com/api",
  headers: {
    authorization: "ced3d496-8ee7-4e1d-b29a-1b54726ffbd5"
  }
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

const popupImage = new PopupWithImage(".popup_zoom_image");
popupImage.setEventListeners();

const section = new Section(
  {
    items: initialProducts,
    renderer: (productData) => {
      const card = new Card(productData, "#product-card");
      const productElement = card.generateCard();
      const productImage = productElement.querySelector(".product__image");
      productImage.addEventListener("click", function() {
        popupImage.open(productData.image, productData.name);
      });
      return productElement;
    },
  },
  ".products",
);
section.renderItems();

const addProductButton = document.querySelector("#open-product-popup");
const productPopup = new PopupWithForm((productData) => {
  section.addItem(productData);
}, ".popup_add_product");

addProductButton.addEventListener("click", function() {
  productPopup.open();
});

const userInfo = new UserInfo({
  nameSelector: ".seller__name",
  jobSelector: ".seller__job",
});

api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user);
});

const editProfileButton = document.querySelector(".seller__edit");
const profilePopup = new PopupWithForm((userData) => {
  userInfo.setUserInfo(userData);
}, ".popup_edit_profile");

editProfileButton.addEventListener("click", function() {
  profilePopup.open();
});

const addProductPopup = document.querySelector(".popup_add_product");
const formAddProduct = addProductPopup.querySelector(".form");
new FormValidator(
  {
    formSelector: ".form_add_product",
    inputSelector: ".form__input",
    submitButtonSelector: ".button_submit",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    errorSelector: ".form__error",
  },
  formAddProduct,
).enableValidation();

const editProfilePopup = document.querySelector(".popup_edit_profile");
const formEditProfile = editProfilePopup.querySelector(".form");
new FormValidator(
  {
    formSelector: ".form_edit_seller",
    inputSelector: ".form__input",
    submitButtonSelector: ".button_submit",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    errorSelector: ".form__error",
  },
  formEditProfile,
).enableValidation();
