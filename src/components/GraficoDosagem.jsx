import React from 'react';
import {
    BarChart3,
    Activity,
    TrendingUp,
    ShieldCheck,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';

import './GraficoDosagem.css';
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

import { analisarDosagem } from '../services/cloracaoUtils';

const GraficoDosagem = ({ registros }) => {

    const { dadosGrafico, analise } = analisarDosagem(registros);

    if (!dadosGrafico.length) {
        return <div>Aguardando dados de dosagem...</div>;
    }

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

                        <YAxis domain={[0.035, 0.045]} />

                        <Tooltip
                            formatter={(value) => value.toFixed(4)}
                            labelFormatter={(label) => `Registro ${label}`}
                        />

                        {/* Linha da média */}
                        <ReferenceLine
                            y={analise.media}
                            stroke="green"
                            strokeDasharray="5 5"
                            label="Média"
                        />

                        {/* Faixa ideal */}
                        <ReferenceLine y={0.02} stroke="orange" strokeDasharray="3 3" />
                        <ReferenceLine y={0.05} stroke="orange" strokeDasharray="3 3" />
                        <ReferenceLine
                            y={0.04}
                            stroke="blue"
                            strokeWidth={2}
                            label={{ value: "Dosagem constante (0.04)", position: "top" }}
                        />

                        <Line
                            type="monotone"
                            dataKey="dosagem"
                            stroke="#82ca9d"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* 📋 ANÁLISE */}
            <div className="painel-analise">

                <div className="analise-grid">

                    <div className="analise-item">
                        <BarChart3 size={18} className="analise-icon" />
                        <div className="analise-text">
                            <span className="analise-label">Média</span>
                            <span className="analise-value">{analise.media.toFixed(4)}</span>
                        </div>
                    </div>

                    <div className="analise-item">
                        <Activity size={18} className="analise-icon" />
                        <div className="analise-text">
                            <span className="analise-label">Desvio</span>
                            <span className="analise-value">{analise.desvio.toFixed(4)}</span>
                        </div>
                    </div>

                    <div className="analise-item">
                        <TrendingUp size={18} className="analise-icon" />
                        <div className="analise-text">
                            <span className="analise-label">Tendência</span>
                            <span className="analise-value">{analise.tendencia}</span>
                        </div>
                    </div>

                    <div className="analise-item">
                        <ShieldCheck size={18} className="analise-icon" />
                        <div className="analise-text">
                            <span className="analise-label">Consistência</span>
                            <span className="analise-value">{analise.consistencia}</span>
                        </div>
                    </div>

                    <div className="analise-item">
                        <CheckCircle size={18} className="analise-icon" />
                        <div className="analise-text">
                            <span className="analise-label">Nível</span>
                            <span className="analise-value">{analise.nivel}</span>
                        </div>
                    </div>

                    <div className="analise-item">
                        <AlertTriangle size={18} className="analise-icon" />
                        <div className="analise-text">
                            <span className="analise-label">Anomalias</span>
                            <span className="analise-value">
                                {analise.anomalias ? "Sim" : "Não"}
                            </span>
                        </div>
                    </div>

                </div>

                <div className="analise-conclusao">
                    <strong>Conclusão:</strong> {analise.conclusao}
                </div>

            </div>

        </div>
    );
};

export default GraficoDosagem;