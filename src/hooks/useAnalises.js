// hooks/useAnalises.js
import { useEffect, useState } from "react";
import api from "../services/api";

export default function useAnalises() {
  const [analises, setAnalises] = useState([]);
  const [loading, setLoading] = useState(false);

  async function carregarAnalises() {
    const res = await api.get("/listarAnalisesComparativas");
    setAnalises(res.data.dados);
  }

  async function salvar(payload) {
    setLoading(true);
    await api.post("/saveAnaliseComparativa", payload);
    await carregarAnalises();
    setLoading(false);
  }

  async function remover(id) {
    const confirmar = window.confirm('Deseja excluir esta análise?');
    if (!confirmar) return
    try {
      await api.delete(`/deletarAnaliseComparativa/${id}`);
      setAnalises(prev => prev.filter(a => a._id !== id));
    } catch (error) {
      console.error('Erro ao excluir registro de análise: ', error)
    }
  };

  useEffect(() => {
    carregarAnalises();
  }, []);

  return {
    analises,
    salvar,
    remover,
    carregarAnalises,
    loading
  };
}