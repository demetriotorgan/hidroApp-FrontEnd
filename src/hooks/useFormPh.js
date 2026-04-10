import { useEffect, useState } from "react";
import { getDataAtual } from "../services/dataUtils";
import { calcularAcido } from "../services/acidoService";
import api from "../services/api";

function useFormPh() {
    const dadosInicias = {
        reservatorio: '',
        phAtual: '',
        phObjetivo: 6.8,
        acido: '',
        data: getDataAtual()
    }

    const [form, setForm] = useState(dadosInicias);
    const [salvandopH, setSalvandopH] = useState(false);
    const [carregandopH, setCarregandopH] = useState(false);
    const [registroPh, setRegistrospH] = useState([]);

    useEffect(()=>{
        carregarRegistrospH();
    },[])



    function handleChange(e) {
        const { name, value, type } = e.target;
        const novoValor = value;

        const novoForm = {
            ...form,
            [name]: novoValor
        };

        //Calculo da massa de ácido
        const reservatorio = parseFloat(novoForm.reservatorio);
        const phAtual = parseFloat(novoForm.phAtual);
        const phObjetivo = parseFloat(novoForm.phObjetivo);

        if (
            !isNaN(reservatorio) &&
            !isNaN(phObjetivo) &&
            !isNaN(phAtual) &&
            novoForm.reservatorio !== '' &&
            novoForm.phAtual !== '' &&
            novoForm.phObjetivo !== ''
        ) {
            novoForm.acido = calcularAcido(
                phObjetivo,
                reservatorio,
                phAtual
            );
        } else {
            novoForm.acido = '';
        }
        setForm(novoForm);
    };

    //POST
    async function handleSubmit(e) {
        e.preventDefault();
        const confirmar = window.confirm('Deseja realmente salvar este registros?');
        if (!confirmar) return;

        try {
            setSalvandopH(true);
            await api.post('/salvarph', form);
            alert('Registro de pH salvo com sucesso');
            setForm(dadosInicias);   
            carregarRegistrospH();
        } catch (error) {
            console.error('Erro ao salvar registro de pH: ', error);
            alert('Erro ao salvar registro de pH');
        }finally{
            setSalvandopH(false);
        }
    };

    //GET
    const carregarRegistrospH = async()=>{
        try {
            setCarregandopH(true);
            const res = await api.get('/listarph');
            setRegistrospH(res.data);
        } catch (error) {
            console.error(error);            
        }finally{
            setCarregandopH(false);
        }
    }

    return {
        form,
        handleChange,
        handleSubmit,
        salvandopH,
        registroPh,
        carregandopH
    }
}

export default useFormPh;