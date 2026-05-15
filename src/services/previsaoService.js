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
    // console.log("========================================");
    // console.log("🔍 calcularPrevisaoFaturaComAjuste()");
    // console.log("========================================");

    // console.log("📥 Parâmetros recebidos:");
    // console.log("dados.length:", dados?.length);
    // console.log("leituraSanepar:", leituraSanepar);
    // console.log("erroAbsoluto:", erroAbsoluto);
    // console.log("diasDesdeSanepar:", diasDesdeSanepar);

    // -----------------------------------
    // Validações iniciais
    // -----------------------------------
  
    if (!dados?.length) {
        console.warn("⚠️ Sem dados para calcular.");
        return { status: "sem_dados" };
    }

    if (!leituraSanepar) {
        console.warn("⚠️ Leitura da Sanepar não informada.");
        return { status: "sem_sanepar" };
    }

    if (erroAbsoluto == null || diasDesdeSanepar == null) {
        console.warn("⚠️ erroAbsoluto ou diasDesdeSanepar é null/undefined.");
        return { status: "sem_erro" };
    }   

    // -----------------------------------
    // Modelo matemático
    // -----------------------------------
    const modelo = calcularCoeficienteA(dados);

    // console.log("📈 Resultado do modelo:", modelo);

    if (modelo.status !== "ok") {
        console.warn("⚠️ Modelo retornou status diferente de 'ok'.");
        return { ...modelo };
    }

    const a = modelo.valor;
    console.log("📌 Coeficiente A:", a);

    // -----------------------------------
    // Configuração da fatura
    // -----------------------------------
    const diasFatura = 31;
    // console.log("📅 diasFatura:", diasFatura);

    // -----------------------------------
    // Consumo previsto
    // -----------------------------------
    const consumoLitros = a * diasFatura;
    const consumoM3 = consumoLitros / 1000;

    // console.log("💧 consumoLitros:", consumoLitros);
    // console.log("💧 consumoM3:", consumoM3);

    const leituraBase = Number(leituraSanepar.leitura);

    // console.log("📏 leituraBase:", leituraBase);

    const leituraPrevistaFatura = Math.floor(
        leituraBase + consumoM3
    );

    // console.log("📏 leituraPrevistaFatura:", leituraPrevistaFatura);

    // -----------------------------------
    // Ajuste pelo erro
    // -----------------------------------
    let erroPorDia = 0;
    let erroProjetado = 0;

    if(diasDesdeSanepar > 0){
        erroPorDia = erroAbsoluto / diasDesdeSanepar;
        erroProjetado = erroPorDia * diasFatura;
    }  

    // console.log("🧠 erroPorDia:", erroPorDia);
    // console.log("🧠 erroProjetado:", erroProjetado);

    // Verifica se gerou Infinity ou NaN
    // if (!Number.isFinite(erroPorDia)) {
    //     console.error("🚨 erroPorDia não é finito!");
    //     console.error("erroAbsoluto:", erroAbsoluto);
    //     console.error("diasDesdeSanepar:", diasDesdeSanepar);
    // }

    // if (!Number.isFinite(erroProjetado)) {
    //     console.error("🚨 erroProjetado não é finito!");
    // }

    const leituraCorrigida = Math.floor(
        leituraPrevistaFatura - erroProjetado
    );

    // console.log("📏 leituraCorrigida:", leituraCorrigida);

    // if (Number.isNaN(leituraCorrigida)) {
    //     console.error("🚨 leituraCorrigida resultou em NaN!");
    // }

    const resultado = {
        status: "ok",
        diasFatura,
        consumoM3Fatura: Number(consumoM3.toFixed(1)),

        leituraPrevistaFatura,
        leituraCorrigida,

        erroProjetado: Number(erroProjetado.toFixed(2)),
        erroPorDia: Number(erroPorDia.toFixed(4)),

        coeficienteA: a
    };

    // console.log("✅ Resultado final:", resultado);
    // console.log("========================================");

    return resultado;
}