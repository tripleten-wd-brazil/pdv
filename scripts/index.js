import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: 'https://practicum-pdv-api.onrender.com/api/',
  headers: {
    "Content-Type": "application/json"
  }
});

api.getProducts().then((items) => {
  const section = new Section({
    items,
    renderer: (item) => {
      const card = new Card(item, "#product-template", (imageUrl, imageName) => {
        popupWithImage.open(imageUrl, imageName);
      })
      const productElement = card.generateCard();
      return productElement;
    }
  }, ".products");

  section.renderItems();

  const productPopup = new PopupWithForm((values) => {
    api.createProduct({ ...values, category: "Bebidas" }).then((createdProduct) => {
      console.log(">>>>", createdProduct);
      section.addItem(values);
    });
  }, ".popup_form_product")
  productPopup.setEventListeners();

  const buttonAddProduct = document.querySelector(".button_add_product");
  buttonAddProduct.addEventListener("click", () => {
    productPopup.open();
  })
})

const popupWithImage = new PopupWithImage();

const config = {
  inputSelector: ".form__input",
  errorSelector: ".form__error",
  inputContainerSelector: ".form__input-container",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__error_active",
  errorClass: "popup__error_visible"
}
const formValidator = new FormValidator(config, ".form");
formValidator.enableValidation();
