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

const GraficoVolumeReservatorio = ({ registros }) => {

  if (!registros || registros.length === 0) {
    return <div>Aguardando dados de volume...</div>;
  }

    // 1. Formatar dados
  const dadosGrafico = [...registros]
  .reverse()
  .map((item, index) => ({
    indice: index + 1,
    volume: Number(item.reservatorio),
    data: item.data
  }));

  return (
    <div style={{ width: '100%', marginBottom: 30 }}>

      {/* 📊 GRÁFICO */}
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={dadosGrafico}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis 
              dataKey="indice"
              label={{ value: "Registro", position: "insideBottom", offset: -5 }}
            />

            <YAxis 
              label={{ value: "Volume (L)", angle: -90, position: "insideLeft" }}
            />

            <Tooltip
              formatter={(value) => `${value} L`}
              labelFormatter={(label) => `Registro ${label}`}
            />

            <Line
              type="monotone"
              dataKey="volume"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default GraficoVolumeReservatorio;