import AnalistaSemanticoErro from "./AnalistaSemanticoErro";

export default function useCarregadorDeExibicaoErro(cct) {

  // =========================================================
  // 🔹 1. VALIDAÇÃO DE ENTRADA
  // =========================================================
  if (!cct || typeof cct !== "object") {
    return {
      laudoValido: false,
      motivoBloqueio: "CCT ausente ou inválido",
      dados: null,
      meta: {
        prontoParaExibicao: false,
      },
    };
  }

  // =========================================================
  // 🔹 2. VALIDAÇÃO DO CCT
  // =========================================================
  if (!cct.cctValido || !cct.tecnicos) {
    return {
      laudoValido: false,
      motivoBloqueio: "CCT inválido ou incompleto",
      dados: null,
      meta: {
        prontoParaExibicao: false,
      },
    };
  }

  // =========================================================
  // 🔹 3. EXTRAÇÃO
  // =========================================================
  const tecnicos = cct.tecnicos ?? {};

  // =========================================================
  // 🔹 4. VALIDAÇÃO
  // =========================================================
  const nomesTecnicos = Object.keys(tecnicos);

  if (nomesTecnicos.length === 0) {
    return {
      laudoValido: false,
      motivoBloqueio: "Nenhum técnico disponível",
      dados: null,
      meta: {
        prontoParaExibicao: false,
      },
    };
  }


  // =========================================================
  // 🔹 5. Tradução dos Laudos
  // =========================================================
  const tecnicosFormatados = Object.fromEntries(
    Object.entries(tecnicos).map(([nome, laudo]) => {
      const resultado = laudo?.resultado ?? null;

      const resumo = {
        ...resultado,

        diagnostico:
          resultado?.diagnostico ??
          resultado?.tendencia ??
          null,

        leitura: {
          global: resultado?.leituraGlobal ?? null,
          ciclo: resultado?.leituraCiclo ?? null,
        },
      };

      const insight = resultado
        ? AnalistaSemanticoErro(resultado)
        : null;

      return [
        nome,
        {
          nome,
          tipo: laudo?.tipo ?? null,
          status: laudo?.status ?? null,
          resumo,
          insight,
          resultado,
          metadados: laudo?.metadados ?? {},
        },
      ];
    })
  );

  // =========================================================
  // 🔹 6. LOG
  // =========================================================
  console.log(
    "📦 CARREGADOR | laudos formatados:",
    tecnicosFormatados
  );

  // =========================================================
  // 🔹 7. RETORNO FINAL
  // =========================================================
  return {
    laudoValido: true,
    motivoBloqueio: null,
    status: "ok",

    dados: {
      tecnicos: tecnicosFormatados,
    },

    meta: {
      prontoParaExibicao: true,
      quantidadeTecnicos: nomesTecnicos.length,
      tecnicosDisponiveis: nomesTecnicos,
    },
  };
}