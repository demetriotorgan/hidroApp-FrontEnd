import { prepararDadosDoCiclo } from "../../services/ml/prepararDadosDoCiclo";

export default function useGerenteLaboratorioErro({
  dataset1,
  dataset2,
  dataInicial,
  dataFinal,
}) {

  // =========================================================
  // 🔹 VALIDAÇÃO BASE (MATÉRIA-PRIMA)
  // =========================================================
  if (!Array.isArray(dataset2) || dataset2.length === 0) {
    return {
      materiaPrimaValida: false,
      motivoBloqueio: "dataset_invalido",

      pacote: null,
      prontoParaDistribuicao: false,
    };
  }

  // =========================================================
  // 🔹 VALIDAÇÃO ESTRUTURAL MÍNIMA
  // =========================================================
  const estruturaOk = dataset2.every((r) =>
    r?.periodo?.dataInicial &&
    r?.periodo?.dataFinal &&
    typeof r?.comparacao?.erroPercentual === "number"
  );

  if (!estruturaOk) {
    return {
      materiaPrimaValida: false,
      motivoBloqueio: "estrutura_invalida",

      pacote: null,
      prontoParaDistribuicao: false,
    };
  }

  // =========================================================
  // 🔹 LOTE GLOBAL (HISTÓRICO COMPLETO)
  // =========================================================
  const loteGlobal = dataset2.map((r, indice) => ({
    indice,
    dataInicial: r.periodo.dataInicial,
    dataFinal: r.periodo.dataFinal,
    janelaDias: r.periodo.quantidadeDias ?? null,
    erro: r.comparacao.erroPercentual,
    acuracia: r.comparacao.acuracia ?? null,
    tendencia: r.comparacao.tendencia ?? null,
    classificacao: r.comparacao.classificacao ?? null,
  }));

  // =========================================================
  // 🔹 LOTE CICLO (RECORTE OPERACIONAL)
  // =========================================================
  let loteCiclo = [];

  try {
    const { comparacoesFiltradas } = prepararDadosDoCiclo({
      dataset1,
      dataset2,
      dataInicial,
      dataFinal,
    });

    loteCiclo = comparacoesFiltradas.map((r, indice) => ({
      indice,
      dataInicial: r.periodo.dataInicial,
      dataFinal: r.periodo.dataFinal,
      janelaDias:
        r.periodo.dataInicial && r.periodo.dataFinal
          ? Math.ceil(
              (new Date(r.periodo.dataFinal) -
                new Date(r.periodo.dataInicial)) /
                (1000 * 60 * 60 * 24)
            ) + 1
          : null,
      erro: r.erroPercentual,
      acuracia: r.acuracia ?? null,
      tendencia: r.tendencia ?? null,
      classificacao: r.classificacao ?? null,
    }));
  } catch (error) {
    console.warn("⚠️ erro ao preparar ciclo:", error.message);
    loteCiclo = [];
  }

  // =========================================================
  // 🔹 PACOTE FINAL (CONTRATO DO CCT)
  // =========================================================
  return {
    materiaPrimaValida: true,
    motivoBloqueio: null,

    pacote: {
      metadados: {
        origem: "gerente_laboratorio_erro",
        volume: dataset2.length,
        timestamp: Date.now(),
      },

      lotes: {
        global: loteGlobal,
        ciclo: loteCiclo,
      },

      contexto: {
        dataInicial,
        dataFinal,
      },
    },

    prontoParaDistribuicao: true,
  };
}