export function calcularProdutoCloro(concentracao, reservatorio) {
    if (!concentracao || !reservatorio) return 0;

    const c = Number(concentracao);
    const l = Number(reservatorio);

    const resultado = (l * (15 + 5 * c)) / 1000;

    return Number(resultado.toFixed(2)); // arredonda para 2 casas
};

export function analisarDosagem(registros) {
    if (!registros || registros.length === 0) {
        return {
            dadosGrafico: [],
            analise: null
        };
    }

    // 1. Ordenar (mais antigo → mais recente)
    const ordenados = [...registros].sort(
        (a, b) => new Date(a.data) - new Date(b.data)
    );

    // 2. Calcular dosagem + estruturar dados do gráfico
    const dadosGrafico = ordenados.map((item, index) => {
        const produto = Number(item.produto);
        const reservatorio = Number(item.reservatorio);

        const dosagem = reservatorio > 0
            ? produto / reservatorio
            : 0;
            
         
        return {
            indice: index + 1,
            dosagem,
            produto: item.produto,
            reservatorio: item.reservatorio,
            data: item.data
        };
    });

    const valores = dadosGrafico.map(d => d.dosagem);

    // 3. Média
    const media = valores.reduce((acc, v) => acc + v, 0) / valores.length;

    // 4. Desvio padrão
    const variancia = valores.reduce((acc, v) => acc + Math.pow(v - media, 2), 0) / valores.length;
    const desvio = Math.sqrt(variancia);

    // 5. Consistência
    let consistencia = "alta";
    if (desvio > media * 0.5) consistencia = "baixa";
    else if (desvio > media * 0.2) consistencia = "media";

    // 6. Tendência (simples: início vs fim)
    const primeiro = valores[0];
    const ultimo = valores[valores.length - 1];

    let tendencia = "estavel";
    if (ultimo > primeiro * 1.1) tendencia = "subindo";
    else if (ultimo < primeiro * 0.9) tendencia = "descendo";

    // 7. Faixa ideal (ajustável depois)
    const IDEAL_MIN = 0.02;
    const IDEAL_MAX = 0.05;

    let nivel = "ideal";
    if (media < IDEAL_MIN) nivel = "baixo";
    else if (media > IDEAL_MAX) nivel = "alto";

    // 8. Anomalias (outliers simples)
    const anomalias = valores.some(v => v > media * 2 || v < media * 0.5);

    // 9. Conclusão automática
    let conclusao = "";

    if (consistencia === "alta" && nivel === "ideal") {
        conclusao = "Sistema operando de forma estável e dentro da dosagem ideal.";
    } else if (nivel === "alto") {
        conclusao = "Dosagem acima do ideal. Possível desperdício de cloro.";
    } else if (nivel === "baixo") {
        conclusao = "Dosagem abaixo do ideal. Risco de desinfecção insuficiente.";
    } else if (consistencia === "baixa") {
        conclusao = "Alta variação na dosagem. Processo inconsistente.";
    } else {
        conclusao = "Sistema operando com pequenas variações.";
    }

    if (anomalias) {
        conclusao += " Foram detectados picos fora do padrão.";
    }

    console.log(dadosGrafico);

    // 10. Retorno final
    return {
        dadosGrafico,
        analise: {
            media,
            desvio,
            tendencia,
            consistencia,
            nivel,
            anomalias,
            conclusao
        }
    };
};

export const getUltimaCloracao = (registros) => {
    if (!registros || registros.length === 0) return null;

    // Ordena do mais recente para o mais antigo
    const ordenado = [...registros].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return ordenado[0];
};

export const calcularMetricasCloracao = (registros) => {
    if (!registros || registros.length === 0) {
        return {
            volumeMedio: 0,
            produtoMedio: 0,
            concentracaoMedia: 0
        };
    }

    const totalRegistros = registros.length;

    let somaVolume = 0;
    let somaProduto = 0;

    registros.forEach((r) => {
        somaVolume += Number(r.reservatorio) || 0;
        somaProduto += Number(r.produto) || 0;
    });

    const volumeMedio = somaVolume / totalRegistros;
    const produtoMedio = somaProduto / totalRegistros;

    // ⚠️ Relação média (produto por litro)
    const concentracaoMedia = volumeMedio > 0
        ? produtoMedio / volumeMedio
        : 0;

    return {
        volumeMedio,
        produtoMedio,
        concentracaoMedia
    };
};