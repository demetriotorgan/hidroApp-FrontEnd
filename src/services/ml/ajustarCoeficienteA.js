//Parte 3: Ajuste do coeficiente a com fator de correção de aprendizagem

export function ajustarCoeficienteA({
  coeficienteAtual,
  consumoReal,
  consumoPrevisto
}) {
  if (!consumoReal || !consumoPrevisto) {
    return {
      novoCoeficienteA: coeficienteAtual,
      fatorBruto: 1,
      fatorCorrecao: 1
    };
  }

  // 1. Fator bruto
  const fatorBruto = consumoReal / consumoPrevisto;

  // 2. Suavização (evita mudanças bruscas)
  const fatorCorrecao = 1 + (fatorBruto - 1) * 0.3;

  // 3. Novo coeficiente
  let novoCoeficienteA = coeficienteAtual * fatorCorrecao;

  // 4. LIMITES INTELIGENTES (relativos)
  const LIMITE_MIN = coeficienteAtual * 0.5;
  const LIMITE_MAX = coeficienteAtual * 1.5;

  if (novoCoeficienteA < LIMITE_MIN) {
    novoCoeficienteA = LIMITE_MIN;
  }

  if (novoCoeficienteA > LIMITE_MAX) {
    novoCoeficienteA = LIMITE_MAX;
  }

  return {
    fatorBruto,
    fatorCorrecao,
    novoCoeficienteA
  };
}