import { normalizarParametros } from "./normalizacao";
import { dadosInvalidos } from "./validacao";
import { calcularIQA } from "./calculo";
import { classificarIQA } from "./classificacao";
import { gerarInsights } from "./insights";

export function calcularIQARegistro(formData) {
  // 1. Normalização
  const dados = normalizarParametros(formData);

  // 2. Validação
  if (dadosInvalidos(dados)) {
    return { status: "incompleto", mensagem: "Esperando dados" };
  }

  // 3. Cálculo principal
  const iqa = calcularIQA(dados);

  // 4. Classificação
  const classificacao = classificarIQA(iqa);

  // 5. Insights
  const insights = gerarInsights(dados,classificacao);

  return {
    iqa,
    classificacao,
    insights,
    detalhes: {
      ...dados
    }
  };
};

export function validarIQA(resultado) {
  if (
    resultado.status === "incompleto" ||
    typeof resultado.iqa !== "number"
  ) {
    return {
      valido: false,
      mensagem: "Calcule o IQA antes de salvar."
    };
  }

  return { valido: true, resultado };
}