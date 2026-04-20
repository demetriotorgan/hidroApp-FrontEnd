// insights.js

export function gerarInsights(dados, classificacao) {
  const insights = [];

  const { cor, turbidez, odor, ph } = dados;

  // 🔴 TURBIDEZ
  if (turbidez <= 0.3) {
    insights.push({
      tipo: "alerta",
      parametro: "turbidez",
      mensagem: "Alta turbidez indica falha na filtragem.",
      severidade: 3
    });
  } else if (turbidez <= 0.6) {
    insights.push({
      tipo: "info",
      parametro: "turbidez",
      mensagem: "Turbidez moderada, atenção ao sistema de filtragem.",
      severidade: 2
    });
  }

  // 🎨 COR
  if (cor <= 0.4) {
    insights.push({
      tipo: "alerta",
      parametro: "cor",
      mensagem: "Cor alterada indica presença de impurezas dissolvidas.",
      severidade: 3
    });
  } else if (cor <= 0.7) {
    insights.push({
      tipo: "info",
      parametro: "cor",
      mensagem: "Leve alteração na cor da água.",
      severidade: 2
    });
  }

  // 👃 ODOR
  if (odor === 0) {
    insights.push({
      tipo: "alerta",
      parametro: "odor",
      mensagem: "Odor forte indica contaminação por matéria orgânica.",
      severidade: 3
    });
  } else if (odor <= 0.5) {
    insights.push({
      tipo: "info",
      parametro: "odor",
      mensagem: "Leve odor detectado.",
      severidade: 2
    });
  }

  // ⚗️ pH
  if (ph <= 0.3) {
    insights.push({
      tipo: "alerta",
      parametro: "ph",
      mensagem: "pH muito distante do ideal (6.8).",
      severidade: 3
    });
  } else if (ph <= 0.6) {
    insights.push({
      tipo: "info",
      parametro: "ph",
      mensagem: "pH levemente fora do ideal.",
      severidade: 2
    });
  }

  // 🌍 INSIGHT GERAL (baseado na classificação)
  if (classificacao) {
    if (classificacao.severidade >= 3) {
      insights.push({
        tipo: "alerta",
        parametro: "geral",
        mensagem: "Qualidade da água comprometida. Verificar sistema.",
        severidade: classificacao.severidade
      });
    } else if (classificacao.severidade === 2) {
      insights.push({
        tipo: "info",
        parametro: "geral",
        mensagem: "Qualidade regular. Monitoramento recomendado.",
        severidade: 2
      });
    } else if (classificacao.severidade <= 1) {
      insights.push({
        tipo: "sucesso",
        parametro: "geral",
        mensagem: "Qualidade da água em boas condições.",
        severidade: 0
      });
    }
  }

  // 🔽 Ordenar por severidade (mais crítico primeiro)
  return insights.sort((a, b) => b.severidade - a.severidade);
};
