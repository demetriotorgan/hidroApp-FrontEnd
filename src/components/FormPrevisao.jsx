import { ChartColumnBig, Save, Sigma } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import useHidrometros from '../hooks/useHidrometros';
import { calcularIntervaloDiasInclusivo, extrairPeriodo } from '../services/dataUtils';
import { calcularConsumoEstimado, calcularConsumoNoPeriodo } from '../services/hidrometroService';
import ConsumoPeriodoCard from './ConsumoPeriodoCard';
import ComparacaoCard from './ComparacaoCard';
import QualidadeModeloCard from './QualidadeModeloCard';
import { montarPayloadAnalise } from '../services/hidrometroService';
import api from '../services/api'
import LoadingModal from "../components/LoadingModal";

const FormPrevisao = () => {
    const { dados } = useHidrometros();
    const [salvando, setSalvando] = useState(false);
    const [form, setForm] = useState({
        dataInicial: '',
        dataFinal: '',
        quantidadeDias: ''
    });

    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        if (!dados || dados.length === 0) return;

        const { dataInicial, dataFinal } = extrairPeriodo(dados);

        setForm(prev => ({
            ...prev,
            dataInicial,
            dataFinal
        }));
    }, [dados]);

    useEffect(() => {
        if (!form.dataInicial || !form.dataFinal) return;

        const dias = calcularIntervaloDiasInclusivo(
            form.dataInicial,
            form.dataFinal
        );

        setForm(prev => ({
            ...prev,
            quantidadeDias: dias
        }));
    }, [form.dataInicial, form.dataFinal]);

    const consumoDoPeriodo = useMemo(() => {
        return calcularConsumoNoPeriodo(dados, form.dataInicial, form.dataFinal);
    }, [dados, form.dataInicial, form.dataFinal]);

    const estimativa = calcularConsumoEstimado(dados, form.quantidadeDias);

    const comparacao = (consumoDoPeriodo && estimativa && !estimativa.erro)
        ? {
            real: consumoDoPeriodo.consumoLitros,
            estimado: estimativa.consumo,
            diferenca: estimativa.consumo - consumoDoPeriodo.consumoLitros,
            erroPercentual:
                ((estimativa.consumo - consumoDoPeriodo.consumoLitros) /
                    consumoDoPeriodo.consumoLitros) * 100
        }
        : null;

    async function handleSalvarPrevisao() {
        try {
            const payload = montarPayloadAnalise({
                form,
                consumoDoPeriodo,
                estimativa,
                comparacao,
                dados
            });

            if (!payload) {
                alert('Dados insuficientes para salvar análise');
                return;
            }
            const confirmar = window.confirm('Deseja salvar esta análise comparativa?');
            if (!confirmar) return;
            setSalvando(true)
            await api.post("/saveAnaliseComparativa", payload);
            alert("Analise Salva com sucesso");
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar análise');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <>
            <LoadingModal
                isOpen={salvando}
                message="Salvando..."
            />
            <form className='form-container'>
                <div className='form-group'>
                    <label>Data de Inicio
                        <input
                            className='form-input'
                            type='date'
                            name='dataInicial'
                            value={form.dataInicial || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Data Final
                        <input
                            className='form-input'
                            type='date'
                            name='dataFinal'
                            value={form.dataFinal || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Quantidade de Dias
                        <input
                            className='form-input'
                            type='number'
                            name='quantidadeDias'
                            value={form.quantidadeDias || ""}
                            readOnly
                        />
                    </label>
                </div>
                <button
                    className='form-button'
                    type='button'>
                    <Sigma size={18} />
                    Calcular Previsão
                </button>
            </form>
            <ConsumoPeriodoCard dados={consumoDoPeriodo} />
            <ComparacaoCard dados={comparacao} />
            <QualidadeModeloCard dados={comparacao} />
            <button
                className='form-button'
                type='button'
                onClick={handleSalvarPrevisao}
                disabled={salvando}
            >
                <ChartColumnBig size={18} />
                {salvando ? "Salvando..." : "Salvar Previsão"}
            </button>
        </>
    )
}

export default FormPrevisao