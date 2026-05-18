// GraficoErroAbsoluto.jsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

/**
 * Props esperadas:
 *
 * {
 *   dados: {
 *     labels: [3, 4, 5, 6],
 *     valores: [0, 1.2, 0.8, 2.1],
 *     series: [
 *       {
 *         name: 'Erro',
 *         data: [0, 1.2, 0.8, 2.1]
 *       }
 *     ]
 *   }
 * }
 */
export default function GraficoErroAbsoluto({ dados }) {
  // Valor padrão para evitar erros caso dados seja undefined
  const dadosPadrao = {
    labels: [],
    valores: [],
    series: [],
  };

  const grafico = dados || dadosPadrao;

  /**
   * Converte:
   * labels = [3, 4, 5]
   * series[0].data = [0, 1.2, 0.8]
   *
   * Em:
   * [
   *   { diaDoCiclo: 3, Erro: 0 },
   *   { diaDoCiclo: 4, Erro: 1.2 },
   *   { diaDoCiclo: 5, Erro: 0.8 }
   * ]
   */
  const chartData = grafico.labels.map((label, index) => {
    const item = {
      diaDoCiclo: label,
    };

    grafico.series.forEach((serie) => {
      item[serie.name] = serie.data[index];
    });

    return item;
  });

  return (
    <div
      style={{
        width: '100%',
        height: 400,
        background: '#fff',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <h3
        style={{
          margin: '0 0 16px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#333',
        }}
      >
        Gráfico de Erro Absoluto
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="diaDoCiclo"
            label={{
              value: 'Dia do Ciclo',
              position: 'insideBottom',
              offset: -5,
            }}
          />

          <YAxis
            label={{
              value: 'Erro',
              angle: -90,
              position: 'insideLeft',
            }}
          />

          <Tooltip />
          

          {grafico.series.map((serie) => (
            <Line
              key={serie.name}
              type="monotone"
              dataKey={serie.name}
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}