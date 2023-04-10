export default class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this._handleEscButton = this._handleEscButton.bind(this);
  }

  _handleEscButton(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscButton);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscButton);
  }
}
