import React from "react";
import "./qualidadeModeloCard.css";

function classificarQualidade(erro) {
  const erroAbs = Math.abs(erro);

  if (erroAbs <= 5) return { label: "Excelente", classe: "excelente" };
  if (erroAbs <= 10) return { label: "Boa", classe: "boa" };
  if (erroAbs <= 20) return { label: "Regular", classe: "regular" };
  return { label: "Ruim", classe: "ruim" };
}

function calcularAcuracia(erro) {
  const erroAbs = Math.abs(erro);
  const acuracia = Math.max(0, 100 - erroAbs);
  return acuracia.toFixed(2);
}

const QualidadeModeloCard = ({ dados }) => {
  if (!dados) return null;

  const { erroPercentual, diferenca } = dados;

  const qualidade = classificarQualidade(erroPercentual);
  const acuracia = calcularAcuracia(erroPercentual);

  const tendencia =
    diferenca > 0
      ? "Superestimando"
      : diferenca < 0
      ? "Subestimando"
      : "Preciso";

  return (
    <div className="card-qualidade">
      <h3 className="card-title">Qualidade do Modelo</h3>

      <div className="card-grid">
        <div className={`card-item destaque ${qualidade.classe}`}>
          <span>Classificação</span>
          <strong>{qualidade.label}</strong>
        </div>

        <div className="card-item">
          <span>Acurácia (%)</span>
          <strong>{acuracia}%</strong>
        </div>

        <div className="card-item">
          <span>Erro (%)</span>
          <strong>{erroPercentual.toFixed(2)}%</strong>
        </div>

        <div className="card-item">
          <span>Tendência</span>
          <strong>{tendencia}</strong>
        </div>
      </div>
    </div>
  );
};

export default QualidadeModeloCard;