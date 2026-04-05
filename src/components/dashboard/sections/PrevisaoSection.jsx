import {
    Activity,
    TrendingUp,
    CalendarDays,
    Droplets,
    Sigma,
    Gauge,
    Waves,
    ShieldCheck,
    AlertTriangle,
    Percent
} from 'lucide-react';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../DashboardCard';
import { usePrevisaoLeitura } from '../../../hooks/usePrevisaoLeitura';
import './previsaoSection.css';

const PrevisaoSection = () => {
    const navigate = useNavigate();
    const previsao = usePrevisaoLeitura();

    const isOk = previsao.status === "ok";

    return (
        <section className="dashboard-section">
            <h2>Previsão de Consumo <Activity /></h2>

            <div className="dashboard-cards">

                {/* 🔢 Leitura Prevista */}
                <DashboardCard title="Leitura Prevista">
                    <div className="card-content">
                        <TrendingUp size={20} />
                        <h2>{isOk ? previsao.leituraPrevista3 ?? '---' : '---'}</h2>
                    </div>
                </DashboardCard>

                {/* 🔢 Leitura Atual */}
                <DashboardCard title="Leitura Atual">
                    <div className="card-content">
                        <Gauge size={20} />
                        <h3>{isOk ? `${previsao.leituraAtual3} m³` : '---'}</h3>
                    </div>
                </DashboardCard>

                {/* 💧 Consumo Estimado */}
                <DashboardCard title="Consumo Estimado">
                    <div className="card-content">
                        <Droplets size={20} />
                        <h2>{isOk ? `${previsao.consumoPrevisto} m³` : '---'}</h2>
                    </div>
                </DashboardCard>

                {/* 💧 Consumo Real */}
                <DashboardCard title="Consumo Real">
                    <div className="card-content">
                        <Waves size={20} />
                        <h3>{isOk ? `${previsao.consumoReal} m³` : '---'}</h3>
                    </div>
                </DashboardCard>

                {/* 📅 Dias */}
                <DashboardCard title="Dias desde SANEPAR">
                    <div className="card-content">
                        <CalendarDays size={20} />
                        <h2>{isOk ? previsao.diasDesdeSanepar : '---'}</h2>
                    </div>
                </DashboardCard>

                {/* 📊 Coeficiente */}
                <DashboardCard title="Coeficiente A">
                    <div className="card-content">
                        <Sigma size={20} />
                        <h2>{isOk ? previsao.coeficienteA.toFixed(2) : '---'}</h2>
                    </div>
                </DashboardCard>

                {/* 🎯 Confiabilidade */}
                <DashboardCard title="Confiabilidade">
                    <div className="card-content">
                        <ShieldCheck size={20} />

                        {isOk ? (
                            <span
                                className="badge-status"
                                style={{ backgroundColor: previsao.cor }}
                            >
                                {previsao.nivel}
                            </span>
                        ) : (
                            <span className="badge-status badge-neutral">
                                {previsao.mensagem || '---'}
                            </span>
                        )}
                    </div>
                </DashboardCard>

                {/* ⚠️ Erro Absoluto */}
                <DashboardCard title="Erro Absoluto">
                    <div className="card-content">
                        <AlertTriangle size={20} />
                        <h3>{isOk ? `${previsao.erroAbsoluto} m³` : '---'}</h3>
                    </div>
                </DashboardCard>

                {/* 📊 Erro Percentual */}
                <DashboardCard title="Erro Percentual">
                    <div className="card-content">
                        <Percent size={20} />
                        <h3>
                            {isOk && previsao.erroPercentual !== null
                                ? `${previsao.erroPercentual.toFixed(1)}%`
                                : '---'}
                        </h3>
                    </div>
                </DashboardCard>

                {/* 🔘 Botão */}
                <button
                    className="dashboard-button"
                    onClick={() => navigate("/previsao")}
                >
                    <TrendingUp size={18} />
                    Ver Modelo
                </button>

            </div>
        </section>
    );
};

export default PrevisaoSection;