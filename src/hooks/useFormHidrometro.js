import { useState } from "react";
import api from "../services/api";

function getDataAtual() {
  const agora = new Date();

  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

function getHoraAtual() {
  const agora = new Date();
  return agora.toTimeString().slice(0,5);
}


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
