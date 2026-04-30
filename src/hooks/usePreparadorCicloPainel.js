import { useEffect, useState } from "react";
import api from "../services/api";

/**
 * 🏭 PREPARADOR DO PAINEL
 *
 * Responsável por:
 * - abrir o estoque
 * - buscar o produto final consolidado
 * - entregar o objeto bruto completo da análise
 *
 * NÃO é responsabilidade:
 * - interpretar UI
 * - montar gráficos
 * - calcular métricas
 * - preparar vitrine
 */
export default function usePreparadorCicloPainel() {
  const [analiseFinal, setAnaliseFinal] = useState(null);
  const [loadingAnaliseFinal, setLoadingAnaliseFinal] = useState(false);
  const [errorAnaliseFinal, setErrorAnaliseFinal] = useState(null);

  useEffect(() => {
    async function buscarUltimoCiclo() {
      try {
        setLoadingAnaliseFinal(true);
        setErrorAnaliseFinal(null);

        const res = await api.get("/ciclos-analise/ultimo");

        setAnaliseFinal(res.data ?? null);
      } catch (err) {
        console.error("Erro ao buscar análise final do ciclo:", err);

        setErrorAnaliseFinal(err.response?.data || err.message);
        setAnaliseFinal(null);
      } finally {
        setLoadingAnaliseFinal(false);
      }
    }

    buscarUltimoCiclo();
  }, []);

  return {
    analiseFinal,
    loadingAnaliseFinal,
    errorAnaliseFinal
  };
}