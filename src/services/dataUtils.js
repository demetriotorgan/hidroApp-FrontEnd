export function ordenarPorData(registros) {
  return [...registros].sort((a, b) => {
    return new Date(a.data) - new Date(b.data);
  });
}

export function formatarParaInputDate(dataISO) {
  const data = new Date(dataISO);
  return data.toISOString().split('T')[0];
}

export function extrairPeriodo(registros) {
  if (!registros || registros.length === 0) {
    return { dataInicial: '', dataFinal: '' };
  }

  const ordenados = ordenarPorData(registros);

  const primeiro = ordenados[0];
  const ultimo = ordenados[ordenados.length - 1];

  return {
    dataInicial: formatarParaInputDate(primeiro.data),
    dataFinal: formatarParaInputDate(ultimo.data)
  };
};

export function calcularIntervaloDiasInclusivo(dataInicial, dataFinal) {
  if (!dataInicial || !dataFinal) return 0;

  const inicio = new Date(dataInicial + "T00:00:00");
  const fim = new Date(dataFinal + "T00:00:00");

  const diffMs = fim - inicio;
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  return diffDias + 1;
}