export function currencyToNumber(currency) {
  return Number(currency.replace("R$ ", "").replace(",", "."));
}

export function numberToCurrency(number) {
  return `R$ ${number.toFixed(2).replace(".", ",")}`;
}
