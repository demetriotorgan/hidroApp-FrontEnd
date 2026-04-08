import { useMemo } from "react";
import useHidrometros from "./useHidrometros";
import { useUltimaLeitura } from "./useUltimaLeitura";
import {
    calcularCoeficienteA,
    extrair3PrimeirosDigitos
} from "../services/hidrometroService";
import { calcularIntervaloDias } from "../services/dataUtils";
import { calcularPrevisaoFatura } from "../services/previsaoService";
import { calcularPrevisaoFaturaComAjuste } from "../services/previsaoService";

export function usePrevisaoLeitura() {
    const { dados } = useHidrometros();
    const { leituras } = useUltimaLeitura();


    const resultado = useMemo(() => {

        if (!dados?.length) {
            return { status: "sem_dados", mensagem: "Sem dados de hidrômetro" };
        }

        if (!leituras?.length) {
            return { status: "sem_sanepar", mensagem: "Sem leitura da SANEPAR" };
        }

        // 📊 ETAPA 1 — Modelo
        const modelo = calcularCoeficienteA(dados);

        if (modelo.status !== "ok") {
            return { ...modelo };
        }

        const a = modelo.valor; // litros/dia

        // 📅 ETAPA 2 — Dias
        const ultima = leituras[0];

        const dataSanepar = ultima.data.split("T")[0];
        const hoje = new Date().toISOString().split("T")[0];

        const dias = calcularIntervaloDias(dataSanepar, hoje);

        // 🔥 ETAPA 3 — Consumo estimado

        //-Fatura prevista
        const previsaoFatura = calcularPrevisaoFatura(dados, ultima);

        const consumoLitros = a * dias;
        const consumoM3 = consumoLitros / 1000;

        // 🔢 Leitura atual completa
        const leituraAtualCompleta = [...dados]
            .sort((a, b) => new Date(b.data) - new Date(a.data))[0]?.leitura;

        if (leituraAtualCompleta == null) {
            return {
                status: "erro",
                mensagem: "Sem leitura atual"
            };
        }

        // 🔢 leitura real atual (3 dígitos)
        const leituraAtual3 = extrair3PrimeirosDigitos(leituraAtualCompleta);

        // 📊 consumo real
        const consumoReal = leituraAtual3 - ultima.leitura;

        // 🔥 leitura prevista (modelo correto)
        const leituraPrevista3 = Math.floor(
            ultima.leitura + consumoM3
        );

        // 🔥 consumo previsto (m³ com 1 casa)
        const consumoPrevisto = Number(consumoM3.toFixed(1));

        // ⚠️ erro
        const erroAbsoluto = leituraPrevista3 - leituraAtual3;



        const erroPercentual = leituraAtual3 !== 0
            ? (Math.abs(erroAbsoluto) / leituraAtual3) * 100
            : null;

        const previsaoFaturaAjustada = calcularPrevisaoFaturaComAjuste(
            dados,
            ultima,
            erroAbsoluto,
            dias
        );

        return {
            status: "ok",

            coeficienteA: a,
            diasDesdeSanepar: dias,

            consumoLitros,
            consumoUnidades: Math.floor(consumoM3),
            consumoPrevisto,

            leituraPrevista3,
            leituraSanepar: ultima.leitura,

            confiabilidade: modelo.confiabilidade,
            nivel: modelo.nivel,
            cor: modelo.cor,
            mensagem: modelo.mensagem,

            erroAbsoluto,
            erroPercentual,

            consumoReal,
            leituraAtual3,
            previsaoFatura,
            previsaoFaturaAjustada
        };

    }, [dados, leituras]);

    return resultado;
}