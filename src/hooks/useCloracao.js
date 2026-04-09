import { useEffect, useState } from "react";
import api from "../services/api";

function useCloracao() {
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [deletando, setDeletando] = useState(false);

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

    const handleDelete = async(id) =>{
        const confirmar = window.confirm('Deseja realmente deletar este registro?');
        if(!confirmar) return;

        try {
            setDeletando(true);
            await api.delete(`/deletarCloracao/${id}`);
            //Atualizar lista
            setRegistros((prev)=> prev.filter((item)=>item._id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao deletar registro');
        }finally{
            setDeletando(false);
        }
    }

    return {
        registros,
        carregando,
        carregarRegistrosCloracao,
        handleDelete,
        deletando        
    };
}

export default useCloracao