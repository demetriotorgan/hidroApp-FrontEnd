import { useMemo } from "react";

export default function useGraficoCiclo({
  analiseDoCiclo,
  estimativas = [],
  analises = []
}) {

  return useMemo(() => {

    if (!analiseDoCiclo || !estimativas.length) {
      return {
        previsoesDoCiclo: [],
        dadosErro: [],
        evolucaoConsumo: []
      };
    }

    // 🧠 extrai previsão global do ciclo (linha de referência)
    const previsaoReferencia =
      analiseDoCiclo?.consumo?.previsto ?? null;

    // 📊 1. EVOLUÇÃO REAL vs PREVISTO (principal gráfico)
    const evolucaoConsumo = estimativas.flatMap((item) => {

      const basePrevisto = item?.previsao?.consumoM3 ?? previsaoReferencia ?? 0;

      return (item.snapshotDados || []).map((snap) => {
        const real = snap.leitura;

        const erro = basePrevisto
          ? ((real - basePrevisto) / basePrevisto) * 100
          : 0;

        return {
          data: snap.data,
          real,
          previsto: basePrevisto,
          erro
        };
      });
    });

    // 📉 2. ERRO AO LONGO DO TEMPO (derivado do anterior)
    const dadosErro = evolucaoConsumo.map((p) => ({
      data: p.data,
      erro: p.erro
    }));

    // 📈 3. PREVISÃO SIMPLIFICADA (linha de referência visual)
    const previsoesDoCiclo = evolucaoConsumo.map((p) => ({
      data: p.data,
      previsto: p.previsto,
      real: p.real
    }));

    return {
      evolucaoConsumo,
      previsoesDoCiclo,
      dadosErro
    };

  }, [analiseDoCiclo, estimativas, analises]);
}