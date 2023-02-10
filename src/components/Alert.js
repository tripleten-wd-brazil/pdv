export default class Alert {
  static showProductAlert({ type, productName }) {
    const types = {
      add: { title: "PRODUTO ADICIONADO", action: "adicionado" },
      edit: { title: "PRODUTO ALTERADO", action: "alterado" },
      remove: { title: "PRODUTO EXCLUIDO", action: "excluído" },
    };

    // Lança um erro se o tipo for inválido
    if (!Object.keys(types).includes(type)) {
      throw new Error("Passed invalid type to showProductsAlert function");
    }

    const alertTemplate = document.querySelector("#alert-template");
    const alertElement = alertTemplate.content.cloneNode(true);

    const alertContainer = document.querySelector(".alert_container");

    const alert = alertElement.querySelector(".alert");
    const title = alertElement.querySelector(".alert__title");
    const textProduct = alertElement.querySelector(".alert__text-product");
    const textAction = alertElement.querySelector("#alert__text-action");

    alert.classList.add(`alert_${type}`);
    title.textContent = types[type].title;
    textProduct.textContent = productName;
    textAction.textContent = types[type].action;

    alertContainer.append(alert);

    setTimeout(() => {
      alert.addEventListener("animationend", (evt) => {
        alert.remove();
      });
      alert.classList.add("hide_alert");
    }, 2500);
  }
}
