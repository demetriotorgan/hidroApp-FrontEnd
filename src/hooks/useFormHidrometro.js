import { useState } from "react";
import api from "../services/api";
import { getDataAtual, getHoraAtual } from "../services/dataUtils";



function useFormHidrometro(atualizarLista) {

  const [form, setForm] = useState({
    data: getDataAtual(),
    horario: getHoraAtual(),
    leitura: "",
    obs: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post("/saveHidrometro", form);
        await atualizarLista();
      alert("Registro salvo!");

      setForm({
        data: "",
        horario: "",
        leitura: "",
        obs: ""
      });

    } catch (error) {

      console.error("Erro ao salvar:", error);

    } finally {

      setLoading(false);

    }

  }

  return {
    form,
    handleChange,
    handleSubmit,
    loading
  };

}

export default useFormHidrometro;
