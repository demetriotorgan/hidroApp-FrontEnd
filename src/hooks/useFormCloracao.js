import {getDataAtual} from '../services/dataUtils';
import api from '../services/api';
import { useState } from 'react';

function useFormCloracao() {
    const dadosCloroInicial = {
        reservatorio: 0,
        concentracao: 5,
        produto: 0,
        estoque: 0,
        data: getDataAtual(),
        utilizado: 'cloro'
    };

    const [form, setForm] = useState(dadosCloroInicial);
    const [salvandoDadosCloro, setSalvandoDadosCloro] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const confirmar = window.confirm('Deseja realmente salvar este registros?');
        if (!confirmar) return

        try {
            setSalvandoDadosCloro(true);
            await api.post("/saveCloracao", form);
            alert('Registro de cloração salvo com sucesso');
            setForm(dadosCloroInicial);
        } catch (error) {
            console.error('Erro ao salvar registro: ', error);
            alert('Erro ao salvar registro');
        } finally {
            setSalvandoDadosCloro(false);
        }
    };
    return {
        form,
        handleChange,
        handleSubmit,
        salvandoDadosCloro
    }
}

export default useFormCloracao;