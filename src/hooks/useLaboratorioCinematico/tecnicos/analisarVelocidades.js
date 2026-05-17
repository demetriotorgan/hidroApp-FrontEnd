import motorCinematico from '../motor/motorCinematico';

export default function analisarVelocidades(registros) {
    // =========================================================
    // 1. EXECUTA O MOTOR CINEMÁTICO
    // =========================================================
    const resultado = motorCinematico(registros);

    const {
        valido,
        motivo,
        listaDeVelocidades,
    } = resultado;

    console.log('Lista de Velocidades: ', listaDeVelocidades);

    // =========================================================
    // 2. PROPAGA FALHA DE VALIDAÇÃO
    // =========================================================
    if (!valido) {
        return {
            analiseValidada: false,
            motivoDeValidacao: motivo,
            velocidadeAtual: 0,
            velocidadeUltimos3Dias: 0,
            velocidadeSemanal: 0,
        };
    };

    // =========================================================
    // 3. VELOCIDADE ATUAL
    // =========================================================
    // A velocidade atual corresponde ao primeiro valor da lista,
    // que representa o consumo calculado a partir dos dois
    // registros mais recentes.
    //
    // Exemplo:
    // registros[0] e registros[1]
    //
    // Se por algum motivo a lista estiver vazia, retorna 0.
    const velocidadeAtual =
        listaDeVelocidades.length > 0
            ? listaDeVelocidades[0]
            : 0;
    // =========================================================
    // 4. MÉDIA DOS ULTIMOS 3 e 7 DIAS
    // =========================================================  
    const ultimas3Velocidades = listaDeVelocidades.slice(0, 3);
    const mediaUltimos3Dias =
        ultimas3Velocidades.length > 0 ?
            ultimas3Velocidades.reduce(
                (soma, valor) => soma + valor, 0
            ) / ultimas3Velocidades.length : 0;

    const ultimas7Velocidades = listaDeVelocidades.slice(0, 7);
    const mediaSemanal =
        ultimas7Velocidades.length > 0 ?
            ultimas7Velocidades.reduce(
                (soma, valor) => soma + valor, 0
            ) / ultimas7Velocidades.length : 0;

    //Diferença entre a média semanal
    let diferencaSemanal = 0;
    if (mediaSemanal !== 0) {
        diferencaSemanal = ((velocidadeAtual - mediaSemanal) / mediaSemanal) * 100;
    } else {
        diferencaSemanal = 0;
    }

    //Tendencia Recente
    let tendenciaRecente = 'indefinida';
    if (mediaSemanal > 0) {
        const variacaoPercentual =
            ((mediaUltimos3Dias - mediaSemanal) / mediaSemanal) * 100;
        const tolerancia = 5;
        if (variacaoPercentual > tolerancia) {
            tendenciaRecente = 'crescente';
        } else if (variacaoPercentual < - tolerancia) {
            tendenciaRecente = 'decrescente';
        } else {
            tendenciaRecente = 'estável'
        }
    }

    //Maximo Semanal
    const maximoSemanal =
        ultimas7Velocidades.length > 0
            ? Math.max(...ultimas7Velocidades)
            : 0;

    const minimoSemanal =
        ultimas7Velocidades.length > 0
            ? Math.min(...ultimas7Velocidades)
            : 0;

    const amplitudeSemanal =
        maximoSemanal - minimoSemanal;

    const variabilidadeSemanal =
        mediaSemanal !== 0
            ? (amplitudeSemanal / mediaSemanal) * 100
            : 0;

    const posicaoAtualNaFaixa =
        amplitudeSemanal > 0
            ? ((velocidadeAtual - minimoSemanal) / amplitudeSemanal) * 100
            : 50;

    //DESVIO PADRÃO SEMANAL
    const desvioPadraoSemanal =
        ultimas7Velocidades.length > 0
            ? Math.sqrt(
                ultimas7Velocidades.reduce((soma, valor) => {
                    const diferenca = valor - mediaSemanal;
                    return soma + diferenca ** 2;
                }, 0) / ultimas7Velocidades.length
            ) : 0;

    //CALCULO DO COEF. DE VARIAÇÃO SEMANAL
    const CV =
        mediaSemanal !== 0
            ? (desvioPadraoSemanal / mediaSemanal) * 100
            : 0;
    //CLASSIFICAÇÃO DO CONSUMO ATUAL
    let classificacaoConsumoAtual = 'indefinido';

    if (mediaSemanal > 0) {
        const limiteMuitoBaixo = mediaSemanal - (2 * desvioPadraoSemanal);
        const limiteBaixo = mediaSemanal - desvioPadraoSemanal;
        const limiteAlto = mediaSemanal + desvioPadraoSemanal;
        const limitePico = mediaSemanal + (2 * desvioPadraoSemanal);

        if (velocidadeAtual < limiteMuitoBaixo) {
            classificacaoConsumoAtual = 'muito baixo';
        } else if (velocidadeAtual < limiteBaixo) {
            classificacaoConsumoAtual = 'baixo'
        } else if (velocidadeAtual <= limiteAlto) {
            classificacaoConsumoAtual = 'normal'
        } else if (velocidadeAtual <= limitePico) {
            classificacaoConsumoAtual = 'alto';
        } else {
            classificacaoConsumoAtual = 'pico'
        }
    }

    //ESTABILIDADE OPERACIONAL
    let classificacaoVariabilidade = 'indefinida';

    if (CV < 10) {
        classificacaoVariabilidade = 'muito estável';
    } else if (CV < 20) {
        classificacaoVariabilidade = 'estável';
    } else if (CV < 30) {
        classificacaoVariabilidade = 'moderadamente variável';
    } else if (CV < 50) {
        classificacaoVariabilidade = 'alta variabilidade';
    } else {
        classificacaoVariabilidade = 'muito instável';
    }

    // INDICADOR DE PICO SEMANAL    
    const isPicoSemanal = posicaoAtualNaFaixa >= 95;

    let classificacaoDePico = 'indefinido';

    if (posicaoAtualNaFaixa >= 95) {
        classificacaoDePico = 'pico semanal';
    } else if (posicaoAtualNaFaixa >= 80) {
        classificacaoDePico = 'próximo do pico';
    } else if (posicaoAtualNaFaixa >= 40) {
        classificacaoDePico = 'faixa intermediária';
    } else if (posicaoAtualNaFaixa >= 20) {
        classificacaoDePico = 'faixa baixa';
    } else {
        classificacaoDePico = 'próximo do mínimo';
    }

    //PERCENTIL DA VELOCIDADE ATUAL
    const valoresOrdenados = [...ultimas7Velocidades].sort((a, b) => a - b);

    const quantidadeMenoresOuIguais =
        valoresOrdenados.filter(
            valor => valor <= velocidadeAtual
        ).length;

    const percentilAtual =
        valoresOrdenados.length > 0
            ? (quantidadeMenoresOuIguais / valoresOrdenados.length) * 100
            : 0;

    let classificacaoPercentil = 'indefinido';

    if (percentilAtual <= 10) {
        classificacaoPercentil = 'extremamente baixo';
    } else if (percentilAtual <= 25) {
        classificacaoPercentil = 'muito baixo';
    } else if (percentilAtual <= 40) {
        classificacaoPercentil = 'baixo';
    } else if (percentilAtual <= 60) {
        classificacaoPercentil = 'normal';
    } else if (percentilAtual <= 75) {
        classificacaoPercentil = 'moderadamente alto';
    } else if (percentilAtual <= 90) {
        classificacaoPercentil = 'alto';
    } else {
        classificacaoPercentil = 'extremamente alto';
    }

    //DISTANCIA AO MÁXIMO ATUAL
    const distanciaAoMaximoSemanal =
        maximoSemanal - velocidadeAtual;

    const distanciaPercentualAoMaximo =
        maximoSemanal > 0
            ? (distanciaAoMaximoSemanal / maximoSemanal) * 100
            : 0;

    // =========================================================
    // DADOS PARA O GRÁFICO (ÚLTIMOS 7 DIAS)
    // =========================================================
    // A lista original já vem ordenada do mais recente para o mais antigo.
    // Para o gráfico, geralmente é melhor inverter para exibir do
    // mais antigo -> mais recente.
    const serieUltimos7Dias = ultimas7Velocidades
        .slice()
        .reverse()
        .map((valor, index) => ({
            dia: `D-${6 - index}`, // D-6 ... D-0
            velocidade: valor,
            mediaSemanal,
            media3Dias: mediaUltimos3Dias,
            maximoSemanal,
            minimoSemanal,
            limiteSuperiorNormal: mediaSemanal + desvioPadraoSemanal,
            limiteInferiorNormal: mediaSemanal - desvioPadraoSemanal,
            ehValorAtual: index === 6, // último ponto após reverse()
            classificacao:
                valor === velocidadeAtual
                    ? classificacaoConsumoAtual
                    : null,
        }));

    // =========================================================
    // RESUMO PARA O COMPONENTE DO GRÁFICO
    // =========================================================
    const dadosGrafico = {
        serie: serieUltimos7Dias,

        resumo: {
            velocidadeAtual,
            mediaSemanal,
            mediaUltimos3Dias,
            maximoSemanal,
            minimoSemanal,
            amplitudeSemanal,
            desvioPadraoSemanal,
            CV,
            tendenciaRecente,
            classificacaoConsumoAtual,
            classificacaoVariabilidade,
            classificacaoPercentil,
            classificacaoDePico,
            posicaoAtualNaFaixa,
            percentilAtual,
            diferencaSemanal,
            distanciaPercentualAoMaximo,
            isPicoSemanal,
        },
    };

    // =========================================================
    // 5. RETORNO
    // =========================================================        
    return {
        analiseValidada: true,
        motivoDeValidacao: motivo,
        velocidadeAtual,
        mediaUltimos3Dias,
        mediaSemanal,
        tendenciaRecente,
        diferencaSemanal,

        maximoSemanal,
        minimoSemanal,
        amplitudeSemanal,
        variabilidadeSemanal,
        posicaoAtualNaFaixa,
        desvioPadraoSemanal,
        CV,
        classificacaoConsumoAtual,
        classificacaoVariabilidade,
        isPicoSemanal,
        classificacaoDePico,
        classificacaoPercentil,
        distanciaPercentualAoMaximo,

        // Dados do gráfico
        ultimas7Velocidades,
        percentilAtual,
        dadosGrafico,
    };
}