import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    // logica
    // return {
      // name: "Name",
      // about: "About"
      // }
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this._popup.querySelector(".form");
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._submitCallback(values);
      this.close();
    });
  }
}
