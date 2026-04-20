import { Trash2, Pencil } from "lucide-react";
import React from "react";
import LoadingModal from "./LoadingModal";

const CardQualidadeIQA = ({ registro, onDelete, onEdit, deletando }) => {
    if (!registro) return null;

    // ================= FORMATADORES =================
    const formatarData = (dataISO) => {
        if (!dataISO) return "—";
        const d = new Date(dataISO);
        return d.toLocaleDateString("pt-BR");
    };

    const formatarHora = (dataISO) => {
        if (!dataISO) return "—";
        const d = new Date(dataISO);
        return d.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getClasseIQA = (valor) => {
        if (valor === null || valor === undefined) return "";

        if (valor >= 0.8) return "iqa-boa";
        if (valor >= 0.5) return "iqa-moderada";
        return "iqa-ruim";
    };

    const getLabelIQA = (valor) => {
        if (valor === null || valor === undefined) return "—";

        if (valor >= 0.8) return "Boa";
        if (valor >= 0.5) return "Moderada";
        return "Ruim";
    };

    return (
        <div className="card-hidrometro">
            <LoadingModal
                isOpen={deletando}
                message="Deletando IQA..."
            />

            {/* ================= HEADER ================= */}
            <div className="card-header">
                <h2>Registro IQA</h2>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{formatarData(registro.data)}</span>

                    {/* BOTÃO EDITAR */}
                    <button
                        className="btn-edit"
                        title="Editar registro"
                        onClick={() => onEdit(registro)}
                    >
                        <Pencil size={18} />
                    </button>

                    {/* BOTÃO EXCLUIR */}
                    <button
                        className="btn-delete"
                        onClick={() => onDelete(registro._id)}
                        title="Excluir registro"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* ================= INFORMAÇÕES ================= */}
            <div className="card-section">
                <h3 className="form-section-title">📌 Informações</h3>

                <p><strong>Data:</strong> {formatarData(registro.data)}</p>
                <p><strong>Hora Inicial:</strong> {formatarHora(registro.horaInicial)}</p>
                <p><strong>Hora Final:</strong> {formatarHora(registro.horaFinal)}</p>
                <p><strong>Observação:</strong> {registro.obs || "—"}</p>
            </div>

            {/* ================= OPERAÇÃO ================= */}
            <div className="card-section">
                <h3 className="form-section-title">⚙️ Operação</h3>

                <p><strong>Volume:</strong> {registro.volume ?? "—"} L</p>
                <p><strong>Recirculação:</strong> {registro.totalDeRecirculacao ?? "—"}x</p>
                <p><strong>Tempo Recirculação:</strong> {registro.tempoRecirculacao ?? "—"} min</p>
                <p><strong>Lavagens no Dia:</strong> {registro.lavagensNoDia ?? "—"}</p>
            </div>

            {/* ================= HIDRÔMETRO ================= */}
            <div className="card-section">
                <h3 className="form-section-title">💧 Hidrômetro</h3>

                <p><strong>Inicial:</strong> {registro.hidrometroInicial ?? "—"}</p>
                <p><strong>Final:</strong> {registro.hidrometroFinal ?? "—"}</p>
            </div>

            {/* ================= PARÂMETROS ================= */}
            <div className="card-section">
                <h3 className="form-section-title">🧪 Parâmetros</h3>

                <p><strong>pH:</strong> {registro.ph ?? "—"}</p>
            </div>

            {/* ================= IQA ================= */}
            <div className="card-section">
                <h3 className="form-section-title">📊 Índice de Qualidade da Água</h3>

                <div className={`iqa-result ${getClasseIQA(registro.valorDeiqa)}`}>
                    <span className="iqa-value">
                        {registro.valorDeiqa !== null && registro.valorDeiqa !== undefined
                            ? Number(registro.valorDeiqa).toFixed(2)
                            : "—"}
                    </span>

                    <span className="iqa-label">
                        {getLabelIQA(registro.valorDeiqa)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CardQualidadeIQA;