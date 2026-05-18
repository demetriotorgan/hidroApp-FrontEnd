/**
 * Gera os dados para o gráfico de erro por dia do ciclo.
 *
 * Entrada esperada:
 * {
 *   sucesso: true,
 *   total: 1,
 *   dados: [
 *     {
 *       diaDoCiclo: 3,
 *       metricas: {
 *         erro: 0
 *       }
 *     }
 *   ]
 * }
 *
 * Saída:
 * {
 *   labels: [3],        // eixo X
 *   valores: [0],       // eixo Y
 *   series: [
 *     {
 *       name: 'Erro',
 *       data: [0]
 *     }
 *   ]
 * }
 */
export function gerarDadosGraficoErroAbsoluto(payload) {
  // Validação básica
  if (
    !payload ||
    !Array.isArray(payload.dados) ||
    payload.dados.length === 0
  ) {
    return {
      labels: [],
      valores: [],
      series: [
        {
          name: 'Erro',
          data: [],
        },
      ],
    };
  }

  // Ordena por dia do ciclo para garantir sequência correta no gráfico
  const dadosOrdenados = [...payload.dados].sort(
    (a, b) => a.diaDoCiclo - b.diaDoCiclo
  );

  // Eixo X -> dias do ciclo
  const labels = dadosOrdenados.map((item) => item.diaDoCiclo);

  // Eixo Y -> erro
  const valores = dadosOrdenados.map(
    (item) => item.metricas?.erro ?? 0
  );

  return {
    labels,
    valores,
    series: [
      {
        name: 'Erro',
        data: valores,
      },
    ],
  };
}