// Elemento HTML popup para remover o display none;
let popupProfile = document.querySelector(".popup");

let buttonOpenProfile = document.querySelector(".profile__button");
buttonOpenProfile.addEventListener("click", function () {
  popupProfile.classList.add("popup_opened");
});

// Fechar popup
// aplicar display none;

let buttonCloseProfile = document.querySelector(".popup__button-close");
buttonCloseProfile.addEventListener("click", function () {
  popupProfile.classList.remove("popup_opened");
});

// Salvar info do perfil
//
let formElement = document.querySelector(".popup__form");
function handleProfileFormSubmit(evt) {
  // Esta linha impede o navegador
  // de enviar o formulário da forma padrão.
  evt.preventDefault();
  // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
  // Explicaremos em mais detalhes posteriormente.

  // Vamos encontrar os campos de formulário do DOM
  let nameInput = document.querySelector(".popup__name");
  let jobInput = document.querySelector(".popup__job");

  // Pegue os valores de cada campo do valor da propriedade correspondente
  let name = nameInput.value;
  let job = jobInput.value;

  // Selecione os elementos aos quais os valores dos campos serão inseridos
  let nameElement = document.querySelector(".profile__title");
  let jobElement = document.querySelector(".profile__job");
  // Insira novos valores usando a
  // propriedade textContent

  nameElement.textContent = name;
  jobElement.textContent = job;
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
formElement.addEventListener("submit", handleProfileFormSubmit);
