//ORQUESTRADOR PARTE 1
// services/ml/executarCicloAnalise.js

import { prepararDadosDoCiclo } from "./prepararDadosDoCiclo";
import { analisarCicloMensal } from "./analisarCicloMensal";
import { ajustarCoeficienteA } from "./ajustarCoeficienteA";

// 👉 (opcional - só será usado se opcoes.salvar === true)
import { montarPayloadCiclo } from "./montarPayloadCiclo";
import { salvarResultadoCiclo } from "./salvarResultadoCiclo";

/**
 * Orquestrador central da fábrica de análise
 *
 * Responsável por executar TODO o pipeline de análise de um ciclo
 *
 * Regras:
 * - Não depende de React
 * - Não busca dados
 * - Determinístico
 * - Pode opcionalmente persistir resultado
 */
export async function executarCicloAnalise({
  dataset1,
  dataset2,
  ciclo,
  opcoes = {}
}) {
  try {
    const { salvar = false } = opcoes;

    console.log("🏭 ORQUESTRADOR INICIADO");
    console.log("📥 Entrada recebida:", {
      dataset1: dataset1?.length,
      dataset2: dataset2?.length,
      ciclo,
      salvar
    });

    // 🔒 1. Validação básica de entrada
    console.log("🔒 Etapa 1: validando entrada...");

    if (!dataset1 || !dataset2 || !ciclo) {
      console.warn("⛔ Falha na validação: parâmetros ausentes");

      return {
        status: "erro",
        erro: "Parâmetros obrigatórios ausentes"
      };
    }

    const {
      dataInicial,
      dataFinal,
      leituraInicial,
      leituraFinal
    } = ciclo;

    if (!dataInicial || !dataFinal) {
      console.warn("⛔ Falha na validação: datas obrigatórias ausentes");

      return {
        status: "erro",
        erro: "Datas do ciclo são obrigatórias"
      };
    }

    console.log("✅ Etapa 1 concluída: entrada válida");

    // 🔧 2. Preparar dados (RESPEITA REGRA DE CORTE)
    console.log("🔧 Etapa 2: preparando dados do ciclo...");

    const {
      previsoesFiltradas,
      comparacoesFiltradas
    } = prepararDadosDoCiclo({
      dataset1,
      dataset2,
      dataInicial,
      dataFinal
    });

    console.log("✅ Etapa 2 concluída: dados preparados", {
      previsoesFiltradas: previsoesFiltradas?.length,
      comparacoesFiltradas: comparacoesFiltradas?.length
    });

    // ⚠️ 3. Verificar se há dados suficientes
    console.log("⚠️ Etapa 3: validando suficiência de dados...");

    if (
      !previsoesFiltradas?.length &&
      !comparacoesFiltradas?.length
    ) {
      console.warn("⛔ Etapa 3 abortada: sem dados suficientes");

      return {
        status: "sem_dados",
        resultado: null,
        ajuste: null,
        payload: null
      };
    }

    console.log("✅ Etapa 3 concluída: dados suficientes");

    // 📊 4. Executar análise do ciclo
    console.log("📊 Etapa 4: executando análise do ciclo...");

    const resultado = analisarCicloMensal({
      previsoesFiltradas,
      comparacoesFiltradas,
      leituraInicial,
      leituraFinal,
      dataInicial,
      dataFinal
    });

    console.log("✅ Etapa 4 concluída: análise gerada", resultado);

    // 🔁 5. Ajustar coeficiente A
    console.log("🔁 Etapa 5: ajustando coeficiente A...");

    const coeficienteAtual =
      dataset1.at(-1)?.modelo?.coeficienteA || 1;

    const ajuste = ajustarCoeficienteA({
      coeficienteAtual,
      consumoReal: resultado.consumoReal,
      consumoPrevisto: resultado.consumoPrevisto
    });

    console.log("✅ Etapa 5 concluída: coeficiente ajustado", {
      coeficienteAtual,
      coeficienteSugerido: ajuste
    });

    // 📦 6. Montar payload final (PADRÃO ÚNICO DO SISTEMA)
    console.log("📦 Etapa 6: montando payload final...");

    const payload = montarPayloadCiclo({
      ciclo,
      resultado,
      coeficienteAtual,
      coeficienteSugerido: ajuste
    });

    console.log("✅ Etapa 6 concluída: payload montado", payload);

    // 💾 7. Persistência opcional
    console.log("💾 Etapa 7: verificando persistência...", {
      salvar
    });

    if (salvar) {
      console.log("💾 Etapa 7: salvando resultado no banco...");
      await salvarResultadoCiclo(payload);
      console.log("✅ Etapa 7 concluída: resultado salvo");
    } else {
      console.log("⏭️ Etapa 7 ignorada: persistência desabilitada");
    }

    // ✅ 8. Retorno final padronizado
    console.log("✅ Etapa 8: finalizando orquestrador com sucesso");

    return {
      status: "ok",
      resultado,
      ajuste,
      payload
    };

  } catch (error) {
    console.error("❌ Erro no executarCicloAnalise:", error);

    return {
      status: "erro",
      erro: error.message || "Erro inesperado no ciclo de análise"
    };
  }
}