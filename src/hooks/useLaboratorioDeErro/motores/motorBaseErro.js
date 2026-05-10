export function motorBaseErro(lote = []) {

  // =========================================================
  // 🔹 VALIDAÇÃO DE ENTRADA
  // =========================================================
  if (!Array.isArray(lote) || lote.length === 0) {
    return {
      valido: false,
      mediaErro: null,
      amplitude: null,
      minimo: null,
      maximo: null,
      total: 0,
      dispersao: null,
    };
  }

  // =========================================================
  // 🔹 EXTRAÇÃO SEGURA
  // =========================================================
  const erros = lote
    .map(r => Number(r.erro))
    .filter(Number.isFinite);

  if (erros.length === 0) {
    return {
      valido: false,
      mediaErro: null,
      amplitude: null,
      minimo: null,
      maximo: null,
      total: 0,
      dispersao: null,
    };
  }

  // =========================================================
  // 🔹 CÁLCULOS
  // =========================================================
  const total = erros.length;

  const soma = erros.reduce((acc, v) => acc + v, 0);

  const mediaErro = soma / total;

  const minimo = Math.min(...erros);
  const maximo = Math.max(...erros);

  const amplitude = maximo - minimo;

  const variancia =
    erros.reduce((acc, v) => acc + Math.pow(v - mediaErro, 2), 0) / total;

  const dispersao = Math.sqrt(variancia);

  // =========================================================
  // 🔹 RETORNO PADRONIZADO (COMPATÍVEL COM TÉCNICO)
  // =========================================================
  return {
    valido: true,

    mediaErro: Number(mediaErro.toFixed(2)),
    minimo,
    maximo,
    amplitude: Number(amplitude.toFixed(2)),
    total,

    // compatível com leitura estatística avançada
    dispersao: Number(dispersao.toFixed(2)),
  };
}