import { normalizarDados } from "./normalizacao";
import { dadosInvalidos } from "./validacao";
import { calcularIndicesQuimicos } from "./quimico";
import { calcularIndicesVisuais, aplicarPenalizacaoVisual } from "./visual";
import { calcularIQAFinal } from "./calculo";
import { classificarIQA } from "./classificacao";
import { gerarInsights } from "./insights";

export function calcularIQA(formData) {
  const dados = normalizarDados(formData);

  if (dadosInvalidos(dados)) {
    return { status: "incompleto", mensagem: "Esperando dados" };
  }

  const { I_pH, I_cl, critico } = calcularIndicesQuimicos(dados);
  const visuais = calcularIndicesVisuais(dados);
  const I_visual = aplicarPenalizacaoVisual(dados, visuais.I_visual);

  const IQA = calcularIQAFinal(I_pH, I_cl, I_visual, critico);
  const classificacao = classificarIQA(IQA);

  const insights = gerarInsights(dados, {
  ...visuais,
  I_pH,
  I_cl,
  I_visual
});

  return {
    iqa: IQA,
    classificacao,
    insights,
    detalhes: {
      ...visuais,
      I_pH,
      I_cl,
      I_visual,
      critico
    }
  };
}

export function validarIQA(resultado) {
  if (
    resultado.status === "incompleto" ||
    !resultado.classificacao
  ) {
    return {
      valido: false,
      mensagem: "Calcule o IQA antes de salvar."
    };
  }

  return { valido: true, resultado };
}