import React from "react";
import "./consumoPeriodoCard.css";

function formatarData(dataISO) {
  if (!dataISO) return "";
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR");
}

const ConsumoPeriodoCard = ({ dados }) => {
  if (!dados) return null;

  return (
    <div className="card-consumo">
      <h3 className="card-title">Consumo no Período</h3>

      <div className="card-grid">
        <div className="card-item destaque">
          <span>Consumo (L)</span>
          <strong>{dados.consumoLitros}</strong>
        </div>

        <div className="card-item">
          <span>Consumo (Unid.)</span>
          <strong>{dados.consumoUnidades}</strong>
        </div>

        <div className="card-item">
          <span>Leitura Inicial</span>
          <strong>{dados.leituraInicial}</strong>
        </div>

        <div className="card-item">
          <span>Leitura Final</span>
          <strong>{dados.leituraFinal}</strong>
        </div>

        <div className="card-item">
          <span>Data Inicial</span>
          <strong>{formatarData(dados.dataInicial)}</strong>
        </div>

        <div className="card-item">
          <span>Data Final</span>
          <strong>{formatarData(dados.dataFinal)}</strong>
        </div>
      </div>
    </div>
  );
};

export default ConsumoPeriodoCard;