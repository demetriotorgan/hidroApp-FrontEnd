export function calcularAcido(pHObjetivo, volume, pHInicial) {
    if (
        isNaN(pHObjetivo) ||
        isNaN(volume) ||
        isNaN(pHInicial)
    ) {
        return '';
    }

    const expoente = (pHInicial - pHObjetivo) / 3.46;
    const fator = Math.exp(expoente);

    return volume * (fator - 1);
}