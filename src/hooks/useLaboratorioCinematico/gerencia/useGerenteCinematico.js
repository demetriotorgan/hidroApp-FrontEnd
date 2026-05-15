    /**
 * 🧠 GERENTE CINEMÁTICO
 *
 * Responsável por:
 * - receber os insumos do Dashboard
 * - aguardar o carregamento da API
 * - validar a disponibilidade dos registros do hidrômetro
 * - acionar o pipeline cinemático
 * - devolver um pacote consolidado para a UI
 *
 * NÃO é responsabilidade do gerente:
 * - executar cálculos matemáticos
 * - analisar velocidade ou aceleração diretamente
 * - montar gráficos
 *
 * Fluxo:
 * Dashboard
 *    ↓
 * useGerenteCinematico({ registros, loading })
 *    ↓
 * executarPipeLineCinematico(registros)
 *    ↓
 * retorno consolidado
 */

import { useMemo } from "react";
import executarPipeLineCinematico from "./executarPipeLineCinematico";

export default function useGerenteCinematico({registrosHidrometro = [], loading=false}){
const resultadoDeCinematica = useMemo(() => {
    // =========================================================
    // 1. AGUARDA O CARREGAMENTO DOS DADOS
    // =========================================================
    if (loading) {
      return {
        pronto: false,
        gerenteValido: false,
        motivoGerente: "Carregando registros do hidrômetro...",
        pipeline: null,
      };
    }

    // =========================================================
    // 2. VALIDA A LISTA DE REGISTROS
    // =========================================================
    if (!Array.isArray(registrosHidrometro)) {
      return {
        pronto: false,
        gerenteValido: false,
        motivoGerente: "Lista de registros inválida.",
        pipeline: null,
      };
    }

    if (registrosHidrometro.length === 0) {
      return {
        pronto: false,
        gerenteValido: false,
        motivoGerente: "Nenhum registro disponível.",
        pipeline: null,
      };
    }

    // =========================================================
    // 3. EXECUTA O PIPELINE CINEMÁTICO
    // =========================================================
    const pipeline = executarPipeLineCinematico(registrosHidrometro);

    // =========================================================
    // 4. VALIDA O RESULTADO DO PIPELINE
    // =========================================================
    if (!pipeline.pipelineValido) {
      return {
        pronto: false,
        gerenteValido: false,
        motivoGerente: pipeline.motivoPipeline,
        pipeline,
      };
    }

    // =========================================================
    // 5. PACOTE FINAL ENTREGUE À UI
    // =========================================================
    return {
      pronto: true,
      gerenteValido: true,
      motivoGerente: "Análise cinemática concluída com sucesso.",
      pipeline,
    };
  }, [registrosHidrometro, loading]);

  return {resultadoDeCinematica};
}