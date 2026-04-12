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

// Calculo de litros de água + enxague + eficiência (L/kg)
export function calcularAguaLavagem(registros) {
    if (!Array.isArray(registros)) return [];

    const agrupado = {};

    registros.forEach((item) => {
        const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });

        const litros = Number(item.litros) || 0;
        const enchague = Number(item.enchague) || 0;
        const peso = Number(item.pesoRoupas) || 0;

        const total = litros + enchague;

        if (!agrupado[dataFormatada]) {
            agrupado[dataFormatada] = {
                totalAgua: 0,
                pesoTotal: 0
            };
        }

        agrupado[dataFormatada].totalAgua += total;
        agrupado[dataFormatada].pesoTotal += peso;
    });

    // transformar em array + calcular eficiência
    const resultado = Object.entries(agrupado).map(([data, valores]) => {
        const { totalAgua, pesoTotal } = valores;

        const litrosPorKg = pesoTotal > 0 
            ? totalAgua / pesoTotal 
            : 0;

        return {
            data,
            totalAgua,
            pesoTotal,
            litrosPorKg: Number(litrosPorKg.toFixed(2)) // arredondado
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
function classificarEficiencia(litrosPorKg) {
    if (litrosPorKg <= 60) return 'BOA';
    if (litrosPorKg <= 90) return 'MÉDIA';
    return 'RUIM';
}

// Dados para tabela
export function gerarDadosTabelaEficiencia(registros) {
    const dados = calcularAguaLavagem(registros);

    return dados.map(item => ({
        ...item,
        indicador: classificarEficiencia(item.litrosPorKg)
    }));
};
