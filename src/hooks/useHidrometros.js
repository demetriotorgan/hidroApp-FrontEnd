import { useEffect, useState } from "react";
import api from "../services/api";

function useHidrometros() {

  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [excluindo, setExcluindo]= useState(false);


  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const res = await api.get("/listarHidrometro");
      setDados(res.data);
    } catch (err) {
      console.log(err);
      setErro(err);
    } finally {
      setLoading(false);
    }
  };

  const deletarHidrometro = async (id) => {
    try {
      setExcluindo(true);
      await api.delete(`/deletarHidrometro/${id}`);

      // Atualiza a lista sem recarregar a página
      setDados((prev) => prev.filter((item) => item._id !== id));

    } catch (error) {
      console.log(error);
    }finally{
      setExcluindo(false);
    }
  };

  return {
    dados,
    loading,
    erro,
    deletarHidrometro,
    excluindo,
    carregarDados
  };
}

export default useHidrometros;
