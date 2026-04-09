import React from 'react';
import { Trash2 } from 'lucide-react';
import './CloracaoCard.css';

function CloracaoCard({ registro, onDelete }) {
    const {
        _id,
        reservatorio,
        concentracao,
        produto,
        estoque,
        data,
        utilizado
    } = registro;

    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

    function handleDelete() {       
        onDelete(_id);
    }

    return (
        <div className="cloracao-card">
            <div className="card-header">
                <h4>Cloração</h4>
                <span className={`badge ${utilizado}`}>
                    {utilizado}
                </span>
            </div>

            <div className="card-body">
                <div className="info">
                    <span>💧 Reservatório</span>
                    <strong>{reservatorio} L</strong>
                </div>

                <div className="info">
                    <span>🧪 Concentração</span>
                    <strong>{concentracao} mg/L</strong>
                </div>

                <div className="info">
                    <span>⚗️ Produto</span>
                    <strong>{produto} g</strong>
                </div>

                <div className="info">
                    <span>🧴 Estoque</span>
                    <strong>{estoque} L</strong>
                </div>
            </div>

            <div className="card-footer">
                <span>📅 {dataFormatada}</span>

                <button className="delete-button" onClick={handleDelete}>
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}

export default CloracaoCard;