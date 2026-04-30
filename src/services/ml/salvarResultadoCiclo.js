import api from "../api";

export async function salvarResultadoCiclo(payload) {
  try {
    console.log("📦 Enviando para API:", payload);

    const response = await api.post("/ciclos-analise", payload);
    console.log("📨 Resposta da API:", response.data);

    return response.data;

  } catch (error) {
    console.error("❌ Erro ao salvar ciclo:");
  console.error("status:", error.response?.status);
  console.error("data:", error.response?.data);
  console.error("message:", error.message);
  throw error;
  }
}