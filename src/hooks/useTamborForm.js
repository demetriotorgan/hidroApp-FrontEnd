import { useState } from "react";
import api from "../services/api";
import { getDataAtual, getHoraAtual } from "../services/dataService";
import { calcularIQA, validarIQA} from "../services/iqa";


export default function useTamborForm() {
    const [loading, setLoading] = useState(false);
    const [iqa, setIqa] = useState(null);
    const [formData, setFormData] = useState({
        data: getDataAtual(),
        hora: getHoraAtual(),
        volume: "",
        recirculacao: "",
        tempoRecirculacao: "",
        filtragem: false,
        tempoDeFiltragem: "",
        ph: "",
        cloro: "",
        acido: "",
        tipoAcido: "",
        aguaSanitaria: "",
        lavagensDoDia: "",
        cor: "transparente",
        turbidez: "baixa",
        odor: "semOdor",
        obs: ""
    });

    function obterIQA() {
    return calcularIQA(formData);
}

    function calcularIQAAtual() {
        const resultado = obterIQA();
        if (resultado.status === "incompleto") {
            setIqa(resultado);
            return resultado;
        }
        setIqa(resultado);
        return resultado;
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function gerarPayload() {
        const dataISO = new Date(`${formData.data}T00:00:00`).toISOString();
        const horaISO = new Date(`${formData.data}T${formData.hora}:00`).toISOString();

        const resultadoIQA = obterIQA();

        return {
            data: dataISO,
            hora: horaISO,
            volume: Number(formData.volume),
            recirculacao: Number(formData.recirculacao),
            tempoRecirculacao: Number(formData.tempoRecirculacao),
            filtragem: formData.filtragem,
            tempoDeFiltragem: Number(formData.tempoDeFiltragem),

            ph: Number(formData.ph),
            cloro: Number(formData.cloro),

            acido: Number(formData.acido),
            tipoAcido: formData.tipoAcido.toLowerCase(),

            aguaSanitaria: Number(formData.aguaSanitaria),
            lavagensDoDia: Number(formData.lavagensDoDia),

            cor: formData.cor,
            turbidez: formData.turbidez,
            odor: formData.odor,
            obs: formData.obs,

            // 🔥 NOVO
            iqa: resultadoIQA.iqa,
            classificacaoIQA: resultadoIQA.classificacao
        };
    }

    async function salvarRegistro() {
        const validacao = validarIQA(resultado);
         if (!validacao.valido) {
        alert(validacao.mensagem);

        return {
            success: false,
            error: validacao.mensagem
        };
    }

        const payload = gerarPayload();

        try {
            setLoading(true);
            await api.post("https://api-hidro-app.vercel.app/saveTambor", payload);
            resetForm();
            setIqa(null);
            return { success: true };
        } catch (error) {
            console.error(error.response?.data || error.message);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setFormData({
            data: getDataAtual(),
            hora: getHoraAtual(),
            volume: "",
            recirculacao: "",
            tempoRecirculacao: "",
            filtragem: false,
            tempoDeFiltragem: "",
            ph: "",
            cloro: "",
            acido: "",
            tipoAcido: formData.tipoAcido?.toLowerCase() || "",
            aguaSanitaria: "",
            lavagensDoDia: "",
            cor: "transparente",
            turbidez: "baixa",
            odor: "semOdor",
            obs: ""
        });
    }

    return {
        formData,
        handleChange,
        salvarRegistro,
        resetForm,
        loading,
        iqa,
        calcularIQAAtual
    };
}
