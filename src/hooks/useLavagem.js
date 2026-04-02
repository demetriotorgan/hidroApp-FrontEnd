import { useEffect, useState } from 'react';
import api from '../services/api';
import { getDataAtual } from '../services/dataUtils';

export function useLavagem() {
    const [salvando, setSalvando] = useState(false);
    const [lavagens, setLavagens] = useState([]);

    useEffect(() => {
        buscarLavagens();
    }, []);

    const initialState = {
        data: getDataAtual(),
        obs: '',
        pesoRoupas: '',
        tipoLavagem: 'leve',
        nivelMaquina: 'baixo',
        sabao: '',
        amaciante: '',
        modoLavagem: 'longo'
    };

    const [form, setForm] = useState(initialState);

    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function resetForm() {
        setForm(initialState);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const confirmar = window.confirm('Deseja realmente salvar este registro?');
        if (!confirmar) return;

        try {
            setSalvando(true);
            await api.post('/saveLavagem', form);
            alert('Registro salvo com sucesso!');
            buscarLavagens();
            resetForm();

        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar registro');
        } finally {
            setSalvando(false);
        }
    };

    async function buscarLavagens() {
        try {
            const res = await api.get('/listarLavagens');
            // console.log(res.data);
            setLavagens(res.data);
        } catch (error) {
            console.error('Erro ao buscar lavagens: ', error);
            alert('Erro ao exibir lavagens');
        }
    };

    return {
        form,
        salvando,
        handleChange,
        handleSubmit,
        lavagens,
        buscarLavagens
    };
}