import { useCallback, useState } from "react";
import api from "../services/api";

export default function useEstimativasSalvas() {
    const [estimativas, setEstimativas] = useState([]);
    const [carregandoEstimativas, setCarregandoEstimativas] = useState(false);

    function removerEstimativa(id) {
        setEstimativas((prev) => prev.filter((e) => e._id !== id));
    }


    const buscar = useCallback(async () => {
        try {
            setCarregandoEstimativas(true);
            const res = await api.get("/listarEstimativas");
            setEstimativas(res.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        } finally {
            setCarregandoEstimativas(false);
        }
    }, []);

    async function deletarEstimativa(id) {
        const confirmar = window.confirm("Deseja excluir esta estimativa?");
        if (!confirmar) return;

        try {
            await api.delete(`/deletarEstimativa/${id}`);

            setEstimativas(prev =>
                prev.filter(item => item._id !== id)
            );

        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Erro ao excluir estimativa");
        }
    }

    return { estimativas, buscar, carregandoEstimativas, deletarEstimativa };
}