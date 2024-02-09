const editProfileButton = document.querySelector(".seller__edit");
const editProfilePopup = document.querySelector(".popup_edit_profile");
const imagePopup = document.querySelector(".popup_image");

editProfileButton.addEventListener("click", () => {
  editProfilePopup.classList.add("popup_opened");
});

const editProfileCloseButton = editProfilePopup.querySelector(
  ".popup__close-button",
);
editProfileCloseButton.addEventListener("click", () => {
  editProfilePopup.classList.remove("popup_opened");
});

const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");
imagePopupCloseButton.addEventListener("click", () => {
  imagePopup.classList.remove("popup_opened");
});

const formEditProfile = editProfilePopup.querySelector(".form");
formEditProfile.addEventListener("submit", (evt) => {
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

function renderProduct(product) {
  const productTemplate = document
    .querySelector("#product-template")
    .content.cloneNode(true);
  productTemplate.querySelector(".product__name").textContent = product.name;
  productTemplate.querySelector(".product__category").textContent =
    product.category;
  productTemplate.querySelector(".product__price").textContent = product.price;
  const imageElement = productTemplate.querySelector(".product__image");
  imageElement.src = product.image;
  imageElement.alt = product.name;

  imageElement.addEventListener("click", () => {
    const imagePopup = document.querySelector(".popup_image");
    const imagePopupImage = imagePopup.querySelector(".popup__image");
    const imagePopupCaption = imagePopup.querySelector(".popup__image-caption");
    imagePopupImage.src = product.image;
    imagePopupImage.alt = product.name;
    imagePopupCaption.textContent = product.name;
    imagePopup.classList.add("popup_opened");
  });

  const productList = document.querySelector(".products");
  productList.append(productTemplate);
}

initialProducts.forEach((product) => {
  renderProduct(product);
});

const openProductAddButton = document.querySelector(".cta_product_add");
const productPopup = document.querySelector(".popup_product");
openProductAddButton.addEventListener("click", () => {
  productPopup.classList.add("popup_opened");
});

const productPopupCloseButton = productPopup.querySelector(
  ".popup__close-button",
);
productPopupCloseButton.addEventListener("click", () => {
  productPopup.classList.remove("popup_opened");
});

const formAddProduct = productPopup.querySelector(".form");
formAddProduct.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = formAddProduct.querySelector(".form__input_name").value;
  const category = formAddProduct.querySelector(".form__input_category").value;
  const price = formAddProduct.querySelector(".form__input_price").value;
  const image = formAddProduct.querySelector(".form__input_image").value;
  const newProduct = {
    name,
    category,
    price,
    image,
  };
  renderProduct(newProduct);
  productPopup.classList.remove("popup_opened");
  formAddProduct.reset();
});
