import { useEffect, useState } from "react";
import api from "../services/api";
import { getDataAtual, getHoraAtual, getHoraAtualParaFinal, formatHora } from "../services/dataService";
import { calcularIQARegistro, validarIQA } from "../services/iqa";
import { calcularRecirculacoes, calcularTempoRecirculacao } from "../services/lavagemService";


export default function useIqaForm(registroEmEdicao, onSuccess) {
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
     const isEdit = !!registroEmEdicao;

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const { ph, cor, turbidez, odor } = formData;

        // Verifica se todos os campos necessários existem
        if (!ph || !cor || !turbidez || !odor) {
            return;
        }

        const resultado = calcularIQARegistro({
            ph: Number(ph),
            cor,
            turbidez,
            odor
        });

        const validacao = validarIQA(resultado);

        if (!validacao.valido) return;

        setFormData(prev => ({
            ...prev,
            valorDeiqa: resultado.iqa
        }));

    }, [formData.ph, formData.cor, formData.turbidez, formData.odor]);

    //Ediçao
    useEffect(() => {
        if (!registroEmEdicao) return;

        const horaFinalCalculada =
            registroEmEdicao.horaFinal
                ? formatHora(registroEmEdicao.horaFinal)
                : getHoraAtualParaFinal(); // 🔥 AQUI

        setFormData({
            data: registroEmEdicao.data?.split("T")[0] || "",
            volume: registroEmEdicao.volume || "",
            horaInicial: formatHora(registroEmEdicao.horaInicial),
            hidrometroInicial: registroEmEdicao.hidrometroInicial || "",
            totalDeRecirculacao: registroEmEdicao.totalDeRecirculacao || "",
            ph: registroEmEdicao.ph || "",
            lavagensNoDia: registroEmEdicao.lavagensNoDia || "",
            cor: registroEmEdicao.cor || "transparente",
            turbidez: registroEmEdicao.turbidez || "baixa",
            odor: registroEmEdicao.odor || "semOdor",
            valorDeiqa: registroEmEdicao.valorDeiqa || "",
            obs: registroEmEdicao.obs || "",
            hidrometroFinal: registroEmEdicao.hidrometroFinal || "",
            horaFinal: horaFinalCalculada, // 🔥 aqui
            tempoRecirculacao: registroEmEdicao.tempoRecirculacao || ""
        });

    }, [registroEmEdicao]);

   

    useEffect(() => {
    const { hidrometroInicial, hidrometroFinal, volume } = formData;

    const resultado = calcularRecirculacoes({
        hidrometroInicial,
        hidrometroFinal,
        volume
    });

    if (resultado === "") return;

    setFormData(prev => ({
        ...prev,
        totalDeRecirculacao: resultado
    }));

}, [
    formData.hidrometroInicial,
    formData.hidrometroFinal,
    formData.volume
]);

//Tempo de recirculação
useEffect(() => {
    const { horaInicial, horaFinal } = formData;

    const tempo = calcularTempoRecirculacao(horaInicial, horaFinal);

    if (tempo === "") return;

    setFormData(prev => ({
        ...prev,
        tempoRecirculacao: tempo
    }));

}, [formData.horaInicial, formData.horaFinal]);

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            data: new Date(`${formData.data}T00:00:00`),
            volume: Number(formData.volume),
            ph: Number(formData.ph),
            hidrometroInicial: Number(formData.hidrometroInicial),
            totalDeRecirculacao: Number(formData.totalDeRecirculacao),
            lavagensNoDia: Number(formData.lavagensNoDia),
            horaInicial: new Date(`${formData.data}T${formData.horaInicial}`),
            obs: formData.obs
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

        const confirmar = window.confirm(
            isEdit
                ? "Deseja atualizar este registro?"
                : "Deseja salvar este registro?"
        );

        if (!confirmar) return
        try {
            setLoading(true);
            if (isEdit) {
                await api.patch(`/atualizarIqa/${registroEmEdicao._id}`, payload);
                alert('Registro de IAQ atualizado com sucesso');
            } else {
                await api.post("/salvarIqa", payload);
                alert('Registro de IAQ salvo com sucesso');
            }

            setFormData({
                ...formInicial,
                data: getDataAtual(),
                horaInicial: getHoraAtual()
            });
            onSuccess && onSuccess();
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
