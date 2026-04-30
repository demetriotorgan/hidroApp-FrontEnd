// services/ml/montarPayloadCiclo.js

function normalizarTendencia(tendencia) {
  if (tendencia === "superestimando") return "superestimando";
  if (tendencia === "subestimando") return "subestimando";
  return "neutra";
}

export function montarPayloadCiclo({
  ciclo,
  resultado,
  coeficienteAtual,
  coeficienteSugerido
}) {
  return {
    ciclo: {
      dataInicial: new Date(ciclo.dataInicial),
      dataFinal: new Date(ciclo.dataFinal)
    },

    consumo: {
      real: Number(resultado.consumoReal),
      previsto: Number(resultado.consumoPrevisto),
      erro: Number(resultado.erroReal),
      erroPercentual: Number(resultado.erroPercentualReal)
    },

    metricas: {
      MAE: Number(resultado.metricas?.MAE || 0),
      RMSE: Number(resultado.metricas?.RMSE || 0),
      MAPE: Number(resultado.metricas?.MAPE || 0),
      BIAS: Number(resultado.metricas?.BIAS || 0)
    },

    tendencia: normalizarTendencia(resultado.tendencia),

    coeficiente: {
      anterior: Number(coeficienteAtual),
      sugerido: Number(coeficienteSugerido?.novoCoeficienteA || coeficienteAtual)
    },

    timestamp: new Date()
  };
}