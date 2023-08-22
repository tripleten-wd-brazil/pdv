import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import { handleImageClick, closePopup } from "./utils.js";

const items = [
  {
    name: "Coca cola",
    price: 6,
    imageUrl:
      "data:image/jpeg;base64,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",
  },
  {
    name: "Guaraná",
    price: 5.5,
    imageUrl:
      "data:image/jpeg;base64,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",
  },
  {
    name: "Fanta laranja",
    price: 6.5,
    imageUrl:
      "data:image/jpeg;base64,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",
  },
];

const section = new Section({
  items,
  renderer: (item) => {
    const card = new Card(item, "#product-template")
    const productElement = card.generateCard();

    const imageElement = productElement.querySelector(".product__image");
    imageElement.addEventListener("click", handleImageClick);
    return productElement;
  }
}, ".products");

section.renderItems();

const form = document.querySelector(".form");
form.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const inputName = document.querySelector(".form__name");
  const inputPrice = document.querySelector(".form__price");
  const inputImageUrl = document.querySelector(".form__imageUrl");

  const product = {
    name: inputName.value,
    price: inputPrice.value,
    imageUrl: inputImageUrl.value,
  };
  section.addItem(product);
  closePopup();
});



const config = {
  inputSelector: ".form__input",
  errorSelector: ".form__error",
  inputContainerSelector: ".form__input-container",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__error_active",
  errorClass: "popup__error_visible"
}
const formValidator = new FormValidator(config, form);
formValidator.enableValidation();
