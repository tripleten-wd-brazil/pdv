export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const buttonClose = this._popup.querySelector(".button_close");
    buttonClose.addEventListener("click", this.close);
  }
}
