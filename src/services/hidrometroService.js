export function totalDeRegistros(dados) {
  if (!dados || dados.length === 0) {
    return 0;
  }

  return dados.length;
}

export function dataUltimoRegistro(dados) {
  if (!dados || dados.length === 0) {
    return null;
  }

  return new Date(dados[0].data).toLocaleDateString("pt-BR", {
    timeZone: "UTC"
  });
}

export function mediaConsumo(dados) {
  // console.log("TOTAL REGISTROS:", dados.length);
  let somaConsumo = 0;

  for (let i = 0; i < dados.length - 1; i++) {

    const atual = dados[i].leitura;
    const anterior = dados[i + 1].leitura;

    const consumo = atual - anterior;
    // console.log(`Consumo ${i}:`, consumo * 10, "L");
    somaConsumo += consumo;
  }

  const media = (somaConsumo * 10) / (dados.length - 1);

  // console.log("MÉDIA FINAL:", media);
  return Number(media.toFixed(2));
};

export function calcularConsumoUltimoRegistro(registros){
  if(!registros || registros.length <2){
    return 0;
  }

  const ultimo = registros[0];
  const anterior = registros[1];

  const consumo = ultimo.leitura - anterior.leitura;

  return consumo >=0 ? consumo * 10 : 0;
}

// services/hidrometroService.js

export function gerarDadosTabela(registros) {
  if (!registros || registros.length === 0) {
    return [];
  }

  // Ordena do mais antigo para o mais recente
  const ordenados = [...registros].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  return ordenados.map((item, index) => {
    // Dia começa em 1
    const dia = index + 1;

    // Primeiro registro não tem consumo
    if (index === 0) {
      return {
        dia,
        consumo: null,
        leitura: item.leitura,
        data: item.data,
      };
    }

    // Consumo = leitura atual - leitura anterior
    const consumo =
      item.leitura - ordenados[index - 1].leitura;

    return {
      dia,
      consumo: consumo >= 0 ? consumo * 10 : 0,
      leitura: item.leitura,
      data: item.data,
    };
  });
}


export function totalConsumoAcumulado(registros) {
  if (!registros || registros.length < 2) {
    return 0;
  }

  // Ordena do mais antigo para o mais recente
  const ordenados = [...registros].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  const primeiraLeitura = ordenados[0].leitura;
  const ultimaLeitura = ordenados[ordenados.length - 1].leitura;

  const total = ultimaLeitura - primeiraLeitura;

  return total >= 0 ? total * 10 : 0;
}

export function maiorConsumo(registros) {
  if (!registros || registros.length < 2) {
    return 0;
  }

  // Ordena do mais antigo para o mais recente
  const ordenados = [...registros].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  let maior = 0;

  for (let i = 1; i < ordenados.length; i++) {
    const consumo = ordenados[i].leitura - ordenados[i - 1].leitura;

    if (consumo > maior) {
      maior = consumo;
    }
  }

  return maior * 10;
}

export function formatarDataSemFuso(dataISO) {
  if (!dataISO) return "";

  const [ano, mes, dia] = dataISO.split("T")[0].split("-");

  return `${dia}/${mes}/${ano}`;
};

export function calcularVariacaoConsumo(registros) {
    if (!registros || registros.length < 3) {
        return null; // precisa de pelo menos 3 registros
    }

    // Ordena por data (mais recente primeiro)
    const ordenados = [...registros].sort(
        (a, b) => new Date(b.data) - new Date(a.data)
    );

    const atual = ordenados[0];
    const anterior = ordenados[1];
    const anterior2 = ordenados[2];

    // Consumos (diferença entre leituras)
    const consumoAtual = atual.leitura - anterior.leitura;
    const consumoAnterior = anterior.leitura - anterior2.leitura;

    if (consumoAnterior === 0) {
        return null; // evita divisão por zero
    }

    const variacao =
        ((consumoAtual - consumoAnterior) / consumoAnterior) * 100;

    return {
        consumoAtual,
        consumoAnterior,
        variacao: Number(variacao.toFixed(1)), // 1 casa decimal
        tipo: variacao > 0 ? "aumento" : variacao < 0 ? "queda" : "estavel"
    };
};

function calcularConsumos(dados) {
  const consumos = [];

  for (let i = 0; i < dados.length - 1; i++) {
    const leituraAtual = dados[i].leitura;
    const leituraAnterior = dados[i + 1].leitura;

    const consumo = (leituraAtual - leituraAnterior)*10;

    consumos.push(consumo);
  }

  return consumos;
};

export function classificarCV(cv) {
  if (cv < 10) return 'Muito Estável';
  if (cv < 20) return 'Estável';
  if (cv < 30) return 'Moderado';
  if (cv < 50) return 'Variável';
  return 'Muito Variável';
}

