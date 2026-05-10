export default function tecnicoTendenciaErro({
  baseGlobal,
  baseCiclo,
}) {

  // =========================================================
  // 🔹 VALIDAÇÃO MÍNIMA (APENAS GARANTIA DE CONTRATO)
  // =========================================================
  console.log("🧪 TÉCNICO | entrada recebida:", {
    baseGlobal: {
      valido: baseGlobal?.valido,
      mediaErro: baseGlobal?.mediaErro,
      dispersao: baseGlobal?.dispersao,
      total: baseGlobal?.total,
    },
    baseCiclo: {
      valido: baseCiclo?.valido,
      mediaErro: baseCiclo?.mediaErro,
      dispersao: baseCiclo?.dispersao,
      total: baseCiclo?.total,
    },
  });

  if (!baseGlobal?.valido || !baseCiclo?.valido) {
    console.warn("⚠️ TÉCNICO | bases inválidas:", {
      baseGlobalValido: baseGlobal?.valido,
      baseCicloValido: baseCiclo?.valido,
    });
    return {
      status: "insuficiente",
      tipo: "tendencia_erro",
      resultado: null,
      metadados: {
        motivo: "base_global_ou_ciclo_invalido",
      },
    };
  }

  // =========================================================
  // 🔹 EXTRAÇÃO DIRETA (SEM DUPLICAR VALIDAÇÃO)
  // =========================================================
  const global = baseGlobal.mediaErro;
  const ciclo = baseCiclo.mediaErro;

  // segurança extra (caso motor falhe parcialmente)
  if (typeof global !== "number" || typeof ciclo !== "number") {
    console.warn("⚠️ TÉCNICO | médias inválidas:", {
      global,
      ciclo,
      tipoGlobal: typeof global,
      tipoCiclo: typeof ciclo,
    });
    return {
      status: "insuficiente",
      tipo: "tendencia_erro",
      resultado: null,
      metadados: {
        motivo: "media_erro_invalida",
      },
    };
  }

  // =========================================================
  // 🔹 CÁLCULO CENTRAL
  // =========================================================
  const diferenca = global - ciclo;

  const tendencia =
    diferenca > 0
      ? "reduzindo erro"
      : diferenca < 0
        ? "aumentando erro"
        : "estavel";

  const intensidade = Math.abs(diferenca);

  console.log("🧠 TÉCNICO | cálculo central:", {
    global,
    ciclo,
    diferenca,
    tendencia,
    intensidade,
  });

  // =========================================================
  // 🔹 CLASSIFICAÇÃO (USANDO ESCALA MAIS ESTÁVEL)
  // =========================================================
  let nivel = "baixo";

  if (intensidade >= 20) nivel = "alto";
  else if (intensidade >= 10) nivel = "medio";

  // =========================================================
  // 🔹 CONFIABILIDADE (APROVEITA MOTOR, NÃO RECALCULA)
  // =========================================================
  const confiabilidade =
    baseGlobal.total > 10 && baseCiclo.total > 10
      ? "alta"
      : "media";

  console.log("📊 TÉCNICO | classificação:", {
    intensidade,
    nivel,
  });

  console.log("🛡️ TÉCNICO | confiabilidade:", {
  totalGlobal: baseGlobal.total,
  totalCiclo: baseCiclo.total,
  confiabilidade,
});

  // =========================================================
  // 🔹 RETORNO FINAL (CONTRATO LIMPO E ESTÁVEL)
  // =========================================================
  return {
    status: "ok",
    tipo: "tendencia_erro",

    resultado: {
      tendencia,
      intensidade,
      nivel,

      leituraGlobal: global,
      leituraCiclo: ciclo,
      diferenca,
    },

    metadados: {
      confiabilidade,

      // rastreabilidade (opcional, mas útil para debug futuro)
      baseGlobalMedia: baseGlobal.mediaErro,
      baseCicloMedia: baseCiclo.mediaErro,
      baseGlobalDispersao: baseGlobal.dispersao,
      baseCicloDispersao: baseCiclo.dispersao,
    },
  };
}