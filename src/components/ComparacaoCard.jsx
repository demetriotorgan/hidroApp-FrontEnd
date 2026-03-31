import React from "react";
import "./comparacaoCard.css";

const ComparacaoCard = ({ dados }) => {
  if (!dados) return null;

  const { real, estimado, diferenca, erroPercentual } = dados;

  const isPositivo = diferenca >= 0;

  return (
    <div className="card-comparacao">
      <h3 className="card-title">Comparação Real vs Estimado</h3>

      <div className="card-grid">
        <div className="card-item">
          <span>Consumo Real (L)</span>
          <strong>{real}</strong>
        </div>

        <div className="card-item">
          <span>Estimado (L)</span>
          <strong>{estimado.toFixed(2)}</strong>
        </div>

        <div className={`card-item destaque ${isPositivo ? "positivo" : "negativo"}`}>
          <span>Diferença</span>
          <strong>{diferenca.toFixed(2)}</strong>
        </div>

        <div className="card-item">
          <span>Erro (%)</span>
          <strong>{erroPercentual.toFixed(2)}%</strong>
        </div>
      </div>
    </div>
  );
};

export default ComparacaoCard;