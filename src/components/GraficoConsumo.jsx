import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function GraficoConsumo({ dados }) {

  function prepararDados() {
    if (!dados || dados.length < 2) return [];

    const ordenados = [...dados].sort(
      (a, b) => new Date(a.data) - new Date(b.data)
    );

    const consumo = [];

    for (let i = 1; i < ordenados.length; i++) {

      const atual = ordenados[i];
      const anterior = ordenados[i - 1];

      consumo.push({
        leituraNumero: i,
        data: new Date(atual.data).toLocaleDateString("pt-BR"),
        consumo: (atual.leitura - anterior.leitura) * 10
      });

    }

    return consumo;
  }

  const dadosGrafico = prepararDados();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosGrafico}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="leituraNumero"
          label={{
            value: "Número da leitura",
            position: "insideBottom",
            offset: -5
          }}
        />

        <YAxis
          domain={[0, 'dataMax + 100']}
          label={{
            value: "Consumo (L)",
            angle: -90,
            position: "insideLeft"
          }}
        />

        <Tooltip
          formatter={(value) => [`${value} L`, "Consumo"]}
          labelFormatter={(label, payload) => {
            if (payload && payload.length) {
              return `Leitura ${label} - ${payload[0].payload.data}`;
            }
            return label;
          }}
        />

        <Line
          type="monotone"
          dataKey="consumo"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 4 }}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}

export default GraficoConsumo;