// src/services/lavagemService.js

/**
 * Retorna os dados da última lavagem registrada.
 * @param {Array} lavagens - Lista de registros de lavagem.
 * @returns {Object|null} Objeto com os dados da última lavagem ou null se não houver registros.
 */
export function getUltimaLavagem(lavagens) {
    if (!lavagens || lavagens.length === 0) return null;

    // Ordena pela data mais recente (ou createdAt se preferir)
    const ordenadas = [...lavagens].sort((a, b) => new Date(b.data) - new Date(a.data));

    const ultima = ordenadas[0];

    return {
        data: ultima.data,
        aguaUsada: ultima.litros,
        carga: ultima.pesoRoupas,
        produtos: {
            sabao: ultima.sabao,
            amaciante: ultima.amaciante
        },
        obs: ultima.obs,
        tipoLavagem: ultima.tipoLavagem,
        nivelMaquina: ultima.nivelMaquina,
        modoLavagem: ultima.modoLavagem,
        enchague: ultima.enchague
    };
};

export function getTotalLavagens(lavagens) {
    if (!lavagens || lavagens.length === 0) return 0;
    return lavagens.length;
};

export function getMediaAgua(lavagens) {
    if (!lavagens || lavagens.length === 0) return 0;

    const totalAgua = lavagens.reduce((acc, lavagem) => acc + (lavagem.litros || 0), 0);
    return (totalAgua / lavagens.length).toFixed(1);
};

export function getMediaCarga(lavagens) {
    if (!lavagens || lavagens.length === 0) return 0;

    const totalCarga = lavagens.reduce((acc, lavagem) => acc + (lavagem.pesoRoupas || 0), 0);
    return (totalCarga / lavagens.length).toFixed(1);
};

export function getMediaProdutos(lavagens) {
    if (!lavagens || lavagens.length === 0) {
        return { sabao: 0, amaciante: 0 };
    }

    const totalSabao = lavagens.reduce((acc, lavagem) => acc + (lavagem.sabao || 0), 0);
    const totalAmaciante = lavagens.reduce((acc, lavagem) => acc + (lavagem.amaciante || 0), 0);

    return {
        sabao: (totalSabao / lavagens.length).toFixed(1),
        amaciante: (totalAmaciante / lavagens.length).toFixed(1)
    };
};

//Calculo de Eficiencia das lavagens
// Classificação de eficiência
function classificarEficiencia(eficienciaRelativa) {
    if (eficienciaRelativa === 0) return 'SEM DADOS';

    if (eficienciaRelativa <= 1.1) return 'EXCELENTE';
    if (eficienciaRelativa <= 1.3) return 'BOA';
    if (eficienciaRelativa <= 1.6) return 'MÉDIA';
    return 'RUIM';
};

// Dados para tabela
export function gerarDadosTabelaEficiencia(registros) {
    const dados = calcularAguaLavagem(registros);

    return dados.map(item => ({
        ...item,

        // 🔹 classificação separada
        indicadorLavagem: classificarEficiencia(item.eficienciaRelativaLavagem),

        indicadorEnxague: item.totalEnxague > 0
            ? classificarEficiencia(item.eficienciaRelativaEnxague)
            : 'NÃO HOUVE',

        indicadorTotal: classificarEficiencia(item.eficienciaRelativaTotal),
        // 🔥 NOVO: ESCALA NUMÉRICA
        escalaLavagem: item.eficienciaRelativaLavagem,
        escalaEnxague: item.eficienciaRelativaEnxague,
        escalaTotal: item.eficienciaRelativaTotal
    }));
};

