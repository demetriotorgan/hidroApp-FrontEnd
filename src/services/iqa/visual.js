import { mapaCor, mapaTurbidez, mapaOdor } from "./mapas";

export function calcularIndicesVisuais(dados) {
  const I_cor = mapaCor[dados.cor] ?? 50;
  const I_turb = mapaTurbidez[dados.turbidez] ?? 50;
  const I_odor = mapaOdor[dados.odor] ?? 50;

  let I_visual =
    0.3 * I_cor +
    0.4 * I_turb +
    0.3 * I_odor;

  return { I_cor, I_turb, I_odor, I_visual };
}

export function aplicarPenalizacaoVisual(dados, I_visual) {
  let limite = 100;

  if (dados.odor === "forteOdor") limite = Math.min(limite, 40);
  if (dados.turbidez === "muitaAlta") limite = Math.min(limite, 40);
  if (dados.turbidez === "alta") limite = Math.min(limite, 50);
  if (dados.cor === "cinzaEscuro") limite = Math.min(limite, 50);

  return Math.min(I_visual, limite);
}