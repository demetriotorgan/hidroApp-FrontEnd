export function calcularProdutoCloro(concentracao, reservatorio) {
    if (!concentracao || !reservatorio) return 0;

    const c = Number(concentracao);
    const l = Number(reservatorio);

    const resultado = (l * (15 + 5 * c)) / 1000;

    return Number(resultado.toFixed(2)); // arredonda para 2 casas
}