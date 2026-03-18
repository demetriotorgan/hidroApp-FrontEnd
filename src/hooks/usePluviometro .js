import { useState } from "react";
import api from "../services/api";

export const usePluviometro = () => {
    const [loading, setLoading] = useState(false);
    const [registros, setRegistros] = useState([]);
    const [loadingRegistros, setLoadingRegistros] = useState(false);


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

    // 🔹 GET
    const listarPluviometros = async () => {
        try {
            setLoadingRegistros(true);

            const response = await api.get("/listarPluviometros");

            setRegistros(response.data);

        } catch (error) {
            console.error(error.response?.data || error.message);
        } finally {
            setLoadingRegistros(false);
        }
    };

    // 🔹 DELETE
const deletarPluviometro = async (id) => {
  const confirmacao = window.confirm("Deseja realmente excluir este registro?");

  if (!confirmacao) return;

  try {
    await api.delete(`/deletarPluviometro/${id}`);

    // remove da lista local sem precisar novo GET
    setRegistros((prev) => prev.filter((item) => item._id !== id));

  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Erro ao excluir registro");
  }
};

    return {
        salvarPluviometro,
        listarPluviometros,
        deletarPluviometro,
        registros,
        loading,
        loadingRegistros
    };
};