export function gerarInsights(dados, indices) {
  const insights = [];

  // 🌫️ TURBIDEZ
  if (indices.I_turb <= 40) {
    insights.push({
      tipo: "alerta",
      mensagem: "Alta turbidez - recomenda-se filtragem"
    });
  }

  // 🧪 CLORO (AJUSTADO AO SEU SISTEMA)

  if (dados.cloro < 2) {
    insights.push({
      tipo: "alerta",
      mensagem: "Cloro baixo - risco de perda de proteção ao longo do tempo"
    });
  }

  else if (dados.cloro >= 2 && dados.cloro < 3) {
    insights.push({
      tipo: "cuidado",
      mensagem: "Cloro abaixo do ideal para armazenamento"
    });
  }

  else if (dados.cloro > 5 && dados.cloro <= 6.5) {
    insights.push({
      tipo: "cuidado",
      mensagem: "Cloro levemente elevado"
    });
  }

  else if (dados.cloro > 6.5) {
    insights.push({
      tipo: "alerta",
      mensagem: "Excesso de cloro - pode causar odor e irritação"
    });
  }

  // ⚗️ pH
  if (indices.I_pH <= 50) {
    insights.push({
      tipo: "alerta",
      mensagem: "pH fora da faixa ideal"
    });
  }

  // 👃 ODOR
  if (dados.odor === "forteOdor") {
    insights.push({
      tipo: "critico",
      mensagem: "Odor forte detectado - possível contaminação"
    });
  }

  // 💧 QUALIDADE VISUAL
  if (indices.I_visual <= 50) {
    insights.push({
      tipo: "alerta",
      mensagem: "Baixa qualidade visual da água"
    });
  }

  if (insights.length === 0) {
  insights.push({
    tipo: "ok",
    mensagem: "Parâmetros dentro da faixa ideal"
  });
}

  return insights;
}