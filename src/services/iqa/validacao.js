// validacao.js

export function dadosInvalidos(dados) {
  if (!dados) return true;

  const { cor, turbidez, odor, ph } = dados;

  return (
    cor === null ||
    turbidez === null ||
    odor === null ||
    ph === null
  );
};

