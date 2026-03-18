import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const GraficoChuvaMm = ({ dados }) => {

  // transforma os dados da API
  const dadosFormatados = [...dados]
  .sort((a, b) => new Date(a.data) - new Date(b.data)) // 🔥 ordena do mais antigo → recente
  .map((item, index) => ({
    registro: index + 1,
    mm: item.mm
  }));

  return (
    <div className="form-container">
      <h2>Gráfico de Chuva (mm)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dadosFormatados}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="registro" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="mm"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoChuvaMm;