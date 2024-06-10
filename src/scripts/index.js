// camelCase
let nomeDoProduto = "Feijoada vegana"; // String

let quantidadeDoProduto = 2; // Number
let precoDoProduto = 30.50; // Number

let valorPedido = quantidadeDoProduto * precoDoProduto;

// Boolean

let verdadeiro = true;
let falso = false;

let temDesconto = quantidadeDoProduto > 1;
if (temDesconto) {
  valorPedido = valorPedido - 2;
}

// Object
let produto = {
  nome: "Feijoada Vegana",
  preco: precoDoProduto,
  quantidade: quantidadeDoProduto,
};

console.log(produto);

// Functions
function calcularTotal(produto) {
  let total = produto.quantidade * produto.preco;
}

calcularTotal();

