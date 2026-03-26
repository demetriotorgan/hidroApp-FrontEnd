export function dadosInvalidos(dados) {
  return (
    dados.ph === null ||
    dados.cloro === null ||
    !dados.cor ||
    !dados.turbidez ||
    !dados.odor
  );
}