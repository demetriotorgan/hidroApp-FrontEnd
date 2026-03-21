import { Trash2 } from 'lucide-react';
import React from 'react'

const QualidadeAguaCard = ({ registro, onDelete }) => {
    if (!registro) return null;

    // formatação simples de data
    const formatarData = (dataISO) => {
        const d = new Date(dataISO);
        return d.toLocaleDateString("pt-BR");
    };

    const formatarHora = (dataISO) => {
        const d = new Date(dataISO);
        return d.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getClasseIQA = (classificacao) => {
        if (!classificacao) return "";

        const c = classificacao.toLowerCase();

        if (c.includes("boa")) return "iqa-boa";
        if (c.includes("moderada")) return "iqa-moderada";
        if (c.includes("ruim")) return "iqa-ruim";

        return "";
    };

    return (
        <div className="card-hidrometro">

            {/* HEADER */}
            <div className="card-header">
                <h2>Registro</h2>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{formatarData(registro.data)}</span>

                    <button
                        className="btn-delete"
                        onClick={() => {
                            onDelete(registro._id);
                        }}
                        title="Excluir registro"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* ================= INFORMAÇÕES GERAIS ================= */}
            <div className="card-section">
                <h3 className="form-section-title">📌 Informações Gerais</h3>

                <p><strong>Data:</strong> {formatarData(registro.data)}</p>
                <p><strong>Hora:</strong> {formatarHora(registro.hora)}</p>
                <p><strong>Observação:</strong> {registro.obs || "—"}</p>
            </div>

            {/* ================= OPERAÇÃO ================= */}
            <div className="card-section">
                <h3 className="form-section-title">⚙️ Operação do Sistema</h3>

                <p><strong>Volume:</strong> {registro.volume} L</p>
                <p><strong>Recirculação:</strong> {registro.recirculacao}x</p>
                <p><strong>Tempo Recirculação:</strong> {registro.tempoRecirculacao} min</p>
                <p><strong>Filtragem:</strong> {registro.filtragem ? "Ativa" : "Inativa"}</p>
                <p><strong>Tempo de Filtragem:</strong> {registro.tempoDeFiltragem} min</p>
                <p><strong>Lavagens:</strong> {registro.lavagensDoDia}</p>
            </div>

            {/* ================= PARÂMETROS ================= */}
            <div className="card-section">
                <h3 className="form-section-title">🧪 Parâmetros Químicos</h3>

                <p><strong>pH:</strong> {registro.ph}</p>
                <p><strong>Cloro:</strong> {registro.cloro} mg/L</p>
                <p>
                    <strong>Ácido:</strong> {registro.acido} ml ({registro.tipoAcido})
                </p>
                <p><strong>Água Sanitária:</strong> {registro.aguaSanitaria} ml</p>
            </div>

            {/* ================= QUALIDADE ================= */}
            <div className="card-section">
                <h3 className="form-section-title">💧 Qualidade da Água</h3>

                <p><strong>Cor:</strong> {registro.cor}</p>
                <p><strong>Turbidez:</strong> {registro.turbidez}</p>
                <p><strong>Odor:</strong> {formatarOdor(registro.odor)}</p>
            </div>

            {/* ================= IQA ================= */}
            <div className="card-section">
                <h3 className="form-section-title">📊 Índice de Qualidade da Água (IQA)</h3>

                <div className={`iqa-result ${getClasseIQA(registro.classificacaoIQA)}`}>
                    <span className="iqa-value">
                        {Number(registro.iqa).toFixed(1)}
                    </span>

                    <span className="iqa-label">
                        {registro.classificacaoIQA}
                    </span>
                </div>
            </div>
        </div>

    )
}

/* Função auxiliar para deixar odor mais legível */
function formatarOdor(odor) {
    const mapa = {
        semOdor: "Sem odor",
        forte: "Forte",
        moderado: "Moderado",
    };

    return mapa[odor] || odor;
}

export default QualidadeAguaCard