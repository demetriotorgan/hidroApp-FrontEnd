import React from 'react';
import { calcularAguaLavagem } from '../services/lavagemService';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';



const GraficoAguaDeLavagem = ({ registros }) => {
// console.log("📥 registros recebidos:", registros);

    const dados = [...calcularAguaLavagem(registros).reverse()];
// console.log("📊 dados processados:", dados);
    return (
        <div style={{ width: '100%'}}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3" />
                    
                    <XAxis dataKey="data" />
                    
                    <YAxis />
                    
                    <Tooltip />
                    
                    <Line
                        type="monotone"
                        dataKey="totalAgua"
                        stroke="#007bff"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoAguaDeLavagem;