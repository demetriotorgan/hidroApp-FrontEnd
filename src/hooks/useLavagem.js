import { useEffect, useState } from 'react';
import api from '../services/api';
import { getDataAtual } from '../services/dataUtils';

export function useLavagem() {
    const [salvando, setSalvando] = useState(false);
    const [lavagens, setLavagens] = useState([]);
    const [excluindoLavagem, setExcluindoLavagem] = useState(false);

    useEffect(() => {
        buscarLavagens();
    }, []);

    const initialState = {
        data: getDataAtual(),
        obs: '',
        pesoRoupas: '',
        tipoLavagem: 'leve',
        nivelMaquina: 'baixo',
        litros:'',
        sabao: '',
        amaciante: '',
        modoLavagem: 'longo',
        enchague:''
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
            // console.log(form);
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

    async function deletarLavagem(id) {
        const confirmar = window.confirm('Deseja realmente excluir este registro?');
        if (!confirmar) return;
        try {
            setExcluindoLavagem(true);
            await api.delete(`/deletarLavagem/${id}`);
            //Atualizando lista de registro de lavagem
            setLavagens((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Erro ao excluir registro de lavagem: ', error);
            alert('Erro ao excluir registro de lavagem')
        } finally {
            setExcluindoLavagem(false);
        }
    }

    return {
        form,
        salvando,
        handleChange,
        handleSubmit,
        lavagens,
        buscarLavagens,
        deletarLavagem,
        excluindoLavagem
    };
}