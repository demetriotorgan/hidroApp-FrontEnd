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

export function calcularConsumoUltimoRegistro(registros) {
  if (!registros || registros.length < 2) {
    return 0;
  }

  const ultimo = registros[0];
  const anterior = registros[1];

  const consumo = ultimo.leitura - anterior.leitura;

  return consumo >= 0 ? consumo * 10 : 0;
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
};

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

    const consumo = (leituraAtual - leituraAnterior) * 10;

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

//Total de dias Registrados
// services/hidrometroService.js

export function calcularDiasMonitoramento(dados) {
  if (!dados || dados.length === 0) {
    return {
      diasMonitorados: 0,
      diasConsumo: 0
    };
  }

  // Garante ordenação por data crescente
  const ordenado = [...dados].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  const diasMonitorados = ordenado.length;

  // Consumo vem das diferenças entre leituras
  const diasConsumo = diasMonitorados > 1
    ? diasMonitorados - 1
    : 0;

  return {
    diasMonitorados,
    diasConsumo
  };
};

// services/hidrometroService.js

export function calcularCoeficienteA(dados) {
  const { diasMonitorados } = calcularDiasMonitoramento(dados);

  // Validação de dados mínimos
  if (diasMonitorados <= 5) {
    return {
      status: "insuficiente",
      diasMonitorados,
      valor: null,
      mensagem: `Esperando dados (${diasMonitorados} registros disponíveis)`
    };
  }

  // 📊 Obtém consumo acumulado
  const { acumulado } = consumoAcumulado(dados);

  if (!acumulado || acumulado.length === 0) {
    return {
      status: "erro",
      diasMonitorados,
      valor: null,
      mensagem: "Não foi possível calcular o consumo acumulado"
    };
  }

  // 📐 Regressão linear com intercepto zero
  let numerador = 0;
  let denominador = 0;

  for (let i = 0; i < acumulado.length; i++) {
    const d = i + 1;
    const V = acumulado[i];

    numerador += d * V;
    denominador += d * d;
  }

  const a = denominador !== 0 ? numerador / denominador : 0;
  const confiabilidade = classificarConfiabilidadeModelo(dados);

  return {
    status: "ok",
    diasMonitorados,
    valor: a,
    confiabilidade: confiabilidade.confiabilidade,
    nivel: confiabilidade.nivel,
    cor: confiabilidade.cor,
    mensagem: confiabilidade.mensagem,
  };
};

//Função que retorna array de acumulo de consumo e acumulo final
export function consumoAcumulado(dados) {
  if (!dados || dados.length < 2) {
    return {
      acumulado: [],
      total: 0
    };
  }

  // Ordena por data crescente
  const ordenado = [...dados].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  const acumulado = [];
  let soma = 0;

  for (let i = 1; i < ordenado.length; i++) {
    const atual = ordenado[i].leitura;
    const anterior = ordenado[i - 1].leitura;

    // Consumo do dia (multiplicado por 10 como você definiu)
    const consumo = (atual - anterior) * 10;

    soma += consumo;
    acumulado.push(soma);
  }

  return {
    acumulado, // array: [dia1, dia2, ...]
    total: soma
  };
};

//Confiabilidade do Modelo A
export function classificarConfiabilidadeModelo(dados) {
  if (!dados || dados.length < 2) {
    return {
      confiabilidade: "baixa",
      nivel: "Insuficiente",
      cor: "gray",
      mensagem: "Dados insuficientes para análise",
      r: null,
      cv: null
    };
  }

  const resultadoCV = calcularCVConsumo(dados);
  const resultadoPearson = calcularLinearidadeConsumo(dados);

  if (!resultadoPearson) {
    return {
      confiabilidade: "baixa",
      nivel: "Erro",
      cor: "gray",
      mensagem: "Erro ao calcular linearidade",
      r: null,
      cv: null
    };
  }

  const r = resultadoPearson.coeficiente;
  const cv = resultadoCV.cv;

  let confiabilidade = "";
  let nivel = "";
  let cor = "";
  let mensagem = "";

  // 🔥 REGRA COMBINADA (Pearson + CV)
  if (r >= 0.95 && cv <= 20) {
    confiabilidade = "alta";
    nivel = "Alta confiabilidade";
    cor = "green";
    mensagem = "Modelo muito estável e altamente previsível";
  }
  else if (r >= 0.9 && cv <= 40) {
    confiabilidade = "media";
    nivel = "Confiabilidade moderada";
    cor = "gold";
    mensagem = "Modelo com pequenas variações no consumo";
  }
  else {
    confiabilidade = "baixa";
    nivel = "Baixa confiabilidade";
    cor = "red";
    mensagem = "Modelo instável ou com baixa linearidade";
  }

  return {
    confiabilidade,
    nivel,
    cor,
    mensagem,
    r,
    cv,
    detalheLinearidade: resultadoPearson,
    detalheCV: resultadoCV
  };
};


