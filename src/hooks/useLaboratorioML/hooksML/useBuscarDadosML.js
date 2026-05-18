import { useEffect, useState } from "react";
import api from "../../../services/api";

function useBuscarDadosML(){
    const [dadosML, setDadosML] = useState([]);
    const [carregandoML, setCarregandoML] = useState(true);

    useEffect(()=>{
        carregarDadosML();
    },[]);

    const carregarDadosML = async()=>{
        try {
            setCarregandoML(true);
            const res = await api.get('/listarDadosML');
            setDadosML(res.data);
        } catch (error) {
            console.log(error);
            alert('Erro ao carregar dados de ML');
        }finally{
            setCarregandoML(false);
        }
    };

    return{
        dadosML,
        carregandoML,
        carregarDadosML
    };
}

export default useBuscarDadosML;