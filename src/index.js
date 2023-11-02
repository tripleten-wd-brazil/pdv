const popupProductForm = document.querySelector(".popup_product-form");

const buttonOpenProductForm = document.querySelector("#open-product-form");
buttonOpenProductForm.addEventListener("click", function () {
  popupProductForm.classList.add("popup_opened");
});

const buttonClose = document.querySelector(".button_close");
buttonClose.addEventListener("click", function () {
  popupProductForm.classList.remove("popup_opened");
});

function addProduct(productData) {
  const templateProduct = document.querySelector("#template-product");
  const productElement = templateProduct.content.cloneNode(true);

  const nameElement = productElement.querySelector(".product__name");
  nameElement.textContent = productData.name;

  const priceElement = productElement.querySelector(".product__price");
  priceElement.textContent = productData.price;

  const imageElement = productElement.querySelector(".product__image");
  imageElement.src = productData.image;
  imageElement.alt = productData.name;

  const productList = document.querySelector(".products");
  productList.append(productElement);
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

for (let i = 0; i < initialProducts.length; i++) {
  addProduct(initialProducts[i]);
}