//Estimativa de Custo do Consumo
export function calcularCustoEstimado(consumoLitros) {
  if (!consumoLitros || consumoLitros <= 0) return null;

  // 🔁 Converter litros → m³
  const consumoM3 = consumoLitros / 1000;

  let restante = consumoM3;

  let agua = 0;
  let esgoto = 0;

  // 🧱 FAIXA 1 — mínimo até 5m³ (fixo)
  const minimo = 5;

  if (consumoM3 <= 5) {
    return {
      consumoM3: consumoM3.toFixed(2),
      agua: 53.74,
      esgoto: 42.99,
      total: (53.74 + 42.99).toFixed(2),
      detalhamento: [
        {
          faixa: "Mínimo (0–5m³)",
          volume: consumoM3.toFixed(2),
          agua: 53.74,
          esgoto: 42.99
        }
      ]
    };
  }

  // aplica mínimo completo
  agua += 53.74;
  esgoto += 42.99;
  restante -= minimo;

  const detalhamento = [
    {
      faixa: "Mínimo (0–5m³)",
      volume: 5,
      agua: 53.74,
      esgoto: 42.99
    }
  ];

  // 🧱 FAIXA 2 — 6 a 10 m³
  if (restante > 0) {
    const volumeFaixa = Math.min(restante, 5);
    const custoAgua = volumeFaixa * 1.66;
    const custoEsgoto = custoAgua * 0.8;

    agua += custoAgua;
    esgoto += custoEsgoto;

    detalhamento.push({
      faixa: "6–10m³",
      volume: volumeFaixa,
      agua: custoAgua,
      esgoto: custoEsgoto
    });

    restante -= volumeFaixa;
  }

  // 🧱 FAIXA 3 — 11 a 15 m³
  if (restante > 0) {
    const volumeFaixa = Math.min(restante, 5);
    const custoAgua = volumeFaixa * 9.26;
    const custoEsgoto = custoAgua * 0.8;

    agua += custoAgua;
    esgoto += custoEsgoto;

    detalhamento.push({
      faixa: "11–15m³",
      volume: volumeFaixa,
      agua: custoAgua,
      esgoto: custoEsgoto
    });

    restante -= volumeFaixa;
  }

  const total = agua + esgoto;

  return {
    consumoM3: consumoM3.toFixed(2),
    agua: agua.toFixed(2),
    esgoto: esgoto.toFixed(2),
    total: total.toFixed(2),
    detalhamento
  };
};


//Criando o payload da Estimativa
export function montarEstimativaJSON({ resultado, dados }) {
  if (!resultado || resultado.erro) return null;

  return {
    dataCriacao: new Date().toISOString(),

    modelo: {
      diasEstimados: resultado.dias,
      coeficienteA: Number(resultado.coeficiente.toFixed(6)),
      confiabilidade: resultado.confiabilidade,
      cor: resultado.cor,
      quantidadeRegistros: dados?.length || 0
    },

    previsao: {
      consumoLitros: Number(resultado.consumo.toFixed(2)),
      consumoM3: Number((resultado.consumo / 1000).toFixed(3))
    },

    custo: {
      agua: Number(resultado.custo.agua),
      esgoto: Number(resultado.custo.esgoto),
      total: Number(resultado.custo.total),

      detalhamento: resultado.custo.detalhamento.map(item => ({
        faixa: item.faixa,
        volumeM3: Number(Number(item.volume).toFixed(3)),
        agua: Number(item.agua.toFixed(2)),
        esgoto: Number(item.esgoto.toFixed(2)),
        total: Number((item.agua + item.esgoto).toFixed(2))
      }))
    },

    // 🔥 OPCIONAL (mas MUITO poderoso)
    snapshotDados: dados?.map(d => ({
      data: d.data,
      leitura: d.leitura
    }))
  };
};

