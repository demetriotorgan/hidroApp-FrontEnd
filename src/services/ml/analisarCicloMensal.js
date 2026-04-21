//Parte 2: Calcular: consumo, erro e métricas

export function analisarCicloMensal({
  previsoesFiltradas = [],
  comparacoesFiltradas = [],
  leituraInicial,
  leituraFinal
}) {
  if (leituraInicial == null || leituraFinal == null) {
    throw new Error("Leituras inicial e final são obrigatórias");
  }

  // 🔹 1. Consumo real
  const consumoReal = leituraFinal - leituraInicial;

  // 🔹 2. Consumo previsto
  const consumoPrevisto = previsoesFiltradas.reduce(
    (acc, reg) => acc + (reg.consumoPrevisto || 0),
    0
  );

  // 🔹 3. Erro real
  const erroReal = consumoPrevisto - consumoReal;

  const erroPercentualReal =
    consumoReal !== 0 ? (erroReal / consumoReal) * 100 : 0;

  // 🔹 4. Métricas
  const n = comparacoesFiltradas.length;

  let somaErroAbs = 0;
  let somaErroQuad = 0;
  let somaErroPerc = 0;
  let somaErro = 0;

  comparacoesFiltradas.forEach(reg => {
    const erro = reg.erro ?? 0;
    const erroPerc = reg.erroPercentual ?? 0;

    somaErroAbs += Math.abs(erro);
    somaErroQuad += erro ** 2;
    somaErroPerc += Math.abs(erroPerc);
    somaErro += erro;
  });

  const MAE = n ? somaErroAbs / n : 0;
  const RMSE = n ? Math.sqrt(somaErroQuad / n) : 0;
  const MAPE = n ? somaErroPerc / n : 0;
  const BIAS = n ? somaErro / n : 0;

  // 🔹 5. Tendência
  let tendencia = "neutra";
  if (BIAS > 0) tendencia = "superestimando";
  if (BIAS < 0) tendencia = "subestimando";

  // 🔹 6. Ajuste coeficiente A
  let fatorAjuste = 1;
  if (consumoPrevisto !== 0) {
    fatorAjuste = consumoReal / consumoPrevisto;
  }

  return {
    consumoReal,
    consumoPrevisto,
    erroReal,
    erroPercentualReal,
    metricas: {
      MAE,
      RMSE,
      MAPE,
      BIAS
    },
    tendencia,
    fatorAjuste
  };
};