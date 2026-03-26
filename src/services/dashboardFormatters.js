  import { TrendingUp, TrendingDown, Minus } from "lucide-react";
  import { ActivityIcon, CloudRainWind} from "lucide-react";
  import {classificarCV} from '../services/hidrometroService';
  
  export function getTendenciaConfig(resultado) {
  if (!resultado) {
    return { icon: "neutral", color: "gray", texto: "--" };
  }

  if (resultado.tipo === "aumento") {
    return { icon: "up", color: "red", texto: `+${resultado.variacao}%` };
  }

  if (resultado.tipo === "queda") {
    return { icon: "down", color: "green", texto: `${resultado.variacao}%` };
  }

  return { icon: "neutral", color: "gray", texto: "0%" };
};



export function getCVConfig(cv) {
  if (cv == null || cv.cv == null) {
    return {
      icon: "neutral",
      color: "gray",
      texto: "--"
    };
  }

  const valor = cv.cv; // 👈 AQUI está a chave
  const tipo = classificarCV(valor);

  switch (tipo) {
    case "Muito Estável":
      return { icon: "activity", color: "green", texto: `${tipo} (${valor}%)` };

    case "Estável":
      return { icon: "activity", color: "limegreen", texto: `${tipo} (${valor}%)` };

    case "Moderado":
      return { icon: "activity", color: "orange", texto: `${tipo} (${valor}%)` };

    case "Variável":
      return { icon: "rain", color: "orange", texto: `${tipo} (${valor}%)` };

    case "Muito Variável":
      return { icon: "rain", color: "red", texto: `${tipo} (${valor}%)` };

    default:
      return { icon: "neutral", color: "gray", texto: "--" };
  }
};


export function formatarStatusTexto(status) {
  switch (status) {
    case "muito_alto":
      return "Muito alto";
    case "alto":
      return "Alto";
    case "normal":
      return "Normal";
    case "baixo":
      return "Baixo";
    default:
      return "Sem dados";
  }
}