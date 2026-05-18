import { getDataAtual } from "../../../services/dataUtils";

export function gerarPayloadDados(dados){
     let erroDiario = 0;
        let erroDiarioProjetado = 0;
        if (dados.diasDesdeSanepar > 0) {
            erroDiario = Number(dados.erroAbsoluto / dados.diasDesdeSanepar);
            erroDiarioProjetado = erroDiario * 31
        }
        const payload = {
            data: getDataAtual(),
            diaDoCiclo: dados.diasDesdeSanepar,
            entrada: {
                leituraPrevistaAtual: dados.leituraPrevista3,
                leituraAtualReal: dados.leituraAtual3,
                consumoPrevistoAtual: dados.consumoPrevisto,
                consumoRealAtual: dados.consumoReal,
                coeficienteA: dados.coeficienteA,
            },
            metricas: {
                erro: dados.erroAbsoluto,
                erroPercentual: dados.erroPercentual,
                erroPorDia: erroDiario,
                erroProjetado: erroDiarioProjetado,
            },
            previsao: {
                consumoPrevistoFatura:
                    dados.previsaoFatura?.consumoM3Fatura ?? null,

                leituraPrevistaFatura:
                    dados.previsaoFatura?.leituraPrevistaFatura ?? null,

                leituraCorrigida:
                    dados.previsaoFaturaAjustada?.leituraCorrigida ?? null,
            },
            target: {
                leituraFinalReal: null,
                consumoFinalReal: null,
                ajusteIdeal: null,
                erroFinal: null
            }

        }
    console.log('Payload Gerado: ', payload);
    return payload
}