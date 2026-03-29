import { Trash2 } from "lucide-react";
import "./estimativaCard.css";
import { formatarData, formatarMoeda } from "../services/formatters";

export default function EstimativaCard({ estimativa, onDelete  }) {
  const { modelo, previsao, custo, dataCriacao, _id } = estimativa;
  
  return (
    <div className="estimativa-card">      
      {/* HEADER */}
      <div className="card-header">
        <span>📅 {formatarData(dataCriacao)}</span>
         <button className="delete-btn" onClick={()=> onDelete(_id)}>
          <Trash2 size={16} />
        </button>
      </div>

      {/* MODELO */}
      <div className="card-section">
        <h3>Modelo</h3>
        <div className="grid">
          <span>Dias: <strong>{modelo.diasEstimados}</strong></span>
          <span>Coef: <strong>{modelo.coeficienteA.toFixed(2)}</strong></span>
          <span>Conf: <strong className={`tag ${modelo.cor}`}>{modelo.confiabilidade}</strong></span>
          <span>Registros: <strong>{modelo.quantidadeRegistros}</strong></span>
        </div>
      </div>

      {/* PREVISÃO */}
      <div className="card-section">
        <h3>Previsão</h3>
        <div className="grid">
          <span>Litros: <strong>{previsao.consumoLitros.toFixed(0)} L</strong></span>
          <span>m³: <strong>{previsao.consumoM3.toFixed(3)}</strong></span>
        </div>
      </div>

      {/* CUSTO */}
      <div className="card-section">
        <h3>Custo</h3>
        <div className="grid">
          <span>Água: <strong>{formatarMoeda(custo.agua)}</strong></span>
          <span>Esgoto: <strong>{formatarMoeda(custo.esgoto)}</strong></span>
          <span>Total: <strong className="total">{formatarMoeda(custo.total)}</strong></span>
        </div>

        {/* DETALHAMENTO */}
        <div className="detalhamento">
          {custo.detalhamento.map((item, index) => (
            <div key={index} className="detalhe-item">
              <span>{item.faixa}</span>
              <span>{item.volumeM3.toFixed(2)} m³</span>
              <span>{formatarMoeda(item.total)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}