export function calcularCVConsumo(dados) {

  if (!dados || dados.length < 2) {
    return {
      cv: 0,
      tipo: 'Sem dados'
    };
  }

  const consumos = calcularConsumos(dados);

  // 🔹 Reutilizando sua função
  const media = mediaConsumo(dados);

  if (media === 0) {
    return {
      cv: 0,
      tipo: 'Indefinido'
    };
  }

  // 🔹 Variância
  const variancia = consumos.reduce((acc, val) => {
    return acc + Math.pow(val - media, 2);
  }, 0) / consumos.length;

  const desvioPadrao = Math.sqrt(variancia);

  const cv = (desvioPadrao / media) * 100;

  return {
    cv: Number(cv.toFixed(2)),
    tipo: classificarCV(cv)
  };
};

//Função Percentual entre consumoAtual / Maior Consumo 
export function percentualComparacaoConsumo(registros) {
  if (!registros || registros.length < 2) {
    return {
      percentual: 0,
      tipo: "sem_dados"
    };
  }

  const consumoAtual = calcularConsumoUltimoRegistro(registros);
  const consumoMaximo = maiorConsumo(registros);

  if (consumoMaximo === 0) {
    return {
      percentual: 0,
      tipo: "sem_referencia"
    };
  }

  const percentual = (consumoAtual / consumoMaximo) * 100;

  // Classificação inteligente da tendência
  let tipo = "";

  if (percentual >= 95) {
    tipo = "muito_alto"; // praticamente igual ao maior
  } else if (percentual >= 70) {
    tipo = "alto";
  } else if (percentual >= 40) {
    tipo = "moderado";
  } else {
    tipo = "baixo";
  }

  return {
    percentual: Number(percentual.toFixed(2)),
    tipo,
    consumoAtual,
    consumoMaximo
  };
};

//Função que mede o coeficiente de Person do consumo acumulado
export function calcularLinearidadeConsumo(dados) {
  if (!dados || dados.length < 2) {
    return null;
  }

  // 1. Ordenar por data crescente
  const ordenado = [...dados].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  const n = ordenado.length;

  // 2. Criar arrays X e Y
  const x = [];
  const y = [];

  ordenado.forEach((item, index) => {
    x.push(index); // tempo
    y.push(item.leitura); // acumulado
  });

  // 3. Somatórios
  let somaX = 0,
    somaY = 0,
    somaXY = 0,
    somaX2 = 0,
    somaY2 = 0;

  for (let i = 0; i < n; i++) {
    somaX += x[i];
    somaY += y[i];
    somaXY += x[i] * y[i];
    somaX2 += x[i] ** 2;
    somaY2 += y[i] ** 2;
  }

  // 4. Cálculo de Pearson
  const numerador = n * somaXY - somaX * somaY;
  const denominador = Math.sqrt(
    (n * somaX2 - somaX ** 2) * (n * somaY2 - somaY ** 2)
  );

  const r = denominador === 0 ? 0 : numerador / denominador;

  // 5. Classificação
  let classificacao = "";
  let nivel = "";
  let cor = "";
  let descricao = "";

  if (r >= 0.98) {
    classificacao = "muito linear";
    nivel = "Excelente";
    cor = "green";
    descricao = "Consumo extremamente estável e previsível";
  } else if (r >= 0.95) {
    classificacao = "linear";
    nivel = "Estável";
    cor = "green";
    descricao = "Consumo dentro do comportamento esperado";
  } else if (r >= 0.9) {
    classificacao = "moderado";
    nivel = "Atenção leve";
    cor = "gold";
    descricao = "Pequenas variações no padrão de consumo";
  } else if (r >= 0.8) {
    classificacao = "Irregular";
    nivel = "alerta";
    cor = "orange";
    descricao = "Consumo com variações relevantes";
  } else {
    classificacao = "não linear";
    nivel = "crítico";
    cor = "red";
    descricao = "Consumo fora do padrão esperado";
  }

  return {
    coeficiente: Number(r.toFixed(4)),
    classificacao,
    nivel,
    cor,
    descricao,
  };
};

export function calcularPosicaoRegua(media, consumoAtual, limitePercentual = 50) {
  if (!media || media === 0) {
    return {
      posicao: 0.5, // centro
      diferencaPercentual: 0,
      status: "sem_dados"
    };
  }

  // 📊 Diferença percentual
  const diferencaPercentual = ((consumoAtual - media) / media) * 100;

  // 🔒 Clamp (limitar valores)
  const percentualNormalizado = Math.max(
    -limitePercentual,
    Math.min(limitePercentual, diferencaPercentual)
  );

  // 📏 Converter para posição (0 → 1)
  const posicao =
    (percentualNormalizado + limitePercentual) / (2 * limitePercentual);

  // 🎨 Classificação (opcional mas MUITO útil)
  let status = "";

  if (diferencaPercentual > 10) {
    status = "muito_alto";
  } else if (diferencaPercentual > 5) {
    status = "alto";
  } else if (diferencaPercentual >= -5) {
    status = "normal";
  } else {
    status = "baixo";
  }

  return {
    posicao, // de 0 a 1
    diferencaPercentual,
    status
  };
}