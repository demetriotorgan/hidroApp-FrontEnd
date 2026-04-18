import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const GraficoCloracao = ({ dados }) => {

  // 1. Ordenar do mais antigo para o mais recente
  const dadosOrdenados = [...dados].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  // 2. Criar estrutura para o gráfico
  const dadosFormatados = dadosOrdenados.map((item, index) => ({
    indice: index + 1,           // eixo X (1,2,3...)
    produto: item.produto        // eixo Y
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={dadosFormatados}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis 
            dataKey="indice"
            label={{ value: "Registro", position: "insideBottom", offset: -5 }}
          />

          <YAxis 
            label={{ value: "Cloro (produto)", angle: -90, position: "insideLeft" }}
          />

          <Tooltip />

          <Line 
            type="monotone" 
            dataKey="produto" 
            stroke="#8884d8" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoCloracao;