import Modal from "./Modal.js";

export default class DeleteProductModal extends Modal {
  constructor() {
    super(".modal_delete-product");
  }

  setEventListeners() {
    super.setEventListeners();
    const cancelButton = this.modal.querySelector(".button_type_cancel");
    cancelButton.addEventListener("click", () => this.close());
  }
}