//Calculo de Eficiencia
export function calcularEficiencia(carga) {
    const cargaKg = Number(carga) || 0;

    if (cargaKg <= 0) {
        return {
            erro: "Carga inválida"
        };
    }

    const capacidadeMax = 12;
    const volumeMin = 40;
    const volumeMax = 80;

    // 🔹 Lavagem (modelo linear)
    let litrosIdeaisLavagem = volumeMin + ((volumeMax - volumeMin) / capacidadeMax) * cargaKg;

    if (litrosIdeaisLavagem > volumeMax) litrosIdeaisLavagem = volumeMax;

    const litrosRecomendados = Math.round(litrosIdeaisLavagem);

    // 🔹 Enxágue (com restrição física)
    const enxagueCalculado = litrosIdeaisLavagem * 0.5;
    const litrosRecomendadosEnxague = Math.round(
        Math.max(enxagueCalculado, volumeMin)
    );

    // 🔹 Totais
    const totalAgua = litrosRecomendados + litrosRecomendadosEnxague;

    // 🔹 Eficiência total
    const eficiencia = totalAgua / cargaKg;

    // 🔹 Nível da máquina (baseado na lavagem)
    let nivel = "";
    if (litrosRecomendados <= 45) nivel = "extra-baixo";
    else if (litrosRecomendados <= 60) nivel = "baixo";
    else if (litrosRecomendados <= 75) nivel = "médio";
    else nivel = "alto";

    // 🔹 Status
    let status = "";
    if (eficiencia <= 20) status = "excelente";
    else if (eficiencia <= 40) status = "boa";
    else if (eficiencia <= 60) status = "média";
    else status = "baixa eficiência";

    return {
        carga: cargaKg,

        // lavagem
        litrosIdeais: Number(litrosIdeaisLavagem.toFixed(2)),
        litrosRecomendados,

        // enxágue
        litrosRecomendadosEnxague,

        // total
        totalAgua,

        eficiencia: Number(eficiencia.toFixed(2)),

        nivel,
        status
    };
};

export function gerarDadosGraficoEficiencia(registros) {
    const dados = calcularAguaLavagem(registros);

    return dados.map((item, index) => ({
        lavagem: index + 1, // 👈 eixo X sequencial
        eficiencia: item.eficienciaRelativaTotal
    }));
}

//Calculo de Eficiencia por lavagem individual
export function calcularEficienciaPorLavagem(lavagem) {
    if (!lavagem) return null;

    const capacidadeMax = 12;
    const volumeMin = 40;
    const volumeMax = 80;

    const peso = Number(lavagem.pesoRoupas) || 0;
    const litrosLavagem = Number(lavagem.litros) || 0;
    const litrosEnxague = Number(lavagem.enchague) || 0;

    // 🔹 Data formatada (mantendo padrão atual)
    const data = new Date(lavagem.data).toLocaleDateString('pt-BR', {
        timeZone: 'UTC'
    });

    // 🔹 IDEAL LAVAGEM (por lavagem individual)
    let litrosIdeaisLavagem =
        volumeMin + ((volumeMax - volumeMin) / capacidadeMax) * peso;

    if (litrosIdeaisLavagem > volumeMax) {
        litrosIdeaisLavagem = volumeMax;
    }

    // 🔹 IDEAL ENXÁGUE (por lavagem individual)
    const enxagueCalculado = litrosIdeaisLavagem * 0.5;
    const litrosIdeaisEnxague = Math.max(enxagueCalculado, volumeMin);

    // 🔹 TOTAIS
    const totalAgua = litrosLavagem + litrosEnxague;
    const totalIdeal = litrosIdeaisLavagem + litrosIdeaisEnxague;

    // 🔹 EFICIÊNCIA RELATIVA (por lavagem)
    const eficienciaRelativaLavagem =
        litrosIdeaisLavagem > 0 ? litrosLavagem / litrosIdeaisLavagem : 0;

    const eficienciaRelativaEnxague =
        litrosIdeaisEnxague > 0 ? litrosEnxague / litrosIdeaisEnxague : 0;

    const eficienciaRelativaTotal =
        totalIdeal > 0 ? totalAgua / totalIdeal : 0;

    // 🔹 EFICIÊNCIA L/kg (mantendo compatibilidade com sistema)
    const eficienciaLavagem =
        peso > 0 ? litrosLavagem / peso : 0;

    const eficienciaEnxague =
        peso > 0 ? litrosEnxague / peso : 0;

    const eficienciaTotal =
        peso > 0 ? totalAgua / peso : 0;

    return {
        data,

        // 🔹 BASE
        peso: Number(peso.toFixed(2)),
        litrosLavagem,
        litrosEnxague,

        // 🔹 TOTAIS
        totalAgua: Number(totalAgua.toFixed(2)),
        totalIdeal: Number(totalIdeal.toFixed(2)),

        // 🔹 IDEAIS (CORRETOS agora)
        litrosIdeaisLavagem: Number(litrosIdeaisLavagem.toFixed(2)),
        litrosIdeaisEnxague: Number(litrosIdeaisEnxague.toFixed(2)),

        // 🔹 EFICIÊNCIA RELATIVA
        eficienciaRelativaLavagem: Number(eficienciaRelativaLavagem.toFixed(2)),
        eficienciaRelativaEnxague: Number(eficienciaRelativaEnxague.toFixed(2)),
        eficienciaRelativaTotal: Number(eficienciaRelativaTotal.toFixed(2)),

        // 🔹 EFICIÊNCIA L/kg
        eficienciaLavagem: Number(eficienciaLavagem.toFixed(2)),
        eficienciaEnxague: Number(eficienciaEnxague.toFixed(2)),
        eficienciaTotal: Number(eficienciaTotal.toFixed(2))
    };
};

