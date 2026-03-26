export function getIqaMeta(classificacao) {
  switch (classificacao) {
    case "BOA":
      return { className: "iqa-boa", icon: "boa" };
    case "MODERADA":
      return { className: "iqa-moderada", icon: "moderada" };
    case "RUIM":
      return { className: "iqa-ruim", icon: "ruim" };
    default:
      return { className: "", icon: null };
  }
}