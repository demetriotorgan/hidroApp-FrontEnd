import { useMemo } from "react";

export default function useCicloMensal(leituras = []) {
  const cicloAtual = useMemo(() => {
    if (!leituras || leituras.length < 2) {
      return null;
    }

    const ordenadas = [...leituras].sort(
  (a, b) => new Date(a.data) - new Date(b.data)
);

    const penultima = ordenadas[ordenadas.length - 2];
    const ultima = ordenadas[ordenadas.length - 1];

    return {
      dataInicial: penultima.data,
      dataFinal: ultima.data,
      leituraInicial: penultima.leitura,
      leituraFinal: ultima.leitura
    };
  }, [leituras]);

  return { cicloAtual };
}