import React from 'react';
import { calcularAguaLavagem } from '../services/lavagemService';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const GraficoEficienciaDeLavagem = ({ registros }) => {

    const dados = [...calcularAguaLavagem(registros)].reverse();
    // console.log(dados.map(d => d.data));

    return (
        <div style={{ width: '100%'}}>
            <ResponsiveContainer width = '100%' height= {320} >
                <LineChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="data" />

                    <YAxis
                        yAxisId="left"
                        label={{ value: 'Litros', angle: -90, position: 'insideLeft' }}
                    />

                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{ value: 'L/kg', angle: 90, position: 'insideRight' }}
                    />

                    <Tooltip />

                    <Legend />

                    {/* 🔵 Total de água */}
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="totalAgua"
                        stroke="#007bff"
                        strokeWidth={2}
                        name="Total de Água (L)"
                    />

                    {/* 🟢 Eficiência */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="eficienciaTotal"
                        stroke="#28a745"
                        strokeWidth={2}
                        name="Eficiência (L/kg)"
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoEficienciaDeLavagem;