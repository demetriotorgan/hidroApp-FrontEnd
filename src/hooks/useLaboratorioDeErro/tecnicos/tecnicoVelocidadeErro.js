export default function tecnicoVelocidadeErro({
  baseGlobal,
  baseCiclo,
}) {
  // =========================================================
  // 🔹 VALIDAÇÃO DE ENTRADA
  // =========================================================
  if (!baseGlobal?.valido || !baseCiclo?.valido) {
    return {
      status: "insuficiente",
      tipo: "velocidade_erro",
      resultado: null,
      metadados: {
        motivo: "bases_invalidas",
      },
    };
  }

  // =========================================================
  // 🔹 EXTRAÇÃO DA MÉTRICA BASE
  // =========================================================
  const mediaGlobal = baseGlobal.mediaErro;
  const mediaCiclo = baseCiclo.mediaErro;

  // =========================================================
  // 🔹 CÁLCULO DA VELOCIDADE RELATIVA
  // =========================================================
  const velocidade =
    (mediaCiclo - mediaGlobal) / (mediaGlobal || 1);

  // =========================================================
  // 🔹 CLASSIFICAÇÃO
  // =========================================================
  let tendencia;
  let nivel;
  let diagnostico;

  if (velocidade > 0.20) {
    tendencia = "aumentando erro";
    nivel = "alto";
    diagnostico = "crescimento acelerado";
  } else if (velocidade > 0.05) {
    tendencia = "aumentando erro";
    nivel = "medio";
    diagnostico = "crescimento lento";
  } else if (velocidade < -0.05) {
    tendencia = "reduzindo erro";
    nivel = "baixo";
    diagnostico = "desaceleração";
  } else {
    tendencia = "erro estável";
    nivel = "baixo";
    diagnostico = "estável";
  }

  // =========================================================
  // 🔹 RETORNO PADRONIZADO
  // =========================================================
  return {
    status: "ok",
    tipo: "velocidade_erro",

    resultado: {
      // Campos universais esperados pelo painel
      tendencia,
      intensidade: Math.abs(velocidade),
      nivel,
      diagnostico,
      confiabilidade: "media",

      leituraGlobal: mediaGlobal,
      leituraCiclo: mediaCiclo,

      // Métrica específica do técnico
      velocidade,
    },

    metadados: {
      unidade: "variação relativa",
      mediaGlobal,
      mediaCiclo,
    },
  };
}