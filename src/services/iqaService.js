import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function calcularIQA(formData) {

  // 🔧 Conversão segura
  const dados = {
    ph: formData.ph !== "" ? Number(formData.ph) : null,
    cloro: formData.cloro !== "" ? Number(formData.cloro) : null,
    cor: formData.cor,
    turbidez: formData.turbidez,
    odor: formData.odor
  };

  // 🔒 FILTRO DE SEGURANÇA
  const dadosFaltando =
    dados.ph === null ||
    dados.cloro === null ||
    !dados.cor ||
    !dados.turbidez ||
    !dados.odor;

  if (dadosFaltando) {
    return {
      status: "incompleto",
      mensagem: "Esperando dados"
    };
  }

  // 🔹 Mapas
  const mapaCor = {
    transparente: 100,
    cinzaClaro: 75,
    cinza: 50,
    cinzaEscuro: 20
  };

  const mapaTurbidez = {
    baixa: 100,
    media: 70,
    alta: 40,
    muitaAlta: 10
  };

  const mapaOdor = {
    semOdor: 100,
    leveOdor: 60,
    forteOdor: 10
  };

  // 🔹 pH
  function calcularIpH(ph) {
    if (ph == null || isNaN(ph)) return null;
    const phIdeal = 7.2;
    const k = 33;

    let valor = 100 - k * Math.abs(ph - phIdeal);
    return Math.max(0, Math.min(100, valor));
  }

  // 🔹 Cloro
  function calcularICl(cloro) {
    if (cloro == null || isNaN(cloro)) return null;

    let valor;

    if (cloro < 0.2) {
      valor = 50 * (cloro / 0.2);
    } else if (cloro <= 2.0) {
      valor = 100 - 20 * Math.abs(cloro - 1);
    } else {
      valor = 100 - 30 * (cloro - 2);
    }

    return Math.max(0, Math.min(100, valor));
  }

  // 🔹 Visuais
  const I_cor = mapaCor[dados.cor] ?? 50;
  const I_turb = mapaTurbidez[dados.turbidez] ?? 50;
  const I_odor = mapaOdor[dados.odor] ?? 50;

  let I_visual =
    0.3 * I_cor +
    0.4 * I_turb +
    0.3 * I_odor;

  // 🔴 Penalização
  let limiteMaxVisual = 100;

  if (dados.odor === "forteOdor") limiteMaxVisual = Math.min(limiteMaxVisual, 40);
  if (dados.turbidez === "muitaAlta") limiteMaxVisual = Math.min(limiteMaxVisual, 40);
  if (dados.turbidez === "alta") limiteMaxVisual = Math.min(limiteMaxVisual, 50);
  if (dados.cor === "cinzaEscuro") limiteMaxVisual = Math.min(limiteMaxVisual, 50);

  I_visual = Math.min(I_visual, limiteMaxVisual);

  // 🔹 Químicos
  const I_pH = calcularIpH(dados.ph);
  const I_cl = calcularICl(dados.cloro);

  // 🔴 Crítico
  let critico = false;
  if (I_pH !== null && I_pH < 30) critico = true;
  if (I_cl !== null && I_cl < 30) critico = true;

  // 🔹 IQA
  let IQA =
    0.3 * (I_pH ?? 50) +
    0.4 * (I_cl ?? 50) +
    0.3 * I_visual;

  if (critico) {
    IQA = Math.min(IQA, 40);
  }

  // 🔹 Classificação
  let classificacao;

  if (IQA >= 80) classificacao = "BOA";
  else if (IQA >= 50) classificacao = "MODERADA";
  else classificacao = "RUIM";

  return {
    iqa: Number(IQA.toFixed(1)),
    classificacao,
    detalhes: {
      I_pH,
      I_cl,
      I_cor,
      I_turb,
      I_odor,
      I_visual: Number(I_visual.toFixed(1)),
      critico
    }
  };
};

export function getIqaMeta(classificacao) {
    switch (classificacao) {
        case "BOA":
            return {
                className: "iqa-boa",
                icon: "boa"
            };
        case "MODERADA":
            return {
                className: "iqa-moderada",
                icon: "moderada"
            };
        case "RUIM":
            return {
                className: "iqa-ruim",
                icon: "ruim"
            };
        default:
            return {
                className: "",
                icon: null
            };
    }
}