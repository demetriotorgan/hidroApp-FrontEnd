export function normalizarDados(formData) {
  return {
    ph: formData.ph !== "" ? Number(formData.ph) : null,
    cloro: formData.cloro !== "" ? Number(formData.cloro) : null,
    cor: formData.cor,
    turbidez: formData.turbidez,
    odor: formData.odor
  };
}