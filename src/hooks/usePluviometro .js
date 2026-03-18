import { useState } from "react";
import api from "../services/api";

export const usePluviometro = () => {
  const [loading, setLoading] = useState(false);

  const salvarPluviometro = async (formData, onSuccess) => {
    if (formData.mm === "" || isNaN(formData.mm)) {
      alert("Preencha a altura da coluna para calcular a chuva.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        data: formData.data,
        coluna: Number(formData.coluna),
        mm: Number(formData.mm),
        obs: formData.obs
      };

      await api.post("/savePluviometro", payload);

      alert("Registro salvo com sucesso!");

      // callback para o componente decidir o que fazer
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao salvar registro");
    } finally {
      setLoading(false);
    }
  };

  return {
    salvarPluviometro,
    loading
  };
};