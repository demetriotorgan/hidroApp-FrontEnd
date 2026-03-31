import { Trash2 } from "lucide-react";
import "./cardAnalise.css";

function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR");
}

function formatarNumero(valor, casas = 2) {
  return Number(valor).toFixed(casas);
}

export default function CardAnalise({ analise, onDelete }) {
  if (!analise) return null;

  const { periodo, consumoReal, modelo, comparacao, metadata } = analise;

  return (
    <div className="card-analise">

      {/* HEADER */}
      <div className="card-header">
        <h3>📊 Análise de Consumo</h3>
        <button className="btn-delete" onClick={() => onDelete(analise._id)}>
          <Trash2 size={18} />
        </button>
      </div>

      {/* PERÍODO */}
      <div className="secao">
        <h4>📅 Período</h4>
        <p><strong>Início:</strong> {formatarData(periodo.dataInicial)}</p>
        <p><strong>Fim:</strong> {formatarData(periodo.dataFinal)}</p>
        <p><strong>Dias:</strong> {periodo.quantidadeDias}</p>
      </div>

      {/* CONSUMO REAL */}
      <div className="secao">
        <h4>💧 Consumo Real</h4>
        <p><strong>Litros:</strong> {consumoReal.litros}</p>
        <p><strong>Unidades:</strong> {consumoReal.unidades}</p>
        <p><strong>Leitura:</strong> {consumoReal.leituraInicial} → {consumoReal.leituraFinal}</p>
      </div>

      {/* MODELO */}
      <div className="secao">
        <h4>🤖 Modelo</h4>
        <p><strong>Estimado:</strong> {formatarNumero(modelo.consumoEstimado)} L</p>
        <p><strong>Coeficiente:</strong> {formatarNumero(modelo.coeficiente)}</p>
        <p><strong>Custo:</strong> R$ {formatarNumero(modelo.custoEstimado)}</p>
        <p><strong>Confiabilidade:</strong> {modelo.confiabilidade}</p>
      </div>

      {/* COMPARAÇÃO (DESTAQUE) */}
      <div className="secao destaque">
        <h4>📊 Comparação</h4>
        <p><strong>Diferença:</strong> {formatarNumero(comparacao.diferenca)} L</p>
        <p><strong>Erro:</strong> {comparacao.erroPercentual}%</p>
        <p><strong>Acurácia:</strong> {comparacao.acuracia}%</p>
        <p><strong>Tendência:</strong> {comparacao.tendencia}</p>
        <p><strong>Classificação:</strong> {comparacao.classificacao}</p>
      </div>

      {/* METADATA */}
      <div className="secao">
        <h4>⚙️ Metadata</h4>
        <p><strong>Registros:</strong> {metadata.totalRegistros}</p>
        <p><strong>Versão:</strong> {metadata.versaoModelo}</p>
      </div>

    </div>
  );
}