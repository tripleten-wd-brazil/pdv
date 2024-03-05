function setClosePopup(popup) {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", function () {
    popup.classList.remove("popup_opened");
  });
}
const editProfileButton = document.querySelector(".seller__edit");
const editProfilePopup = document.querySelector(".popup_edit_profile");

editProfileButton.addEventListener("click", function () {
  editProfilePopup.classList.add("popup_opened");
});
setClosePopup(editProfilePopup);

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

const imagePopup = document.querySelector(".popup_zoom_image");
setClosePopup(imagePopup);

function renderProduct(productData) {
  // recuperar o template (query selector);
  const productTemplate = document.querySelector("#product-card");

  // criar um elemento a partir do template;
  const productElement = productTemplate.content.cloneNode(true);

  // adicionar informação no elemento (popular);
  const productImage = productElement.querySelector(".product__image");
  productImage.src = productData.image;
  productImage.alt = productData.name;
  productImage.addEventListener("click", function () {
    // pegar os elementos do popup pra setar valores
    const imageElement = imagePopup.querySelector(".popup__image");
    const nameElement = imagePopup.querySelector(".popup__product-name");
    // setar a imagem e o nome da imagem no popup
    imageElement.src = productData.image;
    imageElement.alt = productData.name;
    nameElement.textContent = productData.name;
    // abrir o popup de imagem
    imagePopup.classList.add("popup_opened");
  });

  const productName = productElement.querySelector(".product__name");
  productName.textContent = productData.name;

  const productPrice = productElement.querySelector(".product__price");
  productPrice.textContent = productData.price;
  // recuperar a lista de produtos;
  const productList = document.querySelector(".products");
  // adicionar o elemento populado na lista;
  productList.append(productElement);
}

initialProducts.forEach(renderProduct);

const addProductButton = document.querySelector("#open-product-popup");
const addProductPopup = document.querySelector(".popup_add_product");

addProductButton.addEventListener("click", function () {
  addProductPopup.classList.add("popup_opened");
});
setClosePopup(addProductPopup);

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
