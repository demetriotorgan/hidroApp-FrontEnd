import { useState } from "react";
import { Save } from "lucide-react";
import useTamborForm from "../hooks/useTamborForm";
import LoadingModal from "./LoadingModal";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { getIqaMeta } from "../services/iqa/meta";

export default function FormTambor({ onSuccess }) {
    const { formData, handleChange, salvarRegistro, resetForm, loading, iqa, calcularIQAAtual } = useTamborForm();
    async function handleSubmit(e) {
        e.preventDefault();

        const resultado = await salvarRegistro();

        if (resultado.success) {
            alert("Registro salvo com sucesso!");
            resetForm();
            onSuccess && onSuccess();
        } else {
            alert("Erro ao salvar registro");
        }
    };

    function renderIqaIcon(iconType) {
        switch (iconType) {
            case "boa":
                return <CheckCircle className="iqa-icon boa" />;
            case "moderada":
                return <AlertTriangle className="iqa-icon moderada" />;
            case "ruim":
                return <XCircle className="iqa-icon ruim" />;
            default:
                return null;
        }
    };

    const meta = iqa?.classificacao
        ? getIqaMeta(iqa.classificacao)
        : { className: "", icon: null };

    return (
        <>
            <LoadingModal
                isOpen={loading}
                message="Salvando Registro..."
            />
            <form onSubmit={handleSubmit} className="form-container">

                {/* 📅 Informações Gerais */}
                <h3 className="form-section-title">Informações Gerais</h3>

                <div className="form-group">
                    <label>Data</label>
                    <input
                        type="date"
                        name="data"
                        className="form-input"
                        value={formData.data}
                        onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Hora</label>
                    <input
                        type="time"
                        name="hora"
                        className="form-input"
                        value={formData.hora}
                        onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Volume (L)</label>
                    <input
                        type="number"
                        name="volume"
                        className="form-input"
                        value={formData.volume}
                        onChange={handleChange} />
                </div>

                {/* 🔄 Operação */}
                <h3 className="form-section-title">Operação do Sistema</h3>

                <div className="form-group">
                    <label>Número de Recirculação</label>
                    <input
                        type="number"
                        name="recirculacao"
                        className="form-input"
                        value={formData.recirculacao}
                        onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Tempo de recirculação (min)</label>
                    <input
                        type="number"
                        name="tempoRecirculacao"
                        className="form-input"
                        value={formData.tempoRecirculacao}
                        onChange={handleChange} />
                </div>

                <div className="form-group form-checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="filtragem"
                            checked={formData.filtragem}
                            onChange={handleChange} />
                        Filtragem ativa
                    </label>
                </div>

                <div className="form-group">
                    <label>Tempo de filtragem (min)</label>
                    <input
                        type="number"
                        name="tempoDeFiltragem"
                        className="form-input"
                        value={formData.tempoDeFiltragem}
                        onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Lavagens do dia</label>
                    <input
                        type="number"
                        name="lavagensDoDia"
                        className="form-input"
                        value={formData.lavagensDoDia}
                        onChange={handleChange} />
                </div>

                {/* 🧪 Químico */}
                <h3 className="form-section-title">Parâmetros Químicos</h3>

                <div className="form-group">
                    <label>pH</label>
                    <input
                        type="number"
                        step="0.1"
                        name="ph"
                        className="form-input"
                        value={formData.ph}
                        onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Cloro (mg/L)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="cloro"
                        className="form-input"
                        value={formData.cloro}
                        onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Ácido (g)</label>
                    <input
                        type="number"
                        name="acido"
                        className="form-input"
                        value={formData.acido}
                        onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Tipo de ácido</label>
                    <input
                        type="text"
                        name="tipoAcido"
                        className="form-input"
                        value={formData.tipoAcido}
                        onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Água sanitária (ml)</label>
                    <input
                        type="number"
                        name="aguaSanitaria"
                        className="form-input"
                        value={formData.aguaSanitaria}
                        onChange={handleChange} />
                </div>

                {/* 🌫️ Sensorial */}
                <h3 className="form-section-title">Qualidade da Água</h3>

                <div className="form-group">
                    <label>Cor</label>
                    <select
                        name="cor"
                        className="form-input"
                        value={formData.cor}
                        onChange={handleChange}>
                        <option value="transparente">Transparente</option>
                        <option value="cinzaClaro">Cinza Claro</option>
                        <option value="cinza">Cinza</option>
                        <option value="cinzaEscuro">Cinza Escuro</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Turbidez</label>
                    <select
                        name="turbidez"
                        className="form-input"
                        value={formData.turbidez}
                        onChange={handleChange}>
                        <option value="baixa">Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                        <option value="muitaAlta">Muito Alta</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Odor</label>
                    <select
                        name="odor"
                        className="form-input"
                        value={formData.odor}
                        onChange={handleChange}>
                        <option value="semOdor">Sem odor</option>
                        <option value="leveOdor">Leve odor</option>
                        <option value="forteOdor">Forte odor</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Obs</label>
                    <input
                        type="text"
                        name="obs"
                        className="form-input"
                        value={formData.obs}
                        onChange={handleChange} />
                </div>

                <button
                    type="button"
                    className="btn-iqa"
                    onClick={calcularIQAAtual}
                >
                    Calcular IQA
                </button>



                {iqa && (
                    <div className={`iqa-result ${meta.className}`}>
                        {iqa.status === "incompleto" ? (
                            <span>{iqa.mensagem}</span>
                        ) : (
                            <>
                                <div className="iqa-left">
                                    {renderIqaIcon(meta.icon)}

                                    <div className="iqa-value">
                                        IQA: {iqa.iqa}
                                    </div>
                                </div>

                                <div className="iqa-label">
                                    {iqa.classificacao}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {iqa?.insights?.length > 0 && (
                    <div className="iqa-insights">
                        {iqa.insights.map((item, index) => (
                            <div key={index} className={`insight ${item.tipo}`}>
                                {item.mensagem}
                            </div>
                        ))}
                    </div>
                )}

                <button type="submit" className="form-button">
                    Salvar Registro <Save />
                </button>
            </form>
        </>

    );
}