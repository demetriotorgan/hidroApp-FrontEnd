// validarPayload.js

export function validarPayload(payload) {
  if (!payload) {
    return {
      valido: false,
      mensagem: "Payload não foi gerado.",
    };
  }

  // =========================================================
  // CAMPOS OBRIGATÓRIOS DE NÍVEL RAIZ
  // =========================================================
  if (!payload.data) {
    return {
      valido: false,
      mensagem: "Campo 'data' é obrigatório.",
    };
  }

  if (payload.diaDoCiclo == null) {
    return {
      valido: false,
      mensagem: "Campo 'diaDoCiclo' é obrigatório.",
    };
  }

  // =========================================================
  // OBJETO ENTRADA
  // =========================================================
  if (!payload.entrada) {
    return {
      valido: false,
      mensagem: "Objeto 'entrada' é obrigatório.",
    };
  }

  const {
    leituraPrevistaAtual,
    leituraAtualReal,
    consumoPrevistoAtual,
    consumoRealAtual,
    coeficienteA,
  } = payload.entrada;

  if (leituraPrevistaAtual == null) {
    return {
      valido: false,
      mensagem: "Campo 'entrada.leituraPrevistaAtual' é obrigatório.",
    };
  }

  if (leituraAtualReal == null) {
    return {
      valido: false,
      mensagem: "Campo 'entrada.leituraAtualReal' é obrigatório.",
    };
  }

  if (consumoPrevistoAtual == null) {
    return {
      valido: false,
      mensagem: "Campo 'entrada.consumoPrevistoAtual' é obrigatório.",
    };
  }

  if (consumoRealAtual == null) {
    return {
      valido: false,
      mensagem: "Campo 'entrada.consumoRealAtual' é obrigatório.",
    };
  }

  if (coeficienteA == null) {
    return {
      valido: false,
      mensagem: "Campo 'entrada.coeficienteA' é obrigatório.",
    };
  }

  // =========================================================
  // OBJETO METRICAS
  // =========================================================
  if (!payload.metricas) {
    return {
      valido: false,
      mensagem: "Objeto 'metricas' é obrigatório.",
    };
  }

  const {
    erro,
    erroPercentual,
    erroPorDia,
    erroProjetado,
  } = payload.metricas;

  if (erro == null) {
    return {
      valido: false,
      mensagem: "Campo 'metricas.erro' é obrigatório.",
    };
  }

  if (erroPercentual == null) {
    return {
      valido: false,
      mensagem: "Campo 'metricas.erroPercentual' é obrigatório.",
    };
  }

  if (erroPorDia == null) {
    return {
      valido: false,
      mensagem: "Campo 'metricas.erroPorDia' é obrigatório.",
    };
  }

  if (erroProjetado == null) {
    return {
      valido: false,
      mensagem: "Campo 'metricas.erroProjetado' é obrigatório.",
    };
  }

  // =========================================================
  // PAYLOAD VÁLIDO
  // =========================================================
  return {
    valido: true,
    mensagem: "Payload válido.",
  };
}