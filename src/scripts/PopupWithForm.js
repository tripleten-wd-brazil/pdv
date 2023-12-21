import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._submitCallback = submitCallback;
    this.setEventListeners();
  }

  _getInputValues() {
    const formData = new FormData(this._form);
    return Object.fromEntries(formData.entries());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._submitCallback(formData);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
