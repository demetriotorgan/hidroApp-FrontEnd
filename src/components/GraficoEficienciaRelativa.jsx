import React from 'react';
import { gerarDadosGraficoEficiencia } from '../services/lavagemService';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';

const GraficoEficienciaRelativa = ({ registros }) => {

    const dadosBrutos = gerarDadosGraficoEficiencia(registros);
    // ordena corretamente (antigo → recente)
const dadosOrdenados = [...dadosBrutos].reverse();

    // 🔥 recria o índice correto
const dados = dadosOrdenados.map((item, index) => ({
    ...item,
    lavagem: index + 1
}));

    return (
        <div style={{ width: '100%'}}>
            <ResponsiveContainer width="100%" height="320">
                <LineChart data={dados}>
                    
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* 🔹 Eixo X */}
                    <XAxis 
                        dataKey="lavagem"
                        label={{ value: 'Lavagens', position: 'insideBottom', offset: -5 }}
                    />

                    {/* 🔹 Eixo Y */}
                    <YAxis 
                        domain={[0.8, 2]} 
                        label={{ value: 'Eficiência Relativa', angle: -90, position: 'insideLeft' }}
                    />

                    <Tooltip />

                    {/* 🔵 Linha de eficiência */}
                     <Line
                        type="monotone"
                        dataKey="eficiencia"
                        stroke="#1976d2"
                        strokeWidth={3}
                        name="Eficiência Relativa"
                    />

                    {/* 🟢 FAIXA IDEAL */}
                    <ReferenceLine y={1.1} stroke="green" strokeDasharray="5 5" label="Ideal" />
                    <ReferenceLine y={1.6} stroke="orange" strokeDasharray="5 5" label="Limite" />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoEficienciaRelativa;