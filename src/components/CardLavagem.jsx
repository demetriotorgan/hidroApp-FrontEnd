import React from 'react';
import './cardLavagem.css';
import { formatarData } from '../services/dataUtils';

import {
    Calendar,
    Weight,
    Droplets,
    Waves,
    Settings,
    ClipboardList,
    Trash2
} from 'lucide-react';
import LoadingModal from './LoadingModal';

const CardLavagem = ({ lavagem, onDelete, excluindo }) => {

    return (
        <>
            <LoadingModal
                isOpen={excluindo}
                message="Deletando Registro..."/>

            <div className="card-lavagem">
                <div className="card-header">
                    <div className="card-header-left">
                        <Calendar size={18} />
                        <h3>{formatarData(lavagem.data)}</h3>
                    </div>

                    <button
                        className="card-delete-btn"
                        onClick={() => onDelete && onDelete(lavagem._id)}
                        title="Excluir registro"
                    >
                        <Trash2 size={16} />
                    </button>

                </div>

                <p className="card-obs">
                    <ClipboardList size={16} />
                    {lavagem.obs || 'Sem observações'}
                </p>

                <div className="card-grid">

                    <div className="card-item">
                        <Weight size={16} />
                        <small>Peso</small>
                        <span>{lavagem.pesoRoupas} kg</span>
                    </div>

                    <div className="card-item">
                        <Settings size={16} />
                        <small>Tipo de Lavagem</small>
                        <span>{lavagem.tipoLavagem}</span>
                    </div>

                    <div className="card-item">
                        <Waves size={16} />
                        <small>Nível</small>
                        <span>{lavagem.nivelMaquina}</span>
                    </div>

                    <div className="card-item">
                        <Settings size={16} />
                        <small>Modo</small>
                        <span>{lavagem.modoLavagem}</span>
                    </div>

                    <div className="card-item">
                        <Droplets size={16} />
                        <small>Sabão</small>
                        <span>{lavagem.sabao} g</span>
                    </div>

                    <div className="card-item">
                        <Droplets size={16} />
                        <small>Amaciante</small>
                        <span>{lavagem.amaciante} ml</span>
                    </div>

                    <div className="card-item">
                        <Waves size={16} />
                        <small>Enchague</small>
                        <span>{lavagem.enchague}L</span>
                    </div>

                </div>

            </div>
        </>
    );
};

export default CardLavagem;