//Função auxiliar que calcula os valores de Lavagem e Enxague individual de cada registro de Lavagem
export function calcularAguaLavagem(registros) {
    if (!Array.isArray(registros)) return [];

    const agrupado = {};

    registros.forEach((lavagem) => {
        const resultado = calcularEficienciaPorLavagem(lavagem);

        if (!resultado) return;

        const data = resultado.data;

        if (!agrupado[data]) {
            agrupado[data] = {
                data,

                // 🔹 ACUMULADORES REAIS
                totalLavagem: 0,
                totalEnxague: 0,
                totalAgua: 0,
                pesoTotal: 0,

                // 🔹 ACUMULADORES IDEAIS (AGORA CORRETOS)
                litrosIdeaisLavagem: 0,
                litrosIdeaisEnxague: 0,
                totalIdeal: 0
            };
        }

        // 🔹 SOMA REAL (igual antes)
        agrupado[data].totalLavagem += resultado.litrosLavagem;
        agrupado[data].totalEnxague += resultado.litrosEnxague;
        agrupado[data].totalAgua += resultado.totalAgua;
        agrupado[data].pesoTotal += resultado.peso;

        // 🔥 🔥 🔥 AQUI ESTÁ A CORREÇÃO PRINCIPAL 🔥 🔥 🔥
        // soma os IDEAIS INDIVIDUAIS (não recalcula por peso total)
        agrupado[data].litrosIdeaisLavagem += resultado.litrosIdeaisLavagem;
        agrupado[data].litrosIdeaisEnxague += resultado.litrosIdeaisEnxague;
        agrupado[data].totalIdeal += resultado.totalIdeal;
    });

    const resultadoFinal = Object.values(agrupado).map((item) => {

        // 🔹 EFICIÊNCIA RELATIVA (AGORA CORRETA)
        const eficienciaRelativaLavagem =
            item.litrosIdeaisLavagem > 0
                ? item.totalLavagem / item.litrosIdeaisLavagem
                : 0;

        const eficienciaRelativaEnxague =
            item.litrosIdeaisEnxague > 0
                ? item.totalEnxague / item.litrosIdeaisEnxague
                : 0;

        const eficienciaRelativaTotal =
            item.totalIdeal > 0
                ? item.totalAgua / item.totalIdeal
                : 0;

        // 🔹 EFICIÊNCIA L/kg (mantida)
        const eficienciaLavagem =
            item.pesoTotal > 0 ? item.totalLavagem / item.pesoTotal : 0;

        const eficienciaEnxague =
            item.pesoTotal > 0 ? item.totalEnxague / item.pesoTotal : 0;

        const eficienciaTotal =
            item.pesoTotal > 0 ? item.totalAgua / item.pesoTotal : 0;

        // 🔍 LOG DE VALIDAÇÃO (PASSO 3)
        // console.log('📊 EFR v2 - DIA:', item.data, {
        //     pesoTotal: item.pesoTotal,
        //     totalLavagem: item.totalLavagem,
        //     totalEnxague: item.totalEnxague,
        //     litrosIdeaisLavagem: item.litrosIdeaisLavagem,
        //     litrosIdeaisEnxague: item.litrosIdeaisEnxague,
        //     totalIdeal: item.totalIdeal,
        //     eficienciaRelativaTotal
        // });

        return {
            data: item.data,

            // 🔹 TOTAIS
            pesoTotal: Number(item.pesoTotal.toFixed(2)),
            totalLavagem: Number(item.totalLavagem.toFixed(2)),
            totalEnxague: Number(item.totalEnxague.toFixed(2)),
            totalAgua: Number(item.totalAgua.toFixed(2)),

            // 🔹 EFICIÊNCIA L/kg
            eficienciaLavagem: Number(eficienciaLavagem.toFixed(2)),
            eficienciaEnxague: Number(eficienciaEnxague.toFixed(2)),
            eficienciaTotal: Number(eficienciaTotal.toFixed(2)),

            // 🔹 IDEAIS (AGORA CORRETOS)
            litrosIdeaisLavagem: Number(item.litrosIdeaisLavagem.toFixed(2)),
            litrosIdeaisEnxague: Number(item.litrosIdeaisEnxague.toFixed(2)),
            totalIdeal: Number(item.totalIdeal.toFixed(2)),

            // 🔹 EFICIÊNCIA RELATIVA
            eficienciaRelativaLavagem: Number(eficienciaRelativaLavagem.toFixed(2)),
            eficienciaRelativaEnxague: Number(eficienciaRelativaEnxague.toFixed(2)),
            eficienciaRelativaTotal: Number(eficienciaRelativaTotal.toFixed(2))
        };
    });

    // 🔹 Ordenação mantida (igual ao original)
    return resultadoFinal.sort((a, b) => {
        const [d1, m1, y1] = a.data.split('/');
        const [d2, m2, y2] = b.data.split('/');

        return new Date(`${y2}-${m2}-${d2}`) - new Date(`${y1}-${m1}-${d1}`);
    });
};


