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

//Calculo da Eficiencia de Lavagem e Enxágues
export function calcularAguaLavagem(registros) {
    if (!Array.isArray(registros)) return [];

    const agrupado = {};

    registros.forEach((item) => {
        const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });

        const litrosLavagem = Number(item.litros) || 0;
        const litrosEnxague = Number(item.enchague) || 0;
        const peso = Number(item.pesoRoupas) || 0;

        if (!agrupado[dataFormatada]) {
            agrupado[dataFormatada] = {
                totalLavagem: 0,
                totalEnxague: 0,
                pesoTotal: 0
            };
        }

        agrupado[dataFormatada].totalLavagem += litrosLavagem;
        agrupado[dataFormatada].totalEnxague += litrosEnxague;
        agrupado[dataFormatada].pesoTotal += peso;
    });

    const capacidadeMax = 12;
    const volumeMin = 40;
    const volumeMax = 80;

    const resultado = Object.entries(agrupado).map(([data, valores]) => {
        const { totalLavagem, totalEnxague, pesoTotal } = valores;

        const totalAgua = totalLavagem + totalEnxague;

        // 🔹 EVITAR divisão por zero
        const litrosPorKgLavagem = pesoTotal > 0 ? totalLavagem / pesoTotal : 0;
        const litrosPorKgEnxague = pesoTotal > 0 ? totalEnxague / pesoTotal : 0;
        const litrosPorKgTotal = pesoTotal > 0 ? totalAgua / pesoTotal : 0;

        // 🔹 IDEAL LAVAGEM (modelo da máquina)
        let litrosIdeaisLavagem = volumeMin + ((volumeMax - volumeMin) / capacidadeMax) * pesoTotal;

        if (litrosIdeaisLavagem > volumeMax) {
            litrosIdeaisLavagem = volumeMax;
        }

        // 🔹 IDEAL ENXÁGUE (com restrição mínima)
        const enxagueCalculado = litrosIdeaisLavagem * 0.5;
        const litrosIdeaisEnxague = Math.max(enxagueCalculado, volumeMin);

        const totalIdeal = litrosIdeaisLavagem + litrosIdeaisEnxague;

        // 🔹 EFICIÊNCIA RELATIVA
        const eficienciaRelativaLavagem = litrosIdeaisLavagem > 0
            ? totalLavagem / litrosIdeaisLavagem
            : 0;

        const eficienciaRelativaEnxague = litrosIdeaisEnxague > 0
            ? totalEnxague / litrosIdeaisEnxague
            : 0;

        const eficienciaRelativaTotal = totalIdeal > 0
            ? totalAgua / totalIdeal
            : 0;

        return {
            data,

            // 🔹 TOTAIS
            pesoTotal: Number(pesoTotal.toFixed(2)),
            totalLavagem,
            totalEnxague,
            totalAgua,

            // 🔹 EFICIÊNCIA (L/kg)
            eficienciaLavagem: Number(litrosPorKgLavagem.toFixed(2)),
            eficienciaEnxague: Number(litrosPorKgEnxague.toFixed(2)),
            eficienciaTotal: Number(litrosPorKgTotal.toFixed(2)),

            // 🔹 IDEAIS
            litrosIdeaisLavagem: Number(litrosIdeaisLavagem.toFixed(2)),
            litrosIdeaisEnxague: Number(litrosIdeaisEnxague.toFixed(2)),
            totalIdeal: Number(totalIdeal.toFixed(2)),

            // 🔹 EFICIÊNCIA RELATIVA
            eficienciaRelativaLavagem: Number(eficienciaRelativaLavagem.toFixed(2)),
            eficienciaRelativaEnxague: Number(eficienciaRelativaEnxague.toFixed(2)),
            eficienciaRelativaTotal: Number(eficienciaRelativaTotal.toFixed(2))
        };
    });

    return resultado.sort((a, b) => {
        const [d1, m1, y1] = a.data.split('/');
        const [d2, m2, y2] = b.data.split('/');

        return new Date(`${y1}-${m1}-${d1}`) - new Date(`${y2}-${m2}-${d2}`);
    });
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

        indicadorTotal: classificarEficiencia(item.eficienciaRelativaTotal)
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
}