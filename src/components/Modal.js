export default class Modal {
  constructor(selector, ...config) {
    this.modal = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners(...config);
  }

  setEventListeners() {
    this.modal.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this.modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    console.log("close pai");
    this.modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
