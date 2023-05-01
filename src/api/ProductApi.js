export default class ProductApi {
  constructor() {
    this._baseUrl =
      "https://practicum-pdv-api.onrender.com/api/qY9UWsgKNoUPEAxV3NGoX6wkVaqup9/products";
  }

  list() {
    return fetch(this._baseUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch((error) => error);
  }
}
