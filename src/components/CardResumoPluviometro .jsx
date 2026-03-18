import React from "react";
import { Trash2 } from "lucide-react";

const CardResumoPluviometro = ({ id, data, coluna, mm, obs, onDelete }) => {

  // formata data para pt-BR
  const formatarData = (dataISO) => {
  if (!dataISO) return "";

  return new Date(dataISO).toLocaleDateString("pt-BR", {
    timeZone: "UTC"
  });
};

  return (
    <div className="card-hidrometro">
      <div className="card-header">
        <strong>{formatarData(data)}</strong>

        {onDelete && (
          <button
            className="btn-delete"
            onClick={() => onDelete(id)}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <p><strong>Coluna:</strong> {coluna} cm</p>
      <p><strong>Chuva:</strong> {mm} mm</p>

      {obs && (
        <p><strong>Obs:</strong> {obs}</p>
      )}
    </div>
  );
};

export default CardResumoPluviometro;