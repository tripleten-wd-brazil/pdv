import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import Api from "./Api.js";

const api = new Api({
  baseUrl:
    "https://practicum-pdv-api.onrender.com/api/qY9UWsgKNoUPEAxV3NGoX6wkVaqup9",
  headers: {
    "Content-Type": "application/json",
  },
});

const popupWithImage = new PopupWithImage();
api.getInitialProducts().then((initialProducts) => {
  const section = new Section(
    {
      items: initialProducts,
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
  const productPopup = new PopupWithForm((item) => {
    api.createProduct(item).then((createdItem) => {
      section.addItem(createdItem);
    });
  }, ".popup_product-form");
  const buttonOpenProductForm = document.querySelector("#open-product-form");
  buttonOpenProductForm.addEventListener("click", () => {
    productPopup.open();
  });
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
