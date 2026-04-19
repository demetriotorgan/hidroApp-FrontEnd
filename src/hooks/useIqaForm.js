import { useState } from "react";
import api from "../services/api";
import { getDataAtual, getHoraAtual } from "../services/dataService";
import { calcularIQA, validarIQA } from "../services/iqa";


export default function useIqaForm() {
    const formInicial = {
        data: getDataAtual(),
        volume: "",
        horaInicial: getHoraAtual(),
        hidrometroInicial: "",
        totalDeRecirculacao: "",
        ph: "",
        lavagensNoDia: "",
        cor: "transparente",
        turbidez: "baixa",
        odor: "semOdor",
        valorDeiqa: "",
        obs: "",
        hidrometroFinal: "",
        horaFinal: "",
        tempoRecirculacao: ""
    };

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(formInicial);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            data: new Date(`${formData.data}T00:00:00`),
            volume: Number(formData.volume),
            ph: Number(formData.ph),
            hidrometroInicial: Number(formData.hidrometroInicial),
            totalDeRecirculacao: Number(formData.totalDeRecirculacao),
            lavagensNoDia: Number(formData.lavagensNoDia),
            horaInicial: new Date(`${formData.data}T${formData.horaInicial}`)
        };

        // opcionais
        if (formData.hidrometroFinal) {
            payload.hidrometroFinal = Number(formData.hidrometroFinal);
        }

        if (formData.horaFinal) {
            payload.horaFinal = new Date(`${formData.data}T${formData.horaFinal}`);
        }

        if (formData.tempoRecirculacao) {
            payload.tempoRecirculacao = Number(formData.tempoRecirculacao);
        }

        if (formData.valorDeiqa) {
            payload.valorDeiqa = Number(formData.valorDeiqa);
        }
        console.log(payload);
        const confirmar = window.confirm('Deseja salvar este registro de IQA?');
        if (!confirmar) return
        try {
            setLoading(true);
            await api.post("/salvarIqa", payload);
            alert('Registro de IAQ salvo com sucesso');
            setFormData(() => ({
                ...formInicial,
                data: getDataAtual(),
                horaInicial: getHoraAtual()
            }));
        } catch (error) {
            console.error('Erro ao salvar registro de IQA: ', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        loading,
        handleSubmit
    };
}
