import analisarVelocidades from "../tecnicos/analisarVelocidades";

export default function executarPipeLineCinematico(registros) {
    // =========================================================
    // 1. EXECUTA O TÉCNICO DE VELOCIDADE
    // =========================================================
    const tecnicoVelocidade = analisarVelocidades(registros);

    // =========================================================
    // 2. VALIDA O PIPELINE
    // =========================================================
    if (!tecnicoVelocidade.analiseValidada) {
        return {
            pipelineValido: false,
            motivoPipeline: tecnicoVelocidade.motivoDeValidacao,
            tecnicoVelocidade,
        };
    }

    return {
        pipelineValido: true,
        motivoPipeline: "Pipeline executado com sucesso",
        tecnicoVelocidade
    };
}