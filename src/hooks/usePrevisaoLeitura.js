import { useMemo } from "react";
import useHidrometros from "./useHidrometros";
import { useUltimaLeitura } from "./useUltimaLeitura";
import {
    calcularCoeficienteA,
    extrair3PrimeirosDigitos
} from "../services/hidrometroService";
import { calcularIntervaloDias } from "../services/dataUtils";

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

        // 📅 ETAPA 2 — Dias (CORRIGIDO)
        const ultima = leituras[0];

        const dataSanepar = ultima.data.split("T")[0];
        const hoje = new Date().toISOString().split("T")[0];

        const dias = calcularIntervaloDias(dataSanepar, hoje);

        // 🔥 ETAPA 3 — Consumo estimado (litros)
        const consumoLitros = a * dias;

        // 🔁 Converter para unidades do hidrômetro
        const consumoUnidades = Math.floor(consumoLitros / 10);

        // 🔢 Leitura atual completa
        const leituraAtualCompleta = [...dados]
            .sort((a, b) => new Date(b.data) - new Date(a.data))[0]?.leitura;

        if (leituraAtualCompleta == null) {
            return {
                status: "erro",
                mensagem: "Sem leitura atual"
            };
        }

        // 🔥 valor estimado do hidrômetro (3 primeiros dígitos)
        const leituraPrevista3 = Math.floor(consumoLitros / 10);

        // 🔢 consumo real (diferença SANEPAR)
        const consumoPrevisto = leituraPrevista3 - ultima.leitura;

        //Calculando o erro:
        // 🔢 leitura real atual (3 dígitos)
        const leituraAtual3 = extrair3PrimeirosDigitos(leituraAtualCompleta);

        // 📊 consumo real
        const consumoReal = leituraAtual3 - ultima.leitura;

        // ⚠️ erro do modelo
        const erroAbsoluto = consumoPrevisto - consumoReal;

        const erroPercentual = consumoReal !== 0
            ? (Math.abs(erroAbsoluto) / consumoReal) * 100
            : null;


        return {
            status: "ok",

            coeficienteA: a,
            diasDesdeSanepar: dias,

            consumoLitros,
            consumoUnidades: consumoPrevisto, // 👈 agora correto
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
        };

    }, [dados, leituras]);

    return resultado;
}