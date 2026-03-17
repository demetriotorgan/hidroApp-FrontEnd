import React from "react";
import "./TabelaHidrometro.css";
import { formatarDataSemFuso } from "../services/hidrometroService";

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
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr key={index}>
              <td>{item.dia}</td>
              <td>
                {item.consumo === null ? "—" : item.consumo}
              </td>
              <td>{formatarDataSemFuso(item.data)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaHidrometro;