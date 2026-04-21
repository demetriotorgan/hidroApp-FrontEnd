import { useEffect, useMemo, useState } from "react";
import useEstimativasSalvas from "./useEstimativasSalvas";
import useAnalises from "./useAnalises";

import { prepararDadosDoCiclo } from "../services/ml/prepararDadosDoCiclo";
import { analisarCicloMensal } from "../services/ml/analisarCicloMensal";
import { ajustarCoeficienteA } from "../services/ml/ajustarCoeficienteA";

export default function useAnaliseCiclo({
  dataInicial,
  dataFinal,
  leituraInicial,
  leituraFinal
}) {
  // 🔹 Hooks existentes
  const {
    estimativas,
    buscar: buscarEstimativas,
    carregandoEstimativas
  } = useEstimativasSalvas();

  const {
    analises,
    loading: carregandoAnalises
  } = useAnalises();

  // 🔹 Estados do ciclo
  const [status, setStatus] = useState("loading");
  const [resultado, setResultado] = useState(null);
  const [coeficienteSugerido, setCoeficienteSugerido] = useState(null);

  // 🔹 1. Carregar dados
  useEffect(() => {
    buscarEstimativas();
  }, [buscarEstimativas]);

  // =========================================================
  // 🔹 2. USAR DADOS CRUDOS (SEM NORMALIZAÇÃO AQUI)
  // =========================================================
  const dataset1 = estimativas || [];
  const dataset2 = analises || [];

  // =========================================================
  // 🔹 DEBUG (dados crus da API)
  // =========================================================
  // useEffect(() => {
  //   if (dataset1.length) {
  //     console.log("📦 RAW dataset1 (API):", dataset1[0]);
  //   }
  //   if (dataset2.length) {
  //     console.log("📦 RAW dataset2 (API):", dataset2[0]);
  //   }
  // }, [dataset1, dataset2]);

  // =========================================================
  // 🔹 3. Preparar dados do ciclo
  // =========================================================
  const { previsoesFiltradas, comparacoesFiltradas } = useMemo(() => {
    // console.log("🚀 Executando prepararDadosDoCiclo");

    if (!dataInicial || !dataFinal) {
      console.warn("⚠️ Datas do ciclo não informadas");
      return { previsoesFiltradas: [], comparacoesFiltradas: [] };
    }

    return prepararDadosDoCiclo({
      dataset1,
      dataset2,
      dataInicial,
      dataFinal
    });
  }, [dataset1, dataset2, dataInicial, dataFinal]);

  // =========================================================
  // 🔹 DEBUG (dados filtrados)
  // =========================================================
  // useEffect(() => {
  //   console.log("📅 dataInicial:", dataInicial);
  //   console.log("📅 dataFinal:", dataFinal);

  //   console.log("📌 previsoesFiltradas:", previsoesFiltradas);
  //   console.log("📌 comparacoesFiltradas:", comparacoesFiltradas);

  //   if (previsoesFiltradas.length) {
  //     const soma = previsoesFiltradas.reduce(
  //       (acc, r) => acc + (r.consumoPrevisto || 0),
  //       0
  //     );
  //     console.log("💧 SOMA PREVISTA (m³):", soma);
  //   }
  // }, [previsoesFiltradas, comparacoesFiltradas, dataInicial, dataFinal]);

  // =========================================================
  // 🔹 4. Executar análise do ciclo
  // =========================================================
  useEffect(() => {
    if (
      carregandoEstimativas ||
      carregandoAnalises ||
      leituraInicial == null ||
      leituraFinal == null
    ) {
      setStatus("loading");
      return;
    }

    if (!previsoesFiltradas.length) {
      setStatus("aguardando");
      return;
    }

    try {
      // console.log("🧠 Executando análise do ciclo");

      const analise = analisarCicloMensal({
        previsoesFiltradas,
        comparacoesFiltradas,
        leituraInicial,
        leituraFinal
      });

      // 🔹 Último coeficiente direto da API (não transformado)
      const ultimoCoeficiente =
        dataset1.at(-1)?.modelo?.coeficienteA || 1;

      const ajuste = ajustarCoeficienteA({
        coeficienteAtual: ultimoCoeficiente,
        consumoReal: analise.consumoReal,
        consumoPrevisto: analise.consumoPrevisto
      });

      // console.log("📊 Resultado análise:", analise);
      // console.log("⚙️ Ajuste coeficiente:", ajuste);

      setResultado(analise);
      setCoeficienteSugerido(ajuste);
      setStatus("analisado");
    } catch (error) {
      console.error("❌ Erro na análise do ciclo:", error);
      setStatus("erro");
    }
  }, [
    carregandoEstimativas,
    carregandoAnalises,
    leituraInicial,
    leituraFinal,
    previsoesFiltradas,
    comparacoesFiltradas,
    dataset1
  ]);

  // =========================================================
  // 🔹 5. Estado final do ciclo
  // =========================================================
  const estadoCiclo = useMemo(() => {
    if (status === "loading") return "carregando";
    if (status === "analisado") return "ciclo analisado";
    if (status === "aguardando") return "aguardando novo ciclo";
    return "erro";
  }, [status]);

  return {
    status: estadoCiclo,
    previsoesFiltradas,
    comparacoesFiltradas,
    resultado,
    coeficienteSugerido,
    loading: carregandoEstimativas || carregandoAnalises
  };
}