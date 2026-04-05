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