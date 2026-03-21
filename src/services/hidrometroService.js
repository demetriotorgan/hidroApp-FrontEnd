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

  if (!dados || dados.length < 2) {
    return 0;
  }

  let somaConsumo = 0;
  let totalIntervalos = 0;

  for (let i = 0; i < dados.length - 1; i++) {

    const leituraAtual = dados[i].leitura;
    const leituraAnterior = dados[i + 1].leitura;

    const consumo = leituraAtual - leituraAnterior;

    somaConsumo += consumo;
    totalIntervalos++;

  }

  return Number((somaConsumo / totalIntervalos).toFixed(2));
}

export function calcularConsumoUltimoRegistro(registros){
  if(!registros || registros.length <2){
    return 0;
  }

  const ultimo = registros[0];
  const anterior = registros[1];

  const consumo = ultimo.leitura - anterior.leitura;

  return consumo >=0 ? consumo : 0;
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
      consumo: consumo >= 0 ? consumo : 0,
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

  return total >= 0 ? total : 0;
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

  return maior;
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

    const consumo = leituraAtual - leituraAnterior;

    consumos.push(consumo);
  }

  return consumos;
};

function classificarCV(cv) {
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
}