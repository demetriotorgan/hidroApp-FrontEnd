import { ChartColumnBig, Save, Sigma } from 'lucide-react'
import useHidrometros from '../hooks/useHidrometros';
import ConsumoPeriodoCard from './ConsumoPeriodoCard';
import ComparacaoCard from './ComparacaoCard';
import QualidadeModeloCard from './QualidadeModeloCard';
import { montarPayloadAnalise } from '../services/hidrometroService';
import LoadingModal from "../components/LoadingModal";
import CardAnalise from './CardAnalise';
import usePrevisao from '../hooks/usePrevisao';
import useAnalises from '../hooks/useAnalises';

const FormPrevisao = () => {
    const { dados } = useHidrometros();
    const {
        form,
        handleChange,
        consumoDoPeriodo,
        comparacao
    } = usePrevisao(dados);
    const {
        analises,
        salvar,
        remover,
        loading
    } = useAnalises();

    async function handleSalvar() {
        const payload = montarPayloadAnalise({
            form,
            consumoDoPeriodo,
            comparacao,
            dados
        });

        if (!payload) return alert("Dados insuficientes");

        if (!window.confirm("Deseja salvar?")) return;

        await salvar(payload);
    }

    return (
        <>
            <LoadingModal
                isOpen={loading}
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
                onClick={handleSalvar}
                disabled={loading}
            >
                <ChartColumnBig size={18} />
                {loading ? "Salvando..." : "Salvar Previsão"}
            </button>

            <div className="lista-analises">
                {analises.length === 0 ? (
                    <p style={{ marginTop: "20px" }}>
                        Nenhuma análise salva ainda.
                    </p>
                ) : (
                    analises.map((item) => (
                        <CardAnalise
                            key={item._id}
                            analise={item}
                            onDelete={remover}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default FormPrevisao