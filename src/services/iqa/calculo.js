export function calcularIQAFinal(I_pH, I_cl, I_visual, critico) {
  let IQA =
    0.3 * I_pH +
    0.4 * I_cl +
    0.3 * I_visual;

  if (critico) {
    IQA = Math.min(IQA, 40);
  }

  return Number(IQA.toFixed(1));
}