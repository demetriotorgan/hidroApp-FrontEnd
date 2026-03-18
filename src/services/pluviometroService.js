// Função para calcular a altura da chuva (mm)
// baseado na altura da coluna de água (cm)

export const calcularChuvaMm = (alturaColuna) => {
  if (!alturaColuna || isNaN(alturaColuna)) return "";

  const altura = Number(alturaColuna);

  const chuva = 0.362 * altura;

  // opcional: limitar casas decimais
  return Number(chuva.toFixed(2));
};