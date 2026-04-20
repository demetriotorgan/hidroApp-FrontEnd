// classificacao.js

export function classificarIQA(iqa) {
  if (typeof iqa !== "number") return null;

  if (iqa >= 0.8) {
    return {
      nivel: "Excelente",
      codigo: "excelente",
      severidade: 0,
      faixa: [0.8, 1],
      cor: "#2ecc71" // verde
    };
  }

  if (iqa >= 0.6) {
    return {
      nivel: "Boa",
      codigo: "boa",
      severidade: 1,
      faixa: [0.6, 0.8],
      cor: "#27ae60"
    };
  }

  if (iqa >= 0.4) {
    return {
      nivel: "Regular",
      codigo: "regular",
      severidade: 2,
      faixa: [0.4, 0.6],
      cor: "#f1c40f" // amarelo
    };
  }

  if (iqa >= 0.2) {
    return {
      nivel: "Ruim",
      codigo: "ruim",
      severidade: 3,
      faixa: [0.2, 0.4],
      cor: "#e67e22" // laranja
    };
  }

  return {
    nivel: "Crítica",
    codigo: "critica",
    severidade: 4,
    faixa: [0, 0.2],
    cor: "#e74c3c" // vermelho
  };
};