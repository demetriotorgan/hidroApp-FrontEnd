import { useState } from "react";
import { Save } from "lucide-react";
import useIqaForm from "../hooks/useIqaForm";
import LoadingModal from "./LoadingModal";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { getIqaMeta } from "../services/iqa/meta";

export default function FormIqa({ onSuccess }) {
    const { formData, handleChange, loading, handleSubmit } = useIqaForm();   
   

    return (
        <>
            <LoadingModal
                isOpen={loading}
                message="Salvando Registro..."
            />
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Data
                        <input
                            className="form-input"
                            type="date"
                            name="data"
                            value={formData.data}
                            onChange={handleChange} />
                    </label>

                    <label>Volume (L)
                        <input
                            className="form-input"
                            type="number"
                            name="volume"
                            value={formData.volume}
                            onChange={handleChange} />
                    </label>

                    <label>Hora Inicial
                        <input
                            className="form-input"
                            type="time"
                            name="horaInicial"
                            value={formData.horaInicial}
                            onChange={handleChange} />
                    </label>

                    <label>Hidrometro Inicial
                        <input
                            className="form-input"
                            type="number"
                            name="hidrometroInicial"
                            value={formData.hidrometroInicial}
                            onChange={handleChange}
                        />
                    </label>

                    <label>Total de Recirculação
                        <input
                            className="form-input"
                            type="number"
                            name="totalDeRecirculacao"
                            value={formData.totalDeRecirculacao}
                            onChange={handleChange} />
                    </label>

                    <label>pH
                        <input
                            className="form-input"
                            type="number"
                            name="ph"
                            value={formData.ph}
                            onChange={handleChange}
                        />
                    </label>

                    <label>Lavagens no dia
                        <input
                            className="form-input"
                            type="number"
                            name="lavagensNoDia"
                            value={formData.lavagensNoDia}
                            onChange={handleChange} />
                    </label>

                    <label>Cor
                        <select
                            className="form-input"
                            name="cor"
                            value={formData.cor}
                            onChange={handleChange}>
                            <option value="transparente">Transparente</option>
                            <option value="cinzaClaro">Cinza Claro</option>
                            <option value="cinza">Cinza</option>
                            <option value="cinzaEscuro">Cinza Escuro</option>
                        </select>
                    </label>

                    <label>Turbidez
                        <select
                            className="form-input"
                            name="turbidez"
                            value={formData.turbidez}
                            onChange={handleChange}>
                            <option value="baixa">Baixa</option>
                            <option value="media">Média</option>
                            <option value="alta">Alta</option>
                            <option value="muitaAlta">Muito Alta</option>
                        </select>
                    </label>

                    <label>Odor
                        <select
                            className="form-input"
                            name="odor"
                            value={formData.odor}
                            onChange={handleChange}>
                            <option value="semOdor">Sem odor</option>
                            <option value="leveOdor">Leve odor</option>
                            <option value="forteOdor">Forte odor</option>
                        </select>
                    </label>

                    <label>Valor de IQA
                        <input
                            className="form-input"
                            name="valorDeiqa"
                            type="number"
                            value={formData.valorDeiqa}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>

                    <label>Obs
                        <input
                            className="form-input"
                            type="text"
                            name="obs"
                            value={formData.obs}
                            onChange={handleChange} />
                    </label>

                    <label>Hidrometro Final
                        <input
                            className="form-input"
                            type="number"
                            name="hidrometroFinal"
                            value={formData.hidrometroFinal}
                            onChange={handleChange}
                        />
                    </label>

                    <label>Hora Final
                        <input
                            className="form-input"
                            type="time"
                            name="horaFinal"
                            value={formData.horaFinal}
                            onChange={handleChange} />
                    </label>


                    <label>Tempo de recirculação (min)
                        <input
                            className="form-input"
                            type="number"
                            name="tempoRecirculacao"
                            value={formData.tempoRecirculacao}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                </div>

                <button type="submit" className="form-button">
                    Salvar Registro <Save />
                </button>
            </form>
        </>
    );
}