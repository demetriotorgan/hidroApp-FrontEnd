// services/previsaoService.js
export function calcularComparacao(consumoDoPeriodo, estimativa) {
  if (!consumoDoPeriodo || !estimativa || estimativa.erro) return null;

  return {
    real: consumoDoPeriodo.consumoLitros,
    estimado: estimativa.consumo,
    diferenca: estimativa.consumo - consumoDoPeriodo.consumoLitros,
    erroPercentual:
      ((estimativa.consumo - consumoDoPeriodo.consumoLitros) /
        consumoDoPeriodo.consumoLitros) * 100
  };
}