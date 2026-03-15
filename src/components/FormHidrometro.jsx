import { useState } from "react";
import { Save } from "lucide-react";
import api from "../services/api";
import useFormHidrometro from "../hooks/useFormHidrometro";
import LoadingModal from "./LoadingModal";

function FormHidrometro({atualizarLista }) {
const {
    form,
    handleChange,
    handleSubmit,
    loading
  } = useFormHidrometro(atualizarLista );

  return (
    <>
      <LoadingModal
        isOpen={loading}
        message="Salvando Registro..."
      />
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Data</label>
        <input
          className="form-input"
          type="date"
          name="data"
          value={form.data || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Horário</label>
        <input
          className="form-input"
          type="time"
          name="horario"
          value={form.horario || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Leitura</label>
        <input
          className="form-input"
          type="number"
          name="leitura"
          value={form.leitura || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Observação</label>
        <textarea
          className="form-textarea"
          name="obs"
          value={form.obs || ""}
          onChange={handleChange}
        />
      </div>

      <button className="form-button" type="submit">
        <Save size={18}/>
        Salvar Registro
      </button>

    </form>
    </>
  );
}

export default FormHidrometro;
