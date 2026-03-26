export function calcularIpH(ph) {
  const phIdeal = 7.2;
  const k = 33;
  return Math.max(0, Math.min(100, 100 - k * Math.abs(ph - phIdeal)));
}

export function calcularICl(cloro) {
  let valor;

  // 🔴 Muito baixo (risco de ficar sem cloro)
  if (cloro < 2) {
    valor = 40 * (cloro / 2);
  }

  // 🟡 Subindo para faixa ideal
  else if (cloro < 3) {
    valor = 70 + 30 * (cloro - 2);
  }

  // 🟢 Faixa ideal (3 a 5 mg/L)
  else if (cloro <= 5) {
    valor = 100;
  }

  // 🟠 Leve excesso
  else if (cloro <= 6.5) {
    valor = 100 - 20 * (cloro - 5);
  }

  // 🔴 Excesso alto
  else {
    valor = 70 - 30 * (cloro - 6.5);
  }

  return Math.max(0, Math.min(100, valor));
}

export function calcularIndicesQuimicos(dados) {
  const I_pH = calcularIpH(dados.ph);
  const I_cl = calcularICl(dados.cloro);

  const critico = I_pH < 30 || I_cl < 30;

  return { I_pH, I_cl, critico };
}