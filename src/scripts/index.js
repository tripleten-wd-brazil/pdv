import Order from "../components/Order.js";
import "../components/Product.js";
import ProductForm from "../components/ProductForm.js";
import ProductList from "../components/ProductList.js";
import ProductApi from "../components/ProductApi.js";

import DeleteProductModal from "../components/DeleteProductModal.js";

const order = new Order();
const productApi = new ProductApi();
const productModal = new ProductForm("form-product", {
  order, // shorthand operator
  api: productApi,
});
new ProductList(order, productApi);

const modal = new DeleteProductModal();
const buttonTeste = document.querySelector(".button-teste");
buttonTeste.addEventListener("click", () => {
  modal.open();
});

const buttonOpenModal = document.querySelector("#open-product-modal");
buttonOpenModal.addEventListener("click", () => productModal.open());
