import React from "react";
import "./TabelaHidrometro.css";

const TabelaHidrometro = ({ dados }) => {
  if (!dados || dados.length === 0) {
    return <p className="tabela-vazia">Sem registros para exibir.</p>;
  }

  return (
    <div className="tabela-container">
      <table className="tabela-hidrometro">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Consumo (Litros)</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr key={index}>
              <td>{item.dia}</td>
              <td>
                {item.consumo === null ? "—" : item.consumo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaHidrometro;