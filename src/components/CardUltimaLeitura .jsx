import React from 'react';
import './cardUltimaLeitura.css';
import { Calendar, Gauge, FileText, Trash2 } from 'lucide-react';
import { formatarData } from '../services/dataUtils';
import LoadingModal from './LoadingModal';

const CardUltimaLeitura = ({ dados, onDelete, excluindo }) => { 

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
      </div>
    </div>
    </>
  );
};

export default CardUltimaLeitura;