//Consumo entre duas datas
export function calcularConsumoNoPeriodo(registros, dataInicial, dataFinal) {
  if (!registros || registros.length === 0) return null;

  const ordenados = [...registros].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  const inicio = new Date(dataInicial + "T00:00:00");
  const fim = new Date(dataFinal + "T23:59:59");

  const dentroDoPeriodo = ordenados.filter(r => {
    const data = new Date(r.data);
    return data >= inicio && data <= fim;
  });

  if (dentroDoPeriodo.length < 2) return null;

  const registroInicial = ordenados
    .filter(r => new Date(r.data) <= inicio)
    .pop();
  const registroFinal = ordenados
    .filter(r => new Date(r.data) <= fim)
    .pop();

  if (!registroInicial || !registroFinal) return null;

  const consumoUnidades = registroFinal.leitura - registroInicial.leitura;

  if (consumoUnidades < 0) {
    throw new Error("Leitura final menor que inicial");
  }

  const consumoLitros = consumoUnidades * 10;

  return {
    consumoUnidades,
    consumoLitros,
    leituraInicial: registroInicial.leitura,
    leituraFinal: registroFinal.leitura,
    dataInicial: registroInicial.data,
    dataFinal: registroFinal.data
  };
};

//Função que calcula o consumo estimado usando o modelo de coeficiente a
export function calcularConsumoEstimado(dados, dias) {
  const modelo = calcularCoeficienteA(dados);

  if (modelo.status !== "ok") {
    return {
      erro: modelo.mensagem
    };
  }

  const consumo = modelo.valor * dias;
  const custo = calcularCustoEstimado(consumo);

  return {
    dias,
    consumo,
    coeficiente: modelo.valor,
    confiabilidade: modelo.confiabilidade,
    cor: modelo.cor,
    custo
  };
};


//Função que monta payload de análise comparativa em um período
export function montarPayloadAnalise({
  form,
  consumoDoPeriodo,
  estimativa,
  comparacao,
  dados
}) {
  try {
    // 🚨 Validações essenciais
    if (!form || !consumoDoPeriodo || !estimativa || !comparacao) {
      return null;
    }

    if (estimativa.erro) {
      return null;
    }

    // 📅 Datas
    const dataCriacao = new Date().toISOString();

    // 📊 Derivações inteligentes
    const erro = comparacao.erroPercentual;
    const erroAbs = Math.abs(erro);

    const acuracia = Math.max(0, 100 - erroAbs);

    let tendencia = "preciso";
    if (comparacao.diferenca > 0) tendencia = "superestimando";
    if (comparacao.diferenca < 0) tendencia = "subestimando";

    let classificacao = "ruim";
    if (erroAbs <= 5) classificacao = "excelente";
    else if (erroAbs <= 10) classificacao = "boa";
    else if (erroAbs <= 20) classificacao = "regular";

    // 📦 Montagem do payload
    const payload = {
      dataCriacao,

      periodo: {
        dataInicial: form.dataInicial,
        dataFinal: form.dataFinal,
        quantidadeDias: Number(form.quantidadeDias)
      },

      consumoReal: {
        litros: consumoDoPeriodo.consumoLitros,
        unidades: consumoDoPeriodo.consumoUnidades,
        leituraInicial: consumoDoPeriodo.leituraInicial,
        leituraFinal: consumoDoPeriodo.leituraFinal
      },

      modelo: {
        consumoEstimado: estimativa.consumo.toFixed(2),
        coeficiente: estimativa.coeficiente,
        confiabilidade: estimativa.confiabilidade,
        custoEstimado: Number(estimativa.custo.total)
      },

      comparacao: {
        diferenca: comparacao.diferenca.toFixed(2),
        erroPercentual: erro,
        acuracia,
        tendencia,
        classificacao
      },

      metadata: {
        totalRegistros: dados?.length || 0,
        versaoModelo: "v1"
      }
    };

    return payload;

  } catch (error) {
    console.error("Erro ao montar payload de análise:", error);
    return null;
  }
};

export function extrair3PrimeirosDigitos(leitura) {
  if (leitura == null) return null;

  const str = leitura.toString().trim();

  if (str.length < 3) return null;

  const valor = parseInt(str.slice(0, 3), 10);

  return isNaN(valor) ? null : valor;
}

//Calculo de consumo com 3 digitos: Leitura Atual - Ultima Leitura da SANEPAR
export function calcularDadosSanepar(leituraAtual, leituraAnterior) {
  const leituraAtual3 = extrair3PrimeirosDigitos(leituraAtual);

  if (leituraAtual3 === null || leituraAnterior == null) {
    return {
      leituraAtual3: null,
      consumo: null
    };
  }

  const anterior = Number(leituraAnterior);

  if (isNaN(anterior)) {
    return {
      leituraAtual3,
      consumo: null
    };
  }

  return {
    leituraAtual3,
    consumo: leituraAtual3 - anterior
  };
};