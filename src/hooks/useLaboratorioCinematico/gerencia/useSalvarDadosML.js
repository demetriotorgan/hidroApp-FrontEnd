import { useState } from "react";
import api from "../../../services/api";
import { gerarPayloadDados } from "./gerarPayloadDados";
import { validarPayload } from "./validarPayload";

function useSalvarDadosML(dados) {
    const [salvando, setSalvando] = useState(false);

    async function salvarDadosML() {
        const payload = gerarPayloadDados(dados);
        const validacao = validarPayload(payload);

        if (!validacao.valido) {
            return {
                sucesso: false,
                mensagem: validacao.mensagem,
                payload,
            };
        }

        try {
            setSalvando(true);
            await api.post('/salvarDadosML', payload);
            alert('Dados Salvos com sucesso');
            return {
                sucesso: true,
                mensagem: 'Dados salvos com sucesso',
                payload
            };
        } catch (error) {
            console.error('Erro ao salvar dados de ML', error);
            return {
                sucesso: false,
                mensagem:
                    error.response?.data?.mensagem ||
                    "Erro ao salvar dados no servidor.",
                payload
            };
        } finally {
            setSalvando(false);
        }
    }
    return {
        salvarDadosML,
        salvando
    };
}

export default useSalvarDadosML;