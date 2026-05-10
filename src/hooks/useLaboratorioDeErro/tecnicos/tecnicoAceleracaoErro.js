export default function tecnicoAceleracaoErro({
  baseGlobal,
  baseCiclo,
}) {
  // =========================================================
  // 🔹 VALIDAÇÃO DE ENTRADA
  // =========================================================
  if (!baseGlobal?.valido || !baseCiclo?.valido) {
    return {
      status: "insuficiente",
      tipo: "aceleracao_erro",
      resultado: null,
      metadados: {
        motivo: "bases_invalidas",
      },
    };
  }

  // =========================================================
  // 🔹 EXTRAÇÃO DAS MÉTRICAS BASE
  // =========================================================
  const mediaGlobal = baseGlobal.mediaErro;
  const mediaCiclo = baseCiclo.mediaErro;

  // =========================================================
  // 🔹 PRIMEIRA DERIVADA (VELOCIDADE)
  // =========================================================
  // Mede a variação relativa do erro entre o ciclo atual e o histórico.
  const velocidade =
    (mediaCiclo - mediaGlobal) / (mediaGlobal || 1);

  // =========================================================
  // 🔹 SEGUNDA DERIVADA (ACELERAÇÃO)
  // =========================================================
  // Como ainda temos apenas dois pontos (global e ciclo),
  // usamos a própria velocidade como aproximação da aceleração.
  //
  // Interpretação:
  // - valor positivo: erro ganhando força
  // - valor negativo: erro perdendo força
  // - valor próximo de zero: comportamento estável
  const aceleracao = velocidade;

  // =========================================================
  // 🔹 CLASSIFICAÇÃO OPERACIONAL
  // =========================================================
  let tendencia;
  let nivel;
  let diagnostico;

  if (aceleracao > 0.20) {
    tendencia = "aumentando erro";
    nivel = "alto";
    diagnostico = "aceleração positiva";
  } else if (aceleracao > 0.05) {
    tendencia = "aumentando erro";
    nivel = "medio";
    diagnostico = "ganhando velocidade";
  } else if (aceleracao < -0.05) {
    tendencia = "reduzindo erro";
    nivel = "baixo";
    diagnostico = "aceleração negativa";
  } else {
    tendencia = "erro estável";
    nivel = "baixo";
    diagnostico = "estável";
  }

  // =========================================================
  // 🔹 CONFIABILIDADE
  // =========================================================
  const confiabilidade =
    baseGlobal.total > 10 && baseCiclo.total > 10
      ? "alta"
      : "media";

  // =========================================================
  // 🔹 RETORNO PADRONIZADO
  // =========================================================
  return {
    status: "ok",
    tipo: "aceleracao_erro",

    resultado: {
      // Campos universais obrigatórios
      tendencia,
      intensidade: Math.abs(aceleracao),
      nivel,
      diagnostico,
      confiabilidade,
      leituraGlobal: mediaGlobal,
      leituraCiclo: mediaCiclo,

      // Métricas específicas
      velocidade,
      aceleracao,
    },

    metadados: {
      unidade: "variação relativa",
      mediaGlobal,
      mediaCiclo,
    },
  };
}