// Calculo de Eficiencia Global (modelo por lavagem)
export function calcularEfrGeralLavagens(registros) {
  if (!registros || registros.length === 0) {
    return {
      efrGeral: 0,
      efrLavagem: 0,
      efrEnxague: 0
    };
  }

  let volumeRealLavagem = 0;
  let volumeRealEnxague = 0;

  let volumeIdealLavagem = 0;

  registros.forEach((r) => {
    const litros = r.litros || 0;
    const enxague = r.enchague || 0;
    const carga = r.pesoRoupas || 0;

    // 🔹 Reais
    volumeRealLavagem += litros;
    volumeRealEnxague += enxague;

    // 🔹 Ideal por lavagem
    const Li = 40 + ((80 - 40) / 12) * carga;
    volumeIdealLavagem += Li;
  });

  const totalLavagens = registros.length;

  // 🔹 Ideal enxague
  const volumeIdealEnxague = 40 * totalLavagens;

  // 🔹 Totais
  const volumeRealTotal = volumeRealLavagem + volumeRealEnxague;
  const volumeIdealTotal = volumeIdealLavagem + volumeIdealEnxague;

  // 🔹 EFRs
  const efrLavagem =
    volumeIdealLavagem > 0
      ? volumeRealLavagem / volumeIdealLavagem
      : 0;

  const efrEnxague =
    volumeIdealEnxague > 0
      ? volumeRealEnxague / volumeIdealEnxague
      : 0;

  const efrGeral =
    volumeIdealTotal > 0
      ? volumeRealTotal / volumeIdealTotal
      : 0;

  return {
    volumeRealLavagem,
    volumeRealEnxague,
    volumeIdealLavagem,
    volumeIdealEnxague,
    volumeRealTotal,
    volumeIdealTotal,
    efrLavagem,
    efrEnxague,
    efrGeral
  };
};

export function calcularMediaDiaria(historico){
     if (!historico || historico.length === 0) return 0;

  // 1. Agrupar litros por data (usando apenas a parte da data YYYY-MM-DD)
  const consumoPorDia = historico.reduce((acc, log) => {
    const data = log.data.split('T')[0];
    acc[data] = (acc[data] || 0) + log.litros;
    return acc;
  }, {});

  // 2. Calcular a média baseada nos dias únicos encontrados
  const valoresDiarios = Object.values(consumoPorDia);
  const totalGeral = valoresDiarios.reduce((acc, litros) => acc + litros, 0);
  
  return (totalGeral / valoresDiarios.length).toFixed(2);
};

// 🔄 Calcula número de recirculações com base no hidrômetro
export function calcularRecirculacoes({
    hidrometroInicial,
    hidrometroFinal,
    volume
}) {
    const hi = Number(hidrometroInicial);
    const hf = Number(hidrometroFinal);
    const vol = Number(volume);

    // validações básicas
    if (!hi || !hf || !vol) return "";
    if (hf <= hi) return "";

    // diferença no hidrômetro
    const diferenca = hf - hi;

    // converte para litros (multiplica por 10)
    const volumeRecirculado = diferenca * 10;

    if (volumeRecirculado === 0) return "";

    // número de recirculações
    const recirculacoes = volumeRecirculado/ vol;

    // arredonda para 1 casa decimal
    return Number(recirculacoes.toFixed(1));
};

// ⏱️ Calcula tempo de recirculação em minutos
export function calcularTempoRecirculacao(horaInicial, horaFinal) {
    if (!horaInicial || !horaFinal) return "";

    const [h1, m1] = horaInicial.split(":").map(Number);
    const [h2, m2] = horaFinal.split(":").map(Number);

    const minutosInicial = h1 * 60 + m1;
    const minutosFinal = h2 * 60 + m2;

    const diferenca = minutosFinal - minutosInicial;

    // evita valores negativos (ex: erro de input)
    if (diferenca <= 0) return "";

    return diferenca; // já está em minutos
};