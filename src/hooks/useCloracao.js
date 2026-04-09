import { useEffect, useState } from "react";
import api from "../services/api";

function useCloracao() {
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarRegistrosCloracao();
    }, []);

    const carregarRegistrosCloracao = async () => {
        try {
            setCarregando(true);
            const res = await api.get('/listarCloracao');
            setRegistros(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setCarregando(false);
        }
    };

    return {
        registros,
        carregando,
        carregarRegistrosCloracao
    };
}

export default useCloracao