export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialProducts() {
    // template strings
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
    }).then((res) => res.json());
  }

  createProduct(product) {
    // template strings
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(product),
    }).then((res) => res.json());
  }
}
