import Product from "./Product.js";

export default class ProductList {
  constructor(order) {
    const products = JSON.parse(localStorage.getItem("products"));
    products.forEach((productData) => {
      const product = new Product(productData);
      product.createCard(order);
    });
  }
}
