import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import { INITIAL_PRODUCTS } from "./constants.js";

const popupWithImage = new PopupWithImage();
const section = new Section(
  {
    items: INITIAL_PRODUCTS,
    renderer: (productData) => {
      const card = new Card(
        productData,
        "#template-product",
        popupWithImage.open,
      );
      return card.generate();
    },
  },
  ".products",
);

section.renderInitialProducts();

const productPopup = new PopupWithForm(section.addItem, ".popup_product-form");
const buttonOpenProductForm = document.querySelector("#open-product-form");
buttonOpenProductForm.addEventListener("click", () => {
  productPopup.open();
});

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
