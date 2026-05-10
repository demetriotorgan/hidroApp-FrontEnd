import { executarPipelineTecnico } from "../executarPipelineTecnico";

export default function centroCoordenacaoTecnicos(input) {

  const pacote = input;

  console.log("🏢 CCT | pacote recebido:", input);
  //   console.log("🩺 CCT | cheque de entrada:", {
  //   temPacote: !!pacote,
  //   temLotes: !!pacote?.lotes,
  //   temGlobal: !!pacote?.lotes?.global,
  //   temCiclo: !!pacote?.lotes?.ciclo,
  //   tamanhoGlobal: pacote?.lotes?.global?.length ?? 0,
  //   tamanhoCiclo: pacote?.lotes?.ciclo?.length ?? 0,
  // });

  // =========================================================
  // 🔹 VALIDAÇÃO DE ENTRADA
  // =========================================================  

  if (!pacote?.lotes?.global || !pacote?.lotes?.ciclo) {
    return {
      cctValido: false,
      motivo: "pacote_invalido_ou_incompleto",

      tecnicos: {},
      consolidado: {},

      entrada: {
        temGlobal: false,
        temCiclo: false,
      },

      prontoParaExpedicao: false,
    };
  }

  // =========================================================
  // 🔹 PIPELINE
  // =========================================================
  const pipeline = executarPipelineTecnico(pacote);
  console.log("🧠 CCT | retorno do pipeline:", pipeline);

  // =========================================================
  // 🔹 VALIDAÇÃO DO PIPELINE
  // =========================================================
  if (pipeline?.status !== "ok") {
    return {
      cctValido: false,
      motivo: "pipeline_invalido",

      pipeline,
      tecnicos: pipeline?.tecnicos ?? {},

      consolidado: {},

      entrada: {
        temGlobal: true,
        temCiclo: true,
      },

      prontoParaExpedicao: false,
    };
  }

  // =========================================================
  // 🔹 EXTRAÇÃO SEGURA DOs TÉCNICOs
  // =========================================================
  const tecnicos = pipeline.tecnicos ?? {};

  // =========================================================
  // 🔹 CONSOLIDAÇÃO (SOMENTE LEITURA)
  // =========================================================
  const consolidado = Object.fromEntries(
    Object.entries(tecnicos).map(([nome, laudo]) => [
      nome,
      laudo?.resultado ?? null,
    ])
  );

  // =========================================================
  // 🔹 RETORNO FINAL (CONTRATO FECHADO)
  // =========================================================
  console.log("📋 CCT | consolidado final:", {
    cctValido: true,
    tecnicosExecutados: Object.keys(tecnicos),
    consolidado,
    prontoParaExpedicao: true,
  });

   // =========================================================
  // 🔹 RETORNO FINAL
  // =========================================================

  return {
    cctValido: true,

    entrada: {
      temGlobal: true,
      temCiclo: true,
    },

    pipeline,
    tecnicos,
    consolidado,

    prontoParaExpedicao: true,
  };
}