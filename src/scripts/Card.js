class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._price = cardData.price;
    this._image = cardData.image;
    this._templateSelector = templateSelector;
  }

  _setEventListeners(element) {

  }

  _getTemplate() {
    const productTemplate = document.querySelector(this._templateSelector);
    return productTemplate.content.cloneNode(true);
  }

  _handleImageClick(productElement) {
      // pegar os elementos do popup pra setar valores
      const imageElement = imagePopup.querySelector(".popup__image");
      const nameElement = imagePopup.querySelector(".popup__product-name");
      // setar a imagem e o nome da imagem no popup
      imageElement.src = this._image;
      imageElement.alt = this._name;
      nameElement.textContent = this._name;
      // abrir o popup de imagem
      imagePopup.classList.add("popup_opened");
  }

  generateCard() {
    const productElement = this._getTemplate();
    const productImage = productElement.querySelector(".product__image");
    productImage.src = this._image;
    productImage.alt = this._name;
    productImage.addEventListener("click", function () {
      // pegar os elementos do popup pra setar valores
      const imageElement = imagePopup.querySelector(".popup__image");
      const nameElement = imagePopup.querySelector(".popup__product-name");
      // setar a imagem e o nome da imagem no popup
      imageElement.src = this._image;
      imageElement.alt = this._name;
      nameElement.textContent = this._name;
      // abrir o popup de imagem
      imagePopup.classList.add("popup_opened");
    });

    const productName = productElement.querySelector(".product__name");
    productName.textContent = this._name;

    const productPrice = productElement.querySelector(".product__price");
    productPrice.textContent = this._price;
    return productElement;
  }
}
