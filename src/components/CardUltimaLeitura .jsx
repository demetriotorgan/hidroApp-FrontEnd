import React from 'react';
import './cardUltimaLeitura.css';
import { Calendar, Gauge, FileText, Trash2 } from 'lucide-react';
import { formatarData } from '../services/dataUtils';
import LoadingModal from './LoadingModal';
import { calcularDadosSanepar } from '../services/hidrometroService';

const CardUltimaLeitura = ({ dados, onDelete, excluindo, leituraAtual }) => {

 const { leituraAtual3, consumo } = calcularDadosSanepar(
  leituraAtual?.leitura,
  dados.leitura
);
  return (
    <>
      <LoadingModal
        isOpen={excluindo}
        message="Excluindo registro..."
      />

      <div className="card-ultima-leitura">
        <div className="header">
          <Gauge size={20} />
          <h2>Última Leitura</h2>
        </div>

        <div className="conteudo">

          {/* Linha da data + delete */}
          <div className="item linha-data">
            <div className="data-info">
              <Calendar size={16} />
              <span>{formatarData(dados.data)}</span>
            </div>

            <Trash2
              size={16}
              className="delete-icon"
              onClick={() => onDelete(dados._id)}
            />
          </div>

          <div className="item destaque">
            <span className="label">Leitura</span>
            <span className="valor">{dados.leitura} unid.</span>
          </div>

          {dados.obs && (
            <div className="item obs">
              <FileText size={16} />
              <span>{dados.obs}</span>
            </div>
          )}
          <div className="indicadores">

            <div className="indicador-box">
              <span className="indicador-label">Leitura Atual (unid.)</span>
              <span className="indicador-valor">{leituraAtual3 ?? '---'}</span>
            </div>

            <div className="indicador-box">
              <span className="indicador-label">Consumo do Período</span>
              <span className="indicador-valor">
                {consumo !== null ? `${consumo} m³` : '---'}
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CardUltimaLeitura;