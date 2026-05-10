import React from 'react';
import './PainelExpedicaoErro.css';

const PainelExpedicaoErro = ({ expedicao }) => {
    if (!expedicao) return null;

    const { dados, meta } = expedicao;

    const tecnicos = dados?.tecnicos ?? {}


    // =========================================================
    // 🔹 BLOQUEIO CORRETO
    // =========================================================
    if (!expedicao?.laudoValido) {
        return (
            <div className="painel erro">
                <h3>Expedição bloqueada</h3>
                <p>{expedicao?.motivoBloqueio || "Motivo não informado"}</p>
            </div>
        );
    }

    // =========================================================
    // 🔹 SEGURANÇA DEFENSIVA
    // =========================================================
    const nomesTecnicos = Object.keys(tecnicos);

    if (nomesTecnicos.length === 0) {
        return (
            <div className="painel erro">
                <h3>Expedição incompleta</h3>
                <p>Dados sem processamento semântico</p>
            </div>
        );
    }

    return (
        <div className="painel-expedicao">
            <header>
                <h2>📦 Painel de Expedição de Erros</h2>
                <span>{meta?.prontoParaExibicao ? "Pronto" : "Processando"}</span>
            </header>

            {Object.entries(tecnicos).map(([nome, laudo]) => {
                const resumo = laudo?.resumo ?? {};
                const insight = laudo?.insight ?? null;

                return (
                    <div key={nome} className="bloco-tecnico">
                        <h2>🧠 Técnico: {nome}</h2>

                        <section>
                            <h3>Resumo Técnico</h3>
                            <p>Severidade: {resumo?.nivel ?? "N/A"}</p>
                            <p>Tendência: {resumo?.tendencia ?? "N/A"}</p>
                            <p>
                                Intensidade: {resumo?.intensidade?.toFixed?.(2) ?? "N/A"}
                            </p>
                            <p>Diagnóstico: {resumo?.diagnostico ?? "N/A"}</p>
                            <p>
                                Média Global: {resumo?.leitura?.global?.toFixed?.(2) ?? "N/A"}
                            </p>
                            <p>
                                Média Ciclo: {resumo?.leitura?.ciclo?.toFixed?.(2) ?? "N/A"}
                            </p>
                        </section>

                        <section>
                            <h3>Leitura Operacional</h3>
                            <p>Status: {insight?.leituraStatus ?? "N/A"}</p>
                            <p>Confiança: {insight?.leituraConfianca ?? "N/A"}</p>
                            <p>Diagnóstico: {insight?.leituraDiagnostico ?? "N/A"}</p>
                        </section>

                        <section>
                            <h3>Recomendação</h3>
                            <p>
                                {insight?.recomendacao ??
                                    "Sem recomendação disponível."}
                            </p>
                        </section>
                    </div>
                );
            })}

        </div >
    );
};

export default PainelExpedicaoErro;