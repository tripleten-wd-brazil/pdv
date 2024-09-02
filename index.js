console.log("Hello world");

// String
let nomeProduto = "Coca cola"; // String

// Number
let quantidadeProduto = 2; // integer
let precoProduto = 5.5; // float

let precoTotal = quantidadeProduto * precoProduto;

// Boolean
let temDesconto = precoProduto >= 5;
if (temDesconto) {
  precoProduto = precoProduto - 1;
}

// Object
let produto = {
  nome: "Coca cola",
  quantidade: 2,
  preco: 5.5,
  temDesconto: true,
};

let valorTotal = produto.preco * produto.quantidade;

console.log(produto);

// Function
// Declaracão
function consolar(conteudo) {
  console.log(conteudo);
  return "Sucesso";
}

// Invocar / Chamar
let meuConteudo = "Ola";
consolar(meuConteudo);

let meuResultado = consolar("Outro ola");
console.log(meuResultado);

// Outra forma de declaracao;
let minhaFuncao = function() {

}

minhaFuncao()
