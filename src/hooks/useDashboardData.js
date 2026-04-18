import useHidrometros from "./useHidrometros";
import { totalDeRegistros, mediaConsumo, maiorConsumo, totalConsumoAcumulado, calcularConsumoUltimoRegistro, dataUltimoRegistro, calcularVariacaoConsumo, calcularCVConsumo, percentualComparacaoConsumo, calcularLinearidadeConsumo, calcularPosicaoRegua, calcularDiasMonitoramento, calcularCoeficienteA } from "../services/hidrometroService";
import { usePluviometro } from "./usePluviometro ";
import { calcularDiasSemChuva, mediaMmChuva, obterMmUltimaChuva, totalDeRegistrosDePluviometro } from "../services/pluviometroService";
import { useEffect } from "react";
import useCloracao from "./useCloracao";
import { calcularMetricasCloracao, getUltimaCloracao } from "../services/cloracaoUtils";

export function useDashboardData() {
    const { dados, loading } = useHidrometros();
    
    //Dados do Hidrometro
    const total = totalDeRegistros(dados);
    const media = mediaConsumo(dados);
    const ultimaData = dataUltimoRegistro(dados);
    const consumoDiaAnterior = calcularConsumoUltimoRegistro(dados);
    const acumulado = totalConsumoAcumulado(dados);
    const diaMaiorConsumo = maiorConsumo(dados);
    const resultado = calcularVariacaoConsumo(dados);
    const cvConsumo = calcularCVConsumo(dados);
    const percentualAtualMaiorConsumo = percentualComparacaoConsumo(dados);
    const estabilidadeDoConsumo = calcularLinearidadeConsumo(dados);
    const diasDeConsumo = calcularDiasMonitoramento(dados);

    //Dados do Pluviometro
    const { listarPluviometros, registros } = usePluviometro();

    useEffect(() => {
        listarPluviometros();
    }, []);

    const diasSemChuva = calcularDiasSemChuva(registros);
    const mmUltimaChuva = obterMmUltimaChuva(registros);
    const totalDeRegistrosDeChuva = totalDeRegistrosDePluviometro(registros);
    const mmMedioDeChuva = mediaMmChuva(registros);

    //Regua de Consumo
    const regua = calcularPosicaoRegua(media, consumoDiaAnterior);

    //Qualidade da água
    const qualidadeAgua = {
        turbidez: null,
        odor: null,
        diasDesdeTroca: null
    };

    //Dados para o modelo
    const viabilidadeDosDados = calcularCoeficienteA(dados);   

    //Dados de Cloração
    const {registros: registrosCloracao} = useCloracao();
    const ultimaCloracao = getUltimaCloracao(registrosCloracao);
    const metricasCloracao = calcularMetricasCloracao(registrosCloracao);

    
    return {
        loading,
        hidrometro: {
            total,
            media,
            ultimaData,
            consumoDiaAnterior,
            acumulado,
            diaMaiorConsumo,
            resultado,
            cvConsumo,
            percentualAtualMaiorConsumo,
            estabilidadeDoConsumo,
            regua,
            diasDeConsumo
        },
        pluviometro: {
            diasSemChuva,
            mmUltimaChuva,
            total: totalDeRegistrosDeChuva,
            media: mmMedioDeChuva
        },
        qualidadeAgua,
        modelo:{
            viabilidadeDosDados
        },
        ultimaCloracao,
        metricasCloracao
    };
}