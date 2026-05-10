export const SEVERIDADE_MAP = {
  critica: "O sistema apresenta impacto crítico e requer intervenção imediata.",
  alta: "O sistema apresenta impacto elevado e precisa de atenção.",
  alto: "O sistema apresenta impacto elevado e precisa de atenção.",
  moderada: "O sistema está sob controle, mas requer monitoramento.",
  medio: "O sistema está sob controle, mas requer monitoramento.",
  baixo: "O sistema apresenta baixa severidade e comportamento estável.",
  indefinido: "O sistema não conseguiu classificar a severidade do comportamento.",
};

export const CONFIANCA_MAP = {
  alta: "O modelo apresenta alta confiabilidade para decisões.",
  media: "O modelo possui confiabilidade moderada com variações aceitáveis.",
  baixa: "O modelo apresenta baixa confiabilidade e deve ser usado com cautela.",
};

export const DIAGNOSTICO_MAP = {
  superestimando: "O modelo tende a superestimar os valores de consumo.",
  subestimando: "O modelo tende a subestimar os valores de consumo.",
  estrutural: "O comportamento indica padrão estrutural no erro do modelo.",
  "reduzindo erro":
    "O modelo apresenta redução progressiva do erro e indica melhora no desempenho.",

  "aumentando erro":
    "O modelo apresenta crescimento progressivo do erro e indica perda de estabilidade.",

  "erro estável": "O modelo mantém comportamento estável, sem variações relevantes no erro.",
  estavel: "O modelo mantém comportamento estável, sem variações relevantes no erro.",

  "crescimento acelerado":
    "O erro está aumentando rapidamente.",
  "crescimento lento":
    "O erro está aumentando de forma gradual.",
  desaceleração:
    "O ritmo de crescimento do erro está diminuindo.",
};

export const RECOMENDACAO_MAP = {
  critica:
    "Recalibrar o modelo imediatamente. Revisar janelas curtas e validar possíveis distorções estruturais no cálculo do erro.",

  superestimando:
    "Ajustar os coeficientes de previsão para reduzir tendência de superestimação. Verificar principalmente janelas menores que podem estar inflando o erro.",

  subestimando:
    "Revisar os parâmetros de subestimação do modelo. Avaliar se há perda sistemática de sensibilidade nas janelas médias e longas.",
  "reduzindo erro":
    "O modelo apresenta sinais de melhora. Manter monitoramento e acompanhar consistência da redução do erro.",

  "aumentando erro":
    "O modelo apresenta deterioração progressiva. Revisar parâmetros e investigar possíveis desvios recentes.",

  "erro estável":
    "O modelo opera com estabilidade. Manter monitoramento contínuo e validar consistência ao longo dos próximos ciclos.",
  estavel:
    "O modelo opera com estabilidade. Manter monitoramento contínuo e validar consistência ao longo dos próximos ciclos.",

  "crescimento acelerado":
    "Investigar imediatamente a causa da aceleração.",
  "crescimento lento":
    "Monitorar o crescimento contínuo.",
  desaceleração:
    "Manter acompanhamento para confirmar estabilização.",

  indefinido:
    "O sistema não conseguiu identificar um padrão semântico reconhecido.",
};