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
    Percent,
    SaveAll
} from 'lucide-react';

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../DashboardCard';
import { usePrevisaoLeitura } from '../../../hooks/usePrevisaoLeitura';
import './previsaoSection.css';
import { gerarPayloadDados } from '../../../hooks/useLaboratorioML/utilsML/gerarPayloadDados';
import useSalvarDadosML from '../../../hooks/useLaboratorioML/hooksML/useSalvarDadosML';
import useBuscarDadosML from '../../../hooks/useLaboratorioML/hooksML/useBuscarDadosML';
import { gerarDadosGraficoErroAbsoluto } from '../../../hooks/useLaboratorioML/utilsML/gerarDadosGraficoErroAbsoluto';
import GraficoErroAbsoluto from '../../../hooks/useLaboratorioML/graficos/GraficoErroAbsoluto';

const PrevisaoSection = () => {
    //states para salvar dados de ML
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    //configurações do Componente
    const navigate = useNavigate();
    const previsao = usePrevisaoLeitura();
    const isOk = previsao.status === "ok";

    //Buscar dados de ML
    const { dadosML, carregandoML, carregarDadosML } = useBuscarDadosML();
    //Gerando dados do grafico erro absoluto
    const dadosErroAbsoluto = useMemo(
        () => gerarDadosGraficoErroAbsoluto(dadosML),
        [dadosML]
    );

    //salvar dados de ML
    const { salvarDadosML, salvando } = useSalvarDadosML(previsao);

    async function handleSalvarDados() {
        const resultado = await salvarDadosML();
        setMensagem(resultado.mensagem);
        setTipoMensagem(resultado.sucesso ? "sucesso" : "erro");
    };

    console.log('Dados de ML:', dadosML);

    return (
        <section className="dashboard-section">
            <h2>Previsão de Consumo <Activity /></h2>

            <div className="dashboard-cards">

                {/* 🔢 Leitura Prevista */}
                <DashboardCard title="Leitura Prevista Atual">
                    <div className="card-content">
                        <TrendingUp size={20} />
                        <h2>
                            {isOk && !isNaN(previsao.leituraPrevista3)
                                ? previsao.leituraPrevista3
                                : '---'}
                        </h2>
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

                <DashboardCard title="Previsão da Leitura Mensal">
                    <div className="card-content">
                        <TrendingUp size={20} />
                        <h2>
                            {isOk && previsao.previsaoFatura?.status === "ok"
                                ? `${previsao.previsaoFatura.leituraPrevistaFatura} m³`
                                : '---'}
                        </h2>
                    </div>
                </DashboardCard>

                <DashboardCard title="Consumo Previsto da Fatura Mensal">
                    <div className="card-content">
                        <Droplets size={20} />
                        <h3>
                            {isOk && previsao.previsaoFatura?.status === "ok"
                                ? `${previsao.previsaoFatura.consumoM3Fatura} m³`
                                : '---'}
                        </h3>
                    </div>
                </DashboardCard>

                <DashboardCard title="Fatura Mensal Prevista Corrigida">
                    <div className="card-content">
                        <TrendingUp size={20} />
                        <h2>
                            {isOk && previsao.previsaoFaturaAjustada?.status === "ok"
                                ? `${previsao.previsaoFaturaAjustada.leituraCorrigida} m³`
                                : '---'}
                        </h2>
                    </div>
                </DashboardCard>
            </div>
            <div className='painel-botoes'>
                {/* 🔘 Botão */}
                <button
                    className="dashboard-button"
                    onClick={() => navigate("/previsao")}
                >
                    <TrendingUp size={18} />
                    Ver Modelo
                </button>
                <button
                    className="dashboard-button salvar-dados-ml"
                    onClick={handleSalvarDados}
                    disabled={salvando}
                >
                    <SaveAll size={18} />
                    {salvando ? 'Salvando...' : 'Salvar Dados'}
                </button>
            </div>
            {mensagem && (
                <div className={`mensagem ${tipoMensagem}`}>
                    {mensagem}
                </div>
            )}

            <div className="container-grafico-ml">
                {carregandoML ? (
                    <div className="loading-grafico">
                        Carregando gráfico...
                    </div>
                ) : (
                    <div className="grafico-wrapper">
                        <GraficoErroAbsoluto dados={dadosErroAbsoluto} />
                    </div>
                )}
            </div>
        </section>
    );
};

export default PrevisaoSection;