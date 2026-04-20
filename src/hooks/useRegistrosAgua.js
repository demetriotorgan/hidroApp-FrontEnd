import { useEffect, useState } from "react";
import api from "../services/api";

export default function useRegistrosAgua() {
  const [registrosDaAgua, setRegistrosDaAgua] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [deletando, setDeletando] = useState(false);

  // =============================
  // 🔄 CARREGAR REGISTROS
  // =============================
  const carregarRegistros = async () => {
    try {
      setCarregando(true);

      const res = await api.get("/listarIqa");

      // ordenar do mais recente
      const dadosOrdenados = res.data.sort(
        (a, b) => new Date(b.data) - new Date(a.data)
      );

      setRegistrosDaAgua(dadosOrdenados);
    } catch (err) {
      console.error("Erro ao carregar registros:", err);
    } finally {
      setCarregando(false);
    }
  };

  // =============================
  // ❌ DELETAR REGISTRO
  // =============================
  const deletarRegistro = async (id) => {
    try {
      const confirmar = window.confirm("Deseja realmente excluir?");
      if (!confirmar) return;

      setDeletando(true);
      await api.delete(`/deletarIqa/${id}`);

      // remove do state sem recarregar
      setRegistrosDaAgua((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }finally{
      setDeletando(false);
    }
  };

  // =============================
  // 🚀 AUTO LOAD
  // =============================
  useEffect(() => {
    carregarRegistros();
  }, []);

  return {
    registrosDaAgua,
    carregando,
    carregarRegistros,
    deletarRegistro,
    deletando
  };
}