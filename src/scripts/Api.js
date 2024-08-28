class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getProducts() {
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editProfile(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "patch",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://tripleten-pdv-api.onrender.com/api",
  headers: {
    authorization: "ced3d496-8ee7-4e1d-b29a-1b54726ffbd5",
    "Content-Type": "application/json",
  },
});

export default api;
