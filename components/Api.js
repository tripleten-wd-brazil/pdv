export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getProducts() {
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject();
    });
  }

  createProduct(product) {
    return fetch(`${this._baseUrl}/products`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject();
    });
  }
}

