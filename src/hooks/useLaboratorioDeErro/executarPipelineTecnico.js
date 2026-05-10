import { motorBaseErro } from "./motores/motorBaseErro";
import tecnicoAceleracaoErro from "./tecnicos/tecnicoAceleracaoErro";
import tecnicoTendenciaErro from "./tecnicos/tecnicoTendenciaErro";
import tecnicoVelocidadeErro from "./tecnicos/tecnicoVelocidadeErro";

export function executarPipelineTecnico(pacote) {

  // =========================================================
  // 🔹 VALIDAÇÃO DE ENTRADA
  // =========================================================
  console.log("🧩 PIPELINE | pacote recebido:", {
    temPacote: !!pacote,
    temLotes: !!pacote?.lotes,
    temGlobal: !!pacote?.lotes?.global,
    temCiclo: !!pacote?.lotes?.ciclo,
    tamanhoGlobal: pacote?.lotes?.global?.length ?? 0,
    tamanhoCiclo: pacote?.lotes?.ciclo?.length ?? 0,
    contexto: pacote?.contexto ?? null,
  });

  if (!pacote?.lotes?.global || !pacote?.lotes?.ciclo) {
    return {
      status: "insuficiente",
      //novo contrato plural      
      tecnicos: {},
      baseGlobal: null,
      baseCiclo: null,
      metadados: {
        motivo: "pacote_invalido_no_pipeline",
        quantidadeDeTecnicos: 0,
        tecnicosExecutados: []
      },
    };
  }

  // =========================================================
  // 🔹 MOTOR (BASE ESTATÍSTICA)
  // =========================================================
  const baseGlobal = motorBaseErro(pacote.lotes.global);
  const baseCiclo = motorBaseErro(pacote.lotes.ciclo);

  console.log("⚙️ PIPELINE | saída motor:", {
    baseGlobal,
    baseCiclo,
  });

  // validação do motor
  if (!baseGlobal?.valido || !baseCiclo?.valido) {
    return {
      status: "insuficiente",
      tecnicos: {},
      baseGlobal,
      baseCiclo,
      metadados: {
        motivo: "motor_base_invalido",
        quantidadeDeTecnicos: 0,
        tecnicosExecutados: []
      },
    };
  }

  // =========================================================
  // 🔹 TÉCNICO (REGRA DE NEGÓCIO)
  // =========================================================
  const tecnicos = {
    tendencia: tecnicoTendenciaErro({
      baseGlobal,
      baseCiclo
    }),
    velocidade: tecnicoVelocidadeErro({
      baseGlobal,
      baseCiclo,
    }),
      aceleracao: tecnicoAceleracaoErro({
      baseGlobal,
      baseCiclo,
    }),
  }

  console.log("🧠 PIPELINE | saída técnico:", tecnicos);

  // =========================================================
  // 🔹 VALIDAÇÃO GLOBAL DOs TÉCNICOS
  // =========================================================
  const nomesTecnicos = Object.keys(tecnicos);

  const tecnicosInvalidos = nomesTecnicos.filter((nome) => {
    const laudo = tecnicos[nome];
    return !laudo || laudo.status !== "ok";
  });

  if (tecnicosInvalidos.length > 0) {
    console.warn("⚠️ PIPELINE | técnicos inválidos:", tecnicosInvalidos);
    return {
      status: "insuficiente",

      tecnicos,

      baseGlobal,
      baseCiclo,

      metadados: {
        motivo: "tecnicos_invalidos_ou_incompletos",
        tecnicosInvalidos,
        quantidadeDeTecnicos: nomesTecnicos.length,
        tecnicosExecutados: nomesTecnicos,
      },
    };
  }

  // =========================================================
  // 🔹 RETORNO PADRONIZADO (PIPELINE VÁLIDO)
  // =========================================================
  const confiabilidade =
    baseGlobal.total > 10 && baseCiclo.total > 10 ? "alta" : "media";

  // =========================================================
  // 🔹 LOG FINAL
  // =========================================================

  console.log("📦 PIPELINE | retorno final:", {
    status: "ok",
    quantidadeDeTecnicos: nomesTecnicos.length,
    tecnicosExecutados: nomesTecnicos,
    confiabilidade
  });

  // =========================================================
  // 🔹 RETORNO PADRONIZADO (NOVO CONTRATO)
  // =========================================================
  return {
    status: "ok",
    //contrato multitécnicos
    tecnicos,
    baseGlobal,
    baseCiclo,

    metadados: {
      confiabilidade,
      quantidadeDeTecnicos: nomesTecnicos.length,
      tecnicosExecutados: nomesTecnicos
    },
  };
}