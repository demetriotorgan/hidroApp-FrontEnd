import { useEffect, useState } from "react";
import api from "../services/api";

export const useUltimaLeitura = () => {

    const dadosIniciais = {
        data: '',
        leitura: '',
        obs: ''
    };

    useEffect(() => {      
        listarUltimasLeituras();
    }, []);

    const [form, setForm] = useState(dadosIniciais)
    const [salvandoLeitura, setSalvandoLeitura] = useState(false);
    const [leituras, setLeituras] = useState([]);
    const [carregandoUltimasLeituras, setCarregandoUltimasLeituras] = useState(false);
    const [excluindoUltimaLeitura, setExcluindoUltimaLeitura] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    //POST
    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(form);

        const confirm = window.confirm('Deseja realmente salvar esta leitura?');
        if (!confirm) return
        try {
            setSalvandoLeitura(true);
            await api.post('/saveUltimaLeitura', form);
            alert('Leitura salva com sucesso')
            setForm(dadosIniciais)
            listarUltimasLeituras()
        } catch (error) {
            console.error('Erro ao salvar leitura: ', error);
            alert('Erro ao salvar leitura');
        } finally {
            setSalvandoLeitura(false);
        }
    };

    //GET
    async function listarUltimasLeituras() {        
        try {
            setCarregandoUltimasLeituras(true);
            // console.log("URL chamada:", `${api.defaults.baseURL}listarUltimaLeitura`);
            const response = await api.get('/listarUltimaLeitura');                                
            setLeituras(response.data);
        } catch (error) {
            console.error('Erro ao carregar ultimas leituras: ', error);
        } finally {
            setCarregandoUltimasLeituras(false);
        }
    };

    //DELETE
    async function deletarUltimaLeitura(id) {
        const confirmar = window.confirm('Deseja realmente excluir esta leitura?');
        if (!confirmar) return
        try {
            setExcluindoUltimaLeitura(true);
            await api.delete(`/deletarUltimaLeitura/${id}`)
            setLeituras((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.log(error);
        } finally {
            setExcluindoUltimaLeitura(false);
        }
    };

    return {
        handleChange,
        handleSubmit,
        salvandoLeitura,
        form,
        leituras,
        deletarUltimaLeitura,
        excluindoUltimaLeitura
    };
};