import { calcularCoeficienteA, extrair3PrimeirosDigitos } from "./hidrometroService";

// services/previsaoService.js
export function calcularComparacao(consumoDoPeriodo, estimativa) {
    if (!consumoDoPeriodo || !estimativa || estimativa.erro) return null;

    return {
        real: consumoDoPeriodo.consumoLitros,
        estimado: estimativa.consumo,
        diferenca: estimativa.consumo - consumoDoPeriodo.consumoLitros,
        erroPercentual:
            ((estimativa.consumo - consumoDoPeriodo.consumoLitros) /
                consumoDoPeriodo.consumoLitros) * 100
    };
};




export function calcularPrevisaoFatura(dados, leituraSanepar) {

    if (!dados?.length) {
        return { status: "sem_dados" };
    }

    if (!leituraSanepar) {
        return { status: "sem_sanepar" };
    }

    // 📊 Modelo
    const modelo = calcularCoeficienteA(dados);

    if (modelo.status !== "ok") {
        return { ...modelo };
    }

    const a = modelo.valor;

    // 📅 Dias fixos da fatura
    const diasFatura = 31;

    // 🔥 Consumo estimado
    const consumoLitros = a * diasFatura;
    const consumoM3 = consumoLitros / 1000;

    // 🔢 Leitura base
    const leituraBase = Number(leituraSanepar.leitura);

    // 🔮 Leitura prevista da fatura
    const leituraPrevistaFatura = Math.floor(
        leituraBase + consumoM3
    );

    return {
        status: "ok",

        diasFatura,

        consumoLitrosFatura: consumoLitros,
        consumoM3Fatura: Number(consumoM3.toFixed(1)),

        leituraPrevistaFatura,

        coeficienteA: a,
    };
};

export function calcularPrevisaoFaturaComAjuste(
    dados,
    leituraSanepar,
    erroAbsoluto,
    diasDesdeSanepar
) {

    if (!dados?.length) {
        return { status: "sem_dados" };
    }

    if (!leituraSanepar) {
        return { status: "sem_sanepar" };
    }

    if (erroAbsoluto == null || diasDesdeSanepar == null) {
        return { status: "sem_erro" };
    }

    // 📊 Modelo
    const modelo = calcularCoeficienteA(dados);

    if (modelo.status !== "ok") {
        return { ...modelo };
    }

    const a = modelo.valor;

    // 📅 Fatura padrão
    const diasFatura = 31;

    // 🔥 Consumo previsto
    const consumoLitros = a * diasFatura;
    const consumoM3 = consumoLitros / 1000;

    const leituraBase = Number(leituraSanepar.leitura);

    const leituraPrevistaFatura = Math.floor(
        leituraBase + consumoM3
    );

    // 🧠 AJUSTE PELO ERRO
    const erroPorDia = erroAbsoluto / diasDesdeSanepar;
    const erroProjetado = erroPorDia * diasFatura;

    const leituraCorrigida = Math.floor(
        leituraPrevistaFatura - erroProjetado
    );

    return {
        status: "ok",
        diasFatura,
        consumoM3Fatura: Number(consumoM3.toFixed(1)),

        leituraPrevistaFatura,
        leituraCorrigida,

        erroProjetado: Number(erroProjetado.toFixed(2)),
        erroPorDia: Number(erroPorDia.toFixed(4)),

        coeficienteA: a
    };
};

