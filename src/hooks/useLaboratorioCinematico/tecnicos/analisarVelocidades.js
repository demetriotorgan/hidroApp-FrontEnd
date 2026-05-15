import motorCinematico from '../motor/motorCinematico';

export default function analisarVelocidades(registros) {
    // =========================================================
    // 1. EXECUTA O MOTOR CINEMÁTICO
    // =========================================================
    const resultado = motorCinematico(registros);

    const {
        valido,
        motivo,
        listaDeVelocidades,
    } = resultado;

    console.log('Lista de Velocidades: ', listaDeVelocidades);

    // =========================================================
    // 2. PROPAGA FALHA DE VALIDAÇÃO
    // =========================================================
    if (!valido) {
        return {
            analiseValidada: false,
            motivoDeValidacao: motivo,
            velocidadeAtual: 0,
            velocidadeUltimos3Dias: 0,
            velocidadeSemanal: 0,
        };
    };

    // =========================================================
    // 3. VELOCIDADE ATUAL
    // =========================================================
    // A velocidade atual corresponde ao primeiro valor da lista,
    // que representa o consumo calculado a partir dos dois
    // registros mais recentes.
    //
    // Exemplo:
    // registros[0] e registros[1]
    //
    // Se por algum motivo a lista estiver vazia, retorna 0.
    const velocidadeAtual =
        listaDeVelocidades.length > 0
            ? listaDeVelocidades[0]
            : 0;
    // =========================================================
    // 4. RETORNO
    // =========================================================        
    return {
        analiseValidada: true,
        motivoDeValidacao: motivo,
        velocidadeAtual,
        velocidadeUltimos3Dias: 0,
        velocidadeSemanal:0,
    };
}