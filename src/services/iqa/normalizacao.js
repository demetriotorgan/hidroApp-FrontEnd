// normalizacao.js

// Mapas de conversão (enums → escala 0 a 1)
const mapaCor = {
  transparente: 1.0,
  cinzaClaro: 0.7,
  cinza: 0.4,
  cinzaEscuro: 0.0
};

const mapaTurbidez = {
  baixa: 1.0,
  media: 0.6,
  alta: 0.3,
  muitaAlta: 0.0
};

const mapaOdor = {
  semOdor: 1.0,
  leveOdor: 0.5,
  forteOdor: 0.0
};

// Função auxiliar para normalizar pH
function normalizarPH(ph) {
  if (typeof ph !== "number") return null;

  const ideal = 6.8;
  const tolerancia = 1.5;

  let valor = 1 - Math.abs(ph - ideal) / tolerancia;

  // clamp entre 0 e 1
  return Math.max(0, Math.min(1, valor));
}

// Função principal
export function normalizarParametros(dados) {
  if (!dados) return {};

  const corNormalizada = mapaCor[dados.cor] ?? null;
  const turbidezNormalizada = mapaTurbidez[dados.turbidez] ?? null;
  const odorNormalizado = mapaOdor[dados.odor] ?? null;
  const phNormalizado = normalizarPH(dados.ph);

  return {
    cor: corNormalizada,
    turbidez: turbidezNormalizada,
    odor: odorNormalizado,
    ph: phNormalizado
  };
}