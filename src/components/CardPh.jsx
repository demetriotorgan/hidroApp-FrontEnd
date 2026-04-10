import React from 'react';
import './CardPh.css';
import {
    Droplets,
    Target,
    Beaker,
    FlaskConical,
    CalendarDays,
    Trash2
} from 'lucide-react';
import LoadingModal from './LoadingModal';

const CardPh = ({ registro, onDelete, deletando }) => {
    if (!registro) return null;

    const {
        _id,
        reservatorio,
        phAtual,
        phObjetivo,
        acido,
        data
    } = registro;

    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

    return (
        <>
            <LoadingModal
                isOpen={deletando}
                message="Deletando registro..."
            />
            <div className="card-ph-row">
                <div className="cell">
                    <div className="cell-info">
                        <Droplets size={16} />
                        <small>Reservatório</small>
                    </div>
                    <span>{reservatorio} L</span>
                </div>

                <div className="cell">
                    <div className="cell-info">
                        <Beaker size={16} />
                        <small>pH Atual</small>
                    </div>
                    <span>{phAtual}</span>
                </div>

                <div className="cell">
                    <div className="cell-info">
                        <Target size={16} />
                        <small>pH Objetivo</small>
                    </div>
                    <span>{phObjetivo}</span>
                </div>

                <div className="cell destaque">
                    <div className="cell-info">
                        <FlaskConical size={16} />
                        <small>Ácido</small>
                    </div>
                    <span>{Number(acido).toFixed(2)} g</span>
                </div>

                <div className="cell">
                    <div className="cell-info">
                        <CalendarDays size={16} />
                        <small>Data</small>
                    </div>
                    <span>{dataFormatada}</span>
                </div>

                <div className="cell actions">
                    <button
                        className="delete-btn"
                        onClick={() => onDelete(_id)}                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default CardPh;