export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose)
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const buttonClose = this._popup.querySelector(".popup__close-button");
    buttonClose.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup")) {
        this.close();
      }
    });

  }
}

