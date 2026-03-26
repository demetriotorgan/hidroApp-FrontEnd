export function classificarIQA(IQA) {
  if (IQA >= 80) return "BOA";
  if (IQA >= 50) return "MODERADA";
  return "RUIM";
}