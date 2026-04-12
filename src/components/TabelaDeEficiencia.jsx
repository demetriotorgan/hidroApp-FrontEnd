import React from 'react';
import { gerarDadosTabelaEficiencia } from '../services/lavagemService';
import './TabelaDeEficiencia.css';

const TabelaDeEficiencia = ({ registros }) => {

    const dados = gerarDadosTabelaEficiencia(registros);

    return (
        <div className="tabela-container">
            <h2 className="titulo-tabela">Eficiência das Lavagens</h2>

            <table className="tabela">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Água Total (L)</th>
                        <th>Eficiência (L/kg)</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {dados.map((item, index) => (
                        <tr key={index}>
                            <td>{item.data}</td>
                            <td>{item.totalAgua}</td>
                            <td>{item.litrosPorKg}</td>
                            <td>
                                <span className={`badge ${item.indicador.toLowerCase()}`}>
                                    {item.indicador}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {dados.length === 0 && (
                <div className="vazio">Aguardando registros...</div>
            )}
        </div>
    );
};

export default TabelaDeEficiencia;