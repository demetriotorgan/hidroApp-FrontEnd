import React from "react";
import { Trash2 } from "lucide-react";

function CardResumoHidrometro({ id, data, horario, leitura, obs, onDelete }) {

  const dataFormatada = new Date(data).toLocaleDateString("pt-BR");

  const confirmarExclusao = () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este registro?");
    
    if (confirmar) {
      onDelete(id);
    }
  };

  return (
    <div className="card-hidrometro">

      <div className="card-header">
        <h3>Leitura do Hidrômetro</h3>

        <button
          className="btn-delete"
          onClick={confirmarExclusao}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <p><strong>Data:</strong> {dataFormatada}</p>
      <p><strong>Horário:</strong> {horario}</p>
      <p><strong>Leitura:</strong> {leitura}</p>
      <p><strong>Observação:</strong> {obs}</p>

    </div>
  );
}

export default CardResumoHidrometro;
