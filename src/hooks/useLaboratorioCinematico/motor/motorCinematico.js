import { calcularConsumoUltimoRegistro } from "../../../services/hidrometroService";

export default function motorCinematico(registros) {
    // =========================================================
    // 1. VALIDAÇÃO DE ENTRADA
    // =========================================================

    // Deve existir um array
    if (!Array.isArray(registros)) {
        return {
            valido: false,
            motivo: 'Array de registros inválidos',
            listaDeVelocidades: [],
            listaDeAceleracao: [],

        };
    };

    // Para calcular velocidade é necessário:
    // - pelo menos 3 registros
    //
    // Exemplo:
    // registro[0] e registro[1] -> consumo atual
    // registro[1] e registro[2] -> consumo anterior
    //
    // Velocidade = consumoAtual - consumoAnterior
    if (registros.length < 3) {
        return {
            valido: false,
            motivo: 'Número de registros insuficientes',
            listaDeVelocidades: [],
            listaDeAceleracao: [],

        };
    };

    // Todos os registros precisam ter leitura numérica válida
    for (const registro of registros) {
        if (
            registro == null ||
            typeof registro.leitura !== "number" ||
            Number.isNaN(registro.leitura)
        ) {
            return {
                valido: false,
                motivo: 'Registros com leitura inválida',
                listaDeVelocidades: [],
                listaDeAceleracao: [],

            };
        }
    };
    // =========================================================
    // 2. DADOS VÁLIDOS
    // =========================================================
    const valido = true;
    const motivo = 'Dados de leitura validados'

    // As listas serão calculadas nas próximas etapas
    const listaDeVelocidades = [];
    const listaDeAceleracao = [];

    // =========================================================
    // 3. CALCULO DE CONSUMOS
    // =========================================================
    for (let i = 0; i < registros.length - 1; i++) {
        //seleciona sempre dois registros consecutivos
        const parDeRegistros = [registros[i], registros[i + 1]];

        //calcula o consumo
        const consumo = calcularConsumoUltimoRegistro(parDeRegistros);

        //Armazena o valor calculado na lista de velocidade
        listaDeVelocidades.push(consumo);
    }
    return {
        valido,
        motivo,
        listaDeVelocidades,
        listaDeAceleracao
    }
}