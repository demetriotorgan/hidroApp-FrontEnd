export function prepararDadosDoCiclo({
  dataset1 = [],
  dataset2 = [],
  dataInicial,
  dataFinal
}) {
  if (!dataInicial || !dataFinal) {
    throw new Error("dataInicial e dataFinal são obrigatórias");
  }

  const inicio = new Date(dataInicial);
  const fim = new Date(dataFinal);

  // console.log("🚀 prepararDadosDoCiclo (com filtro de limites)");

  // =========================================================
  // 🔹 LIMITES DE SEGURANÇA
  // =========================================================
  const LIMITE_MIN = 0.01; // m³
  const LIMITE_MAX = 1.5;  // m³

  // =========================================================
  // 🔹 1. UNIFICAR SNAPSHOTS
  // =========================================================
  const mapaSnapshots = new Map();

  dataset1.forEach(reg => {
    reg.snapshotDados?.forEach(s => {
      mapaSnapshots.set(s.data, s.leitura);
    });
  });

  const snapshotsUnicos = Array.from(mapaSnapshots.entries()).map(
    ([data, leitura]) => ({ data, leitura })
  );

  snapshotsUnicos.sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  // =========================================================
  // 🔹 2. CALCULAR DELTAS COM FILTRO
  // =========================================================
  const previsoesFiltradas = [];

  for (let i = 1; i < snapshotsUnicos.length; i++) {
    const anterior = snapshotsUnicos[i - 1];
    const atual = snapshotsUnicos[i];

    const dataAtual = new Date(atual.data);

    if (dataAtual < inicio || dataAtual > fim) continue;

    const delta = atual.leitura - anterior.leitura;

    // ❌ ignorar valores inválidos
    if (delta <= 0) continue;

    const consumoM3 = delta / 100;

    // 🔥 FILTRO PRINCIPAL
    if (consumoM3 < LIMITE_MIN || consumoM3 > LIMITE_MAX) {
      console.warn("⚠️ Delta ignorado:", {
        data: atual.data,
        delta,
        consumoM3
      });
      continue;
    }

    previsoesFiltradas.push({
      dataReferencia: atual.data,
      consumoPrevisto: consumoM3
    });
  }

  // =========================================================
  // 🔹 3. DATASET 2 NORMALIZADO
  // =========================================================
  const comparacoesFiltradas = dataset2
    .map(reg => {
      const consumoRealM3 = (reg.consumoReal?.litros || 0) / 1000;
      const consumoEstimadoM3 = (reg.modelo?.consumoEstimado || 0) / 1000;

      return {
        periodo: {
          dataInicial: reg.periodo?.dataInicial,
          dataFinal: reg.periodo?.dataFinal
        },
        erro: consumoEstimadoM3 - consumoRealM3,
        erroPercentual: reg.comparacao?.erroPercentual || 0,
        consumoRealM3,
        consumoEstimadoM3
      };
    })
    .filter(reg => {
      if (!reg?.periodo?.dataFinal) return false;

      const data = new Date(reg.periodo.dataFinal);
      return data >= inicio && data <= fim;
    })
    .sort(
      (a, b) =>
        new Date(a.periodo.dataFinal) - new Date(b.periodo.dataFinal)
    );

  // =========================================================
  // 🔹 DEBUG
  // =========================================================
  const somaPrevista = previsoesFiltradas.reduce(
    (acc, r) => acc + r.consumoPrevisto,
    0
  );

  // console.log("📊 Dias considerados:", previsoesFiltradas.length);
  // console.log("💧 SOMA PREVISTA (m³):", somaPrevista);

  return {
    previsoesFiltradas,
    comparacoesFiltradas
  };
}