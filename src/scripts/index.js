// Feature: abrir popup
// Quando? Ao clicar no button "Editar"
// event: click;

const buttonSellerEdit = document.querySelector(".seller__edit");
const buttonAddProduct = document.querySelector(".cta_product_add");

const editProfilePopup = document.querySelector(".popup_edit_profile");
const addProductPopup = document.querySelector(".popup_add_product");

const openEditProfilePopup = function () {
  editProfilePopup.classList.add("popup_opened");
};
buttonSellerEdit.addEventListener("click", openEditProfilePopup);

// Padrão alternativo
const openAddProductPopup = function () {
  addProductPopup.classList.add("popup_opened");
};
buttonAddProduct.addEventListener("click", openAddProductPopup);

function closeAllPopups() {
  editProfilePopup.classList.remove("popup_opened");
  addProductPopup.classList.remove("popup_opened");
}

const editProfileForm = editProfilePopup.querySelector(".form");
editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const sellerName = document.querySelector(".seller__name");
  const sellerAbout = document.querySelector(".seller__job");
  const sellerNameInput = document.querySelector("#name");
  const sellerAboutInput = document.querySelector("#about");

  sellerName.textContent = sellerNameInput.value;
  sellerAbout.textContent = sellerAboutInput.value;
  closeAllPopups();
});

// TODO: Depois da explicação de vetores;
const buttonClose = document.querySelector(".popup__close-button");
buttonClose.addEventListener("click", closeAllPopups);

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

function criaProduto(produto) {
  // Pegar o template
  const productTemplate = document.querySelector("#product-template");

  // Fazer uma cópia
  const productCopy = productTemplate.content.cloneNode(true);

  // Pegar os sub elementos da cópia
  const productImage = productCopy.querySelector(".product__image");
  const productName = productCopy.querySelector(".product__name");
  const productPrice = productCopy.querySelector(".product__price");

  // Popular a cópia com os dados do produto;
  productImage.src = produto.image;
  productImage.alt = produto.name;
  productName.textContent = produto.name;
  productPrice.textContent = produto.price;

  // Pegar a lista de produtos;
  const productList = document.querySelector(".products");
  // Adicionar a cópia na lista de produtos;
  productList.prepend(productCopy);
}

for (let i = 0; i < initialProducts.length; i++) {
  criaProduto(initialProducts[i]);
}

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
