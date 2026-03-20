// services/dataService.js

// 📅 Data atual no formato YYYY-MM-DD (para input date)
export function getDataAtual() {
    const agora = new Date();

    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

// ⏰ Hora atual no formato HH:MM (para input time)
export function getHoraAtual() {
    const agora = new Date();

    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    return `${horas}:${minutos}`;
}