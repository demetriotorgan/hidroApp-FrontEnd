import { useEffect, useState } from "react";
import api from "../services/api";

export default function useRegistrosAgua() {
  const [registrosDaAgua, setRegistrosDaAgua] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // =============================
  // 🔄 CARREGAR REGISTROS
  // =============================
  const carregarRegistros = async () => {
    try {
      setCarregando(true);

      const res = await api.get("/listarTambores");

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

      await api.delete(`/deletarTambor/${id}`);

      // remove do state sem recarregar
      setRegistrosDaAgua((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error("Erro ao deletar:", err);
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
  };
}