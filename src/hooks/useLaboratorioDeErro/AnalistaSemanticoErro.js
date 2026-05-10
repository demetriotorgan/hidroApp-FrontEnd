import {
  SEVERIDADE_MAP,
  CONFIANCA_MAP,
  DIAGNOSTICO_MAP,
  RECOMENDACAO_MAP,
} from "./erroMaps";

export default function AnalistaSemanticoErro(resultado) {
  if (!resultado) return null;

  const {
    tendencia,
    intensidade,
    nivel,
    diagnostico,
    confiabilidade,
  } = resultado ?? {};

  // =========================================================
  // 🔹 NORMALIZAÇÃO SEMÂNTICA
  // =========================================================
  const normalizarNivel = {
    baixo: "baixo",
    medio: "medio",
    alto: "alto",
  };

  const normalizarConfianca = {
    baixa: "baixa",
    media: "media",
    alta: "alta",
  };

  const normalizarDiagnostico = {
    "reduzindo erro": "reduzindo erro",
    "aumentando erro": "aumentando erro",
    "erro estável": "erro estável",
  };

  const statusKey =
    normalizarNivel[nivel] ?? "indefinido";

  const confiancaKey =
    normalizarConfianca[confiabilidade] ?? "media";

  const diagnosticoKey =
    normalizarDiagnostico[diagnostico] ??
    normalizarDiagnostico[tendencia] ??
    diagnostico ??
    tendencia ??
    "indefinido";

  // =========================================================
  // 🔹 LEITURA SEMÂNTICA
  // =========================================================
  const leituraStatus =
    SEVERIDADE_MAP[statusKey] ||
    "Severidade não classificada pelo sistema.";

  const leituraConfianca =
    CONFIANCA_MAP[confiancaKey] ||
    "Confiabilidade não classificada pelo sistema.";

  const leituraDiagnostico =
    DIAGNOSTICO_MAP[diagnosticoKey] ||
    "Diagnóstico sem padrão reconhecido.";

  const recomendacao =
    RECOMENDACAO_MAP[statusKey] ||
    RECOMENDACAO_MAP[diagnosticoKey] ||
    "Manter monitoramento contínuo do modelo e observar evolução dos erros.";

  console.log("🧠 ANALISTA SEMÂNTICO | leitura final:", {
    entrada: {
      tendencia,
      intensidade,
      nivel,
      diagnostico,
      confiabilidade,
    },

    chaves: {
      statusKey,
      confiancaKey,
      diagnosticoKey,
    },

    saida: {
      leituraStatus,
      leituraConfianca,
      leituraDiagnostico,
      recomendacao,
    }
  });

  return {
    leituraStatus,
    leituraConfianca,
    leituraDiagnostico,
    recomendacao,
  };
}