import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function GraficoConsumoAcumulado({ dados }) {

  function prepararDados() {
    if (!dados || dados.length < 2) return [];

    const ordenados = [...dados].sort(
      (a, b) => new Date(a.data) - new Date(b.data)
    );

    const acumulado = [];
    let soma = 0;

    for (let i = 1; i < ordenados.length; i++) {

      const atual = ordenados[i];
      const anterior = ordenados[i - 1];

      const consumo = (atual.leitura - anterior.leitura) * 10;

      soma += consumo;

      acumulado.push({
        leituraNumero: i,
        data: new Date(atual.data).toLocaleDateString("pt-BR"),
        acumulado: soma
      });

    }

    return acumulado;
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
            value: "Acumulado (L)",
            angle: -90,
            position: "insideLeft"
          }}
        />

        <Tooltip
          formatter={(value) => [`${value} L`, "Acumlado(L)"]}
          labelFormatter={(label, payload) => {
            if (payload && payload.length) {
              return `Leitura ${label} - ${payload[0].payload.data}`;
            }
            return label;
          }}
        />

        <Line
          type="monotone"
          dataKey="acumulado"
          stroke="#16a34a"
          strokeWidth={3}
          dot={{ r: 4 }}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}

export default GraficoConsumoAcumulado;