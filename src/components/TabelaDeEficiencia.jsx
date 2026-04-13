import React from 'react';
import { gerarDadosTabelaEficiencia } from '../services/lavagemService';
import CardEficienciaLavagem from './CardEficienciaLavagem ';
import './TabelaDeEficiencia.css';

const TabelaDeEficiencia = ({ registros }) => {

    const dados = gerarDadosTabelaEficiencia(registros);

    return (
        <div className="tabela-container">

            <h2 className="titulo-tabela">Eficiência das Lavagens</h2>

            {dados.length === 0 ? (
                <div className="vazio">Aguardando registros...</div>
            ) : (
                <div className="cards-container">
                    {dados.map((item, index) => (
                        <CardEficienciaLavagem key={index} item={item} />
                    ))}
                </div>
            )}

        </div>
    );
};

export default TabelaDeEficiencia;