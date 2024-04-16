import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this.popup.querySelector(".form");
    this.setEventListeners();
  }

  _getInputValues(form) {
    const data = new FormData(form);
    const dataObject = Object.fromEntries(data.entries());
    return dataObject;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues(evt.target);
      this._submitCallback(data);
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
