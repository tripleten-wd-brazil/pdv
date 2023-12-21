import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

const popupWithImage = new PopupWithImage();
function addProduct(productData) {
  const card = new Card(productData, "#template-product");
  const productElement = card.generate();

  const imageElement = productElement.querySelector(".product__image");
  imageElement.addEventListener("click", () => {
    popupWithImage.open(productData.image, productData.name);
  });

  const productList = document.querySelector(".products");
  productList.prepend(productElement);
}

const productPopup = new PopupWithForm((productData) => {
  addProduct(productData);
}, ".popup_product-form");
const buttonOpenProductForm = document.querySelector("#open-product-form");
buttonOpenProductForm.addEventListener("click", () => {
  productPopup.open();
});

const initialProducts = [
  {
    name: "Coca Cola",
    price: "R$ 6,00",
    image: "./images/logo_coca.png",
  },
  {
    name: "Guaraná",
    price: "R$ 6,00",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Fanta",
    price: "R$ 6,00",
    image: "./images/logo_coca.png",
  },
  {
    name: "Coca Cola",
    price: "R$ 6,00",
    image: "./images/logo_coca.png",
  },
  {
    name: "Coca Cola",
    price: "R$ 6,00",
    image: "./images/logo_coca.png",
  },
];

initialProducts.forEach(addProduct);

const form = document.querySelector(".form");
const addCardFormValidator = new FormValidator(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
    errorSelector: ".form__error",
  },
  form,
);

addCardFormValidator.enableValidation();
