
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