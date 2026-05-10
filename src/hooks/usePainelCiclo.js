import { useMemo } from "react";
import { prepararDadosDoCiclo } from "../services/ml/prepararDadosDoCiclo";

/**
 * 🏭 OFFICE-BOY DO PAINEL
 *
 * Responsável por:
 * - receber o produto final vindo do estoque
 * - pedir ao recortador os dados do ciclo
 * - validar o recorte
 * - repassar produto ao chefe da vitrine
 *
 * NÃO é responsabilidade (ainda):
 * - montar gráfico visual
 * - interpretar métricas
 * - renderizar UI
 */
export default function usePainelCiclo({
  analiseFinal,
  estimativas = [], // dataset1
  analises = []     // dataset2
}) {
  return useMemo(() => {
    const loadingCiclo = !analiseFinal;

    if (!analiseFinal) {
      return {
        produto: null,
        graficos: {
          previsoes: [],
          erros: []
        },
        loadingCiclo: true
      };
    }

    const dataInicial = analiseFinal?.ciclo?.dataInicial;
    const dataFinal = analiseFinal?.ciclo?.dataFinal;
    // console.log("📦 DATASET2 RECEBIDO NO OFFICE-BOY:", analises);

    const { previsoesFiltradas, comparacoesFiltradas } = prepararDadosDoCiclo({
      dataset1: estimativas,
      dataset2: analises,
      dataInicial,
      dataFinal
    });

    // console.log("🧪 TESTE REFERÊNCIA PERÍODO");
    // comparacoesFiltradas.forEach((item, i) => {
    //   console.log(i, item.periodo, item.periodo === comparacoesFiltradas[0].periodo);
    // });

    const errosFormatados = comparacoesFiltradas.map((item) => ({
      data: item.periodo?.dataFinal,
      erro: item.erro,
      erroPercentual: item.erroPercentual
    }));
    // console.log("📍 Coordenadas de erro formatadas:", errosFormatados);

    //🔎 DEBUG DE VALIDAÇÃO DO RECORTE
    // console.group("📦 OFFICE BOY → RECORTE DO CICLO");
    // console.log("📅 Intervalo do ciclo:", {
    //   dataInicial,
    //   dataFinal
    // });

    // console.log("📈 Dataset1 recortado (previsõesFiltradas):", {
    //   total: previsoesFiltradas.length,
    //   dados: previsoesFiltradas
    // });

    // console.log("📉 Dataset2 recortado (comparacoesFiltradas):", {
    //   total: comparacoesFiltradas.length,
    //   dados: comparacoesFiltradas
    // });

    // console.groupEnd();

    return {
      produto: analiseFinal,
      graficos: {
        previsoes: previsoesFiltradas,
        erros: errosFormatados
      },
      loadingCiclo
    };
  }, [analiseFinal, estimativas, analises]);
}