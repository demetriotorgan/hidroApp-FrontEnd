import React from 'react';
import './RegraDeEficiencia.css';

const RegraDeEficiencia = () => {
    return (
        <div className="regra-container">
            <h2 className="regra-titulo">Como interpretar a eficiência</h2>

            <p className="regra-descricao">
                A eficiência é calculada com base na quantidade de água utilizada por quilo de roupa (L/kg).
                Quanto menor o valor, mais eficiente é a lavagem.
            </p>

            <table className="regra-tabela">
                <thead>
                    <tr>
                        <th>Faixa (L/kg)</th>
                        <th>Classificação</th>
                        <th>Interpretação</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>≤ 60</td>
                        <td>
                            <span className="badge boa">BOA</span>
                        </td>
                        <td>Uso eficiente da água</td>
                    </tr>

                    <tr>
                        <td>61 – 90</td>
                        <td>
                            <span className="badge media">MÉDIA</span>
                        </td>
                        <td>Consumo moderado, pode melhorar</td>
                    </tr>

                    <tr>
                        <td>&gt; 90</td>
                        <td>
                            <span className="badge ruim">RUIM</span>
                        </td>
                        <td>Alto consumo de água para pouca carga</td>
                    </tr>
                </tbody>
            </table>

            <div className="regra-dica">
                💡 Dica: eficiência não é usar pouca água, e sim usar bem a água em relação à quantidade de roupa.
            </div>
        </div>
    );
};

export default RegraDeEficiencia;