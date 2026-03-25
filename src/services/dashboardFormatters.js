  import { TrendingUp, TrendingDown, Minus } from "lucide-react";
  import { ActivityIcon, CloudRainWind} from "lucide-react";
  
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
  if (!cv) {
    return {
      icon: "neutral",
      color: "gray",
      texto: "--"
    };
  }

  switch (cv.tipo) {
    case "Muito Estável":
      return { icon: "activity", color: "green", texto: `${cv.cv}%` };

    case "Estável":
      return { icon: "activity", color: "limegreen", texto: `${cv.cv}%` };

    case "Moderado":
      return { icon: "activity", color: "orange", texto: `${cv.cv}%` };

    case "Variável":
      return { icon: "rain", color: "orange", texto: `${cv.cv}%` };

    case "Muito Variável":
      return { icon: "rain", color: "red", texto: `${cv.cv}%` };

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