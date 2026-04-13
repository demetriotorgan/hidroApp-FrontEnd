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
      

      
        <label>Horário</label>
        <input
          className="form-input"
          type="time"
          name="horario"
          value={form.horario || ""}
          onChange={handleChange}
        />
      

      
        <label>Leitura</label>
        <input
          className="form-input"
          type="number"
          name="leitura"
          value={form.leitura || ""}
          onChange={handleChange}
        />
      

      
        <label>Observação</label>
        <textarea
          className="form-textarea"
          name="obs"
          value={form.obs || ""}
          onChange={handleChange}
        />
      

      <button className="form-button" type="submit">
        <Save size={18}/>
        Salvar Registro
      </button>
</div>
    </form>
    </>
  );
}

export default FormHidrometro;
