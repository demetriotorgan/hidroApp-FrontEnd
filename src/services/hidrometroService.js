
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