
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

  return (somaConsumo / totalIntervalos).toFixed(2);
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