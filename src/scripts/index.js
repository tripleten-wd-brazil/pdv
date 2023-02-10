import Order from "../components/Order.js";
import "../components/Product.js";
import ProductForm from "../components/ProductForm.js";
import ProductList from "../components/ProductList.js";

const order = new Order();
new ProductForm("form-product", order);
new ProductList(order);
