// calculo.js

const PESOS = {
  cor: 0.3,
  turbidez: 0.35,
  odor: 0.2,
  ph: 0.15
};

export function calcularIQA(dados) {
  const { cor, turbidez, odor, ph } = dados;

  const iqa =
    cor * PESOS.cor +
    turbidez * PESOS.turbidez +
    odor * PESOS.odor +
    ph * PESOS.ph;

  // Garantir precisão e evitar ruído decimal
  return Number(iqa.toFixed(3));
};
