import React from "react";
import useAnaliseCiclo from "../hooks/useAnaliseCiclo";
import useHidrometros from "../hooks/useHidrometros";
import "./CicloMensalPanel.css";
import GraficoPrevisoes from "../components/GraficoPrevisoes";
import GraficoErro from "../components/GraficoErro";

export default function CicloMensalPanel({
    dataInicial,
    dataFinal,
    leituraInicial,
    leituraFinal
}) {
    const {
        status,
        resultado,
        previsoesFiltradas,
        comparacoesFiltradas,
        coeficienteSugerido,
        loading
    } = useAnaliseCiclo({
        dataInicial,
        dataFinal,
        leituraInicial,
        leituraFinal
    });

    // 🔹 Estados visuais
    if (loading) {
        return <div className="ciclo-loading">Carregando análise do ciclo...</div>;
    }

    if (status === "aguardando novo ciclo") {
        return (
            <div className="ciclo-empty">
                Aguardando dados suficientes para análise...
            </div>
        );
    }

    if (!resultado) {
        return <div className="ciclo-empty">Nenhum dado disponível</div>;
    }

    const {
        consumoReal,
        consumoPrevisto,
        erroPercentualReal,
        tendencia,
        metricas
    } = resultado;

    const acuracia = 100 - Math.abs(erroPercentualReal);

    const tipoErro =
        Math.abs(erroPercentualReal) < 5
            ? "positivo"
            : Math.abs(erroPercentualReal) < 10
                ? "neutro"
                : "negativo";

    const classeTendencia =
        tendencia === "superestimando"
            ? "tendencia-positiva"
            : tendencia === "subestimando"
                ? "tendencia-negativa"
                : "tendencia-neutra";

    const gerarInsight = () => {
        if (Math.abs(erroPercentualReal) < 5) {
            return "Modelo muito preciso neste ciclo.";
        }
        if (erroPercentualReal > 10) {
            return "Modelo está superestimando consumo.";
        }
        if (erroPercentualReal < -10) {
            return "Modelo está subestimando consumo.";
        }
        if (Math.abs(metricas.RMSE) > Math.abs(metricas.MAE) * 1.5) {
            return "Alta variabilidade nas previsões.";
        }
        return "Modelo com comportamento estável.";
    };

    // 🔹 ERRO CONTINUA APENAS PARA O GRÁFICO 2
    const dadosErro = comparacoesFiltradas.map(item => ({
        data: item.periodo.dataFinal,
        erro: item.erro,
        erroPercentual: item.erroPercentual
    }));

    return (
        <div className="ciclo-container">
            <h2 className="ciclo-title">Análise do Ciclo Mensal</h2>

            {/* 🔹 Cards resumo */}
            <div className="ciclo-section ciclo-cards">
                <Card title="Consumo Real" value={consumoReal} />
                <Card title="Consumo Previsto" value={consumoPrevisto} />
                <Card
                    title="Erro (%)"
                    value={erroPercentualReal.toFixed(2) + "%"}
                    tipo={tipoErro}
                />
                <Card
                    title="Acurácia"
                    value={acuracia.toFixed(2) + "%"}
                    tipo={tipoErro}
                />
            </div>

            {/* 🔹 Métricas */}
            <div className="ciclo-section ciclo-cards">
                <Card title="MAE" value={metricas.MAE.toFixed(2)} />
                <Card title="RMSE" value={metricas.RMSE.toFixed(2)} />
                <Card title="MAPE" value={metricas.MAPE.toFixed(2) + "%"} />
                <Card title="BIAS" value={metricas.BIAS.toFixed(2)} />
            </div>

            {/* 🔹 Tendência */}
            <div className="ciclo-section">
                <div className={`ciclo-tendencia ${classeTendencia}`}>
                    Tendência: {tendencia}
                </div>
            </div>

            {/* 🔹 Insight */}
            <div className="ciclo-section ciclo-insight">
                <strong>Insight:</strong> {gerarInsight()}
            </div>

            {/* 🔹 Ajuste coeficiente */}
            {coeficienteSugerido && (
                <div className="ciclo-section ciclo-ajuste">
                    <strong>Novo coeficiente A sugerido:</strong>{" "}
                    {coeficienteSugerido.novoCoeficienteA.toFixed(3)}
                </div>
            )}

            {/* 🔹 GRÁFICO 1 (SIMPLIFICADO NOVAMENTE) */}
            <div className="ciclo-section">
                <h3>Evolução das previsões</h3>
                <div className="ciclo-grafico">
                    <GraficoPrevisoes data={previsoesFiltradas} />
                </div>
            </div>

            {/* 🔹 GRÁFICO 2 */}
            <div className="ciclo-section">
                <h3>Erro por janela</h3>
                <div className="ciclo-grafico">
                    <GraficoErro data={dadosErro} />
                </div>
            </div>
        </div>
    );
};

function Card({ title, value, tipo = "neutro" }) {
    return (
        <div className={`ciclo-card card-${tipo}`}>
            <div className="ciclo-card-title">{title}</div>
            <div className="ciclo-card-value">{value}</div>
        </div>
    );
}