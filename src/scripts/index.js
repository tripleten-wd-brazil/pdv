import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

const popupProductForm = document.querySelector(".popup_product-form");
const buttonOpenProductForm = document.querySelector("#open-product-form");
buttonOpenProductForm.addEventListener("click", () => {
  openPopup(popupProductForm);
});

const buttonCloseProductForm = document.querySelector(
  ".button_close_product-form",
);
buttonCloseProductForm.addEventListener("click", () =>
  closePopup(popupProductForm),
);

const popupProductImage = document.querySelector(".popup_product-image");
const buttonCloseProductImage = document.querySelector(".button_close_image");
buttonCloseProductImage.addEventListener("click", () =>
  closePopup(popupProductImage),
);

function addProduct(productData) {
  const card = new Card(productData, "#template-product");
  const productElement = card.generate();

  const imageElement = productElement.querySelector(".product__image");
  imageElement.addEventListener("click", () => {
    const popupImageElement = document.querySelector(".popup__image");
    popupImageElement.src = productCard.image;
    popupImageElement.alt = productCard.name;
    openPopup(popupProductImage);
  });

  const productList = document.querySelector(".products");
  productList.prepend(productElement);
}

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

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameInput = document.querySelector(".form__input_name");
  const priceInput = document.querySelector(".form__input_price");
  const imageInput = document.querySelector(".form__input_image");

  const productData = {
    name: nameInput.value,
    price: priceInput.value,
    image: imageInput.value,
  };
  addProduct(productData);
  closePopup(popupProductForm);
});
