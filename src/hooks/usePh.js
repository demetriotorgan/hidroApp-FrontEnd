import { useEffect, useState } from "react";
import api from "../services/api";

function usePh() {

    const [carregandopH, setCarregandopH] = useState(false);
    const [registrosPh, setRegistrospH] = useState([]);
    const [deletandoPh, setDeletandoPh] = useState(false);

    useEffect(() => {
        carregarRegistrospH();
    }, []);
    
    //GET
    const carregarRegistrospH = async () => {
        try {
            setCarregandopH(true);
            const res = await api.get('/listarph');
            setRegistrospH(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setCarregandopH(false);
        }
    };

    //Delete
    const handleDeletePh = async(id)=>{
        const confirmar = window.confirm('Deseja realmente deletar esse registro?');
        if(!confirmar) return

        try {
            setDeletandoPh(true);
            await api.delete(`/deletarph/${id}`);
            //Atualizar registros de ph
            carregarRegistrospH();
        } catch (error) {
            console.log(error);
            alert('Erro ao deletar registro de pH');
        }finally{
            setDeletandoPh(false);
        }
    };

    return {      
        carregandopH,          
        registrosPh,
        deletandoPh,
        carregarRegistrospH,
        handleDeletePh        
    }
}

export default usePh;