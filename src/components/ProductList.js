import Product from "./Product.js";

export default class ProductList {
  constructor(order, api) {
    api.list().then((products) => {
      products.forEach((productData) => {
        const product = new Product(productData);
        product.createCard(order);
      });
    });
  }
}
