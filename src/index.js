import "./pages/index.css";

import { enableValidation } from "./scripts/validate.js";
import Section from "./scripts/Section.js";
import Card from "./scripts/Card.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import api from "./scripts/Api.js";

const userInfo = new UserInfo({
  nameSelector: ".seller__name",
  jobSelector: ".seller__job",
});

api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
});

const buttonSellerEdit = document.querySelector(".seller__edit");
const buttonAddProduct = document.querySelector(".cta_product_add");

const addProductPopup = document.querySelector(".popup_add_product");
const popupImage = document.querySelector(".popup_image");

const editProfilePopup = new PopupWithForm((values) => {
  api.editProfile(values).then(() => {
    userInfo.setUserInfo(values);
  });
}, ".popup_edit_profile");
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

api.getProducts().then((initialProducts) => {
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
    ".products",
  );

  section.renderItems();
});

const popupWithImage = new PopupWithImage();

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
