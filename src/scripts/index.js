import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";

const editProfileButton = document.querySelector(".seller__edit");
const editProfilePopup = document.querySelector(".popup_edit_profile");

editProfileButton.addEventListener("click", function () {
  editProfilePopup.classList.add("popup_opened");
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

const popupImage = new PopupWithImage(".popup_zoom_image");
popupImage.setEventListeners();
const section = new Section(
  {
    items: initialProducts,
    renderer: (productData) => {
      const card = new Card(productData, "#product-card");
      const productElement = card.generateCard();
      const productImage = productElement.querySelector(".product__image");
      productImage.addEventListener("click", function () {
        popupImage.open(productData.image, productData.name);
      });
      return productElement;
    },
  },
  ".products",
);
section.renderItems();

const addProductButton = document.querySelector("#open-product-popup");
const addProductPopup = document.querySelector(".popup_add_product");

addProductButton.addEventListener("click", function () {
  addProductPopup.classList.add("popup_opened");
});

const formAddProduct = addProductPopup.querySelector(".form");
formAddProduct.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const name = formAddProduct.querySelector(".form__input_name").value;
  const image = formAddProduct.querySelector(".form__input_image").value;
  const price = formAddProduct.querySelector(".form__input_price").value;

  // shorthand property: ao invés de name: name apenas name
  const product = {
    name,
    image,
    price,
  };
  renderProduct(product);
  formAddProduct.reset();

  addProductPopup.classList.remove("popup_opened");
});

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
