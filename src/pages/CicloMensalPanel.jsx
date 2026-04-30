/**
 * 🪟 VITRINE DO CICLO
 *
 * Responsável por:
 * - receber produto pronto
 * - exibir dados visuais do ciclo
 * - renderizar cards e blocos visuais
 *
 * NÃO é responsabilidade:
 * - processar dados
 * - montar gráficos
 * - calcular métricas
 * - interpretar regra
 */

import React from "react";
import usePainelCiclo from "../hooks/usePainelCiclo";
import useGraficoCiclo from "../hooks/useGraficoCiclo";

import "./CicloMensalPanel.css";
import GraficoPrevisoes from "../components/GraficoPrevisoes";
import GraficoErro from "../components/GraficoErro";

export default function CicloMensalPanel({produto, graficos, loading}) {
  if (loading) {
    return (
      <div className="ciclo-loading">
        Carregando análise do ciclo...
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="ciclo-empty">
        Nenhuma análise de ciclo disponível.
      </div>
    );
  }

  const classeTendencia =
    produto?.tendencia === "superestimando"
      ? "tendencia-alerta"
      : produto?.tendencia === "subestimando"
      ? "tendencia-atencao"
      : "tendencia-ok";

  const insight =
    produto?.tendencia === "superestimando"
      ? "O modelo está prevendo acima do consumo real. Considere reduzir o coeficiente."
      : produto?.tendencia === "subestimando"
      ? "O modelo está prevendo abaixo do consumo real. Considere aumentar o coeficiente."
      : "O modelo está operando dentro de uma faixa estável.";

  const formatarData = (data) => {
    if (!data) return "--";
    return new Date(data).toLocaleDateString("pt-BR");
  };  
  
  return (
    <div className="ciclo-container">
      <h2 className="ciclo-title">Análise do Ciclo Mensal</h2>

      {/* 🔹 CICLO */}
      <div className="ciclo-section ciclo-cards">
        <Card title="Data Inicial" value={formatarData(produto?.ciclo?.dataInicial)} />
        <Card title="Data Final" value={formatarData(produto?.ciclo?.dataFinal)} />
      </div>

       {/* 🔹 COEFICIENTE */}
      <div className="ciclo-section ciclo-cards">
        <Card title="Anterior" value={produto?.coeficiente?.anterior?.toFixed(2) ?? "--"} />
        <Card title="Sugerido" value={produto?.coeficiente?.sugerido?.toFixed(2) ?? "--"} />
      </div>

      {/* 🔹 CONSUMO */}
      <div className="ciclo-section ciclo-cards">
        <Card title="Real" value={produto?.consumo?.real?.toFixed(2) ?? "--"} />
        <Card title="Previsto" value={produto?.consumo?.previsto?.toFixed(2) ?? "--"} />
        <Card title="Erro" value={produto?.consumo?.erro?.toFixed(2) ?? "--"} />
        <Card
          title="Erro (%)"
          value={
            produto?.consumo?.erroPercentual != null
              ? `${produto.consumo.erroPercentual.toFixed(2)}%`
              : "--"
          }
        />
      </div>      

       {/* 🔹 MÉTRICAS */}
      <div className="ciclo-section ciclo-cards">
        <Card title="MAE" value={produto?.metricas?.MAE?.toFixed(2) ?? "-"} />
        <Card title="RMSE" value={produto?.metricas?.RMSE?.toFixed(2) ?? "-"} />
        <Card title="MAPE" value={produto?.metricas?.MAPE?.toFixed(2) ?? "-"} />
        <Card title="BIAS" value={produto?.metricas?.BIAS?.toFixed(2) ?? "-"} />
      </div>

      {/* 🔹 TENDÊNCIA */}
      <div className="ciclo-section">
        <div className={`ciclo-tendencia ${classeTendencia}`}>
          Tendência: {produto?.tendencia ?? "--"}
        </div>
      </div>

       {/* 🔹 INSIGHT */}
      <div className="ciclo-section ciclo-insight">
        <strong>Insight:</strong> {insight}
      </div>

      {/* 🔹 GRÁFICOS */}
      <div className="ciclo-section">
        <h3>Evolução das previsões</h3>
        <div className="ciclo-grafico">
          <GraficoPrevisoes data={graficos.previsoes} />
        </div>
      </div>

      <div className="ciclo-section">
        <h3>Erro por janela</h3>
        <div className="ciclo-grafico">
          <GraficoErro data={graficos.erros} />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="ciclo-card">
      <div className="ciclo-card-title">{title}</div>
      <div className="ciclo-card-value">{value}</div>
    </div>
  );
}