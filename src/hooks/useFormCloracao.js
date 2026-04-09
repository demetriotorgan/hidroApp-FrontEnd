import {getDataAtual} from '../services/dataUtils';
import api from '../services/api';
import { useState } from 'react';
import { calcularProdutoCloro } from '../services/cloracaoUtils';

function useFormCloracao(carregarRegistro) {
    const dadosCloroInicial = {
        reservatorio: '',
        concentracao: 5,
        produto: 0,
        estoque: 0,
        data: getDataAtual(),
        utilizado: 'cloro'
    };

    const [form, setForm] = useState(dadosCloroInicial);
    const [salvandoDadosCloro, setSalvandoDadosCloro] = useState(false);

   function handleChange(e) {
    const { name, value, type } = e.target;

    const novoValor = type === 'number' ? Number(value) : value;

    const novoForm = {
        ...form,
        [name]: novoValor
    };

    // recalcula automaticamente o produto
    if (name === 'reservatorio' || name === 'concentracao') {
        novoForm.produto = calcularProdutoCloro(
            novoForm.concentracao,
            novoForm.reservatorio
        );
        novoForm.estoque = calcularProdutoCloro(
            novoForm.concentracao,
            novoForm.reservatorio
        );
    }

    setForm(novoForm);
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
            carregarRegistro();
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