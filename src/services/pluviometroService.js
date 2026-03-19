// Função para calcular a altura da chuva (mm)
// baseado na altura da coluna de água (cm)

export const calcularChuvaMm = (alturaColuna) => {
  if (!alturaColuna || isNaN(alturaColuna)) return "";

  const altura = Number(alturaColuna);

  const chuva = 0.362 * altura;

  // opcional: limitar casas decimais
  return Number(chuva.toFixed(2));
};

export const calcularDiasSemChuva = (registros) => {
    // Verificação de segurança
    if (!registros || registros.length === 0) {
        return null; // ou 0, dependendo da sua regra
    }

    // Primeiro registro (mais recente)
    const dataUltimaChuva = new Date(registros[0].data);

    // Data atual
    const hoje = new Date();

    // Zerando horas para evitar erro de fração de dia
    dataUltimaChuva.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    // Diferença em milissegundos
    const diffMs = hoje - dataUltimaChuva;

    // Convertendo para dias
    const diffDias = diffMs / (1000 * 60 * 60 * 24);

    return Math.floor(diffDias);
};

export const obterMmUltimaChuva = (registros) => {
    if (!registros || registros.length === 0) {
        return null;
    }

    return registros[0].mm;
};

export const totalDeRegistrosDePluviometro = (registros)=>{
 // Verificação de segurança
    if (!registros || registros.length === 0) {
        return null; // ou 0, dependendo da sua regra
    }
    return registros.length
}

export const mediaMmChuva = (registros) => {
    // Segurança
    if (!registros || registros.length === 0) {
        return 0;
    }

    // Soma todos os mm
    const soma = registros.reduce((acc, item) => {
        return acc + (item.mm || 0);
    }, 0);

    // Calcula média
    const media = soma / registros.length;

    // Limita casas decimais
    return Number(media.toFixed(2));
};