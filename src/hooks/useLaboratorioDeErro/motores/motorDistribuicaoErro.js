export function motorDistribuicaoErro(lote = []) {
  const faixas = {
    baixo: 0,
    medio: 0,
    alto: 0,
  };

  for (const item of lote) {
    const erro = Number(item.erro);

    if (!Number.isFinite(erro)) continue;

    if (erro < 10) faixas.baixo++;
    else if (erro < 25) faixas.medio++;
    else faixas.alto++;
  }

  return {
    faixas,
    total: lote.length,
  };
}