import { ArrowBigLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { calcularChuvaMm } from '../services/pluviometroService';
import api from '../services/api';
import { usePluviometro } from '../hooks/usePluviometro ';
import CardResumoPluviometro from '../components/CardResumoPluviometro ';
import GraficoChuvaMm from '../components/GraficoChuvaMm ';


const Pluviometro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        data: "",
        coluna: "",
        mm: "",
        obs: ""
    });
    const { salvarPluviometro, listarPluviometros, deletarPluviometro, registros, loading, loadingRegistros } = usePluviometro();

    useEffect(() => {
        listarPluviometros();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updatedData = {
            ...formData,
            [name]: value
        };

        if (name === "coluna" && value !== "") {
            updatedData.mm = calcularChuvaMm(value);
        } else if (name === "coluna") {
            updatedData.mm = "";
        }
        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await salvarPluviometro(formData, () => {
            setFormData({
                data: "",
                coluna: "",
                mm: "",
                obs: ""
            });
            listarPluviometros();
        });
    };

    return (
        <>
            <div>
                <h2><ArrowBigLeft
                    onClick={() => navigate("/")}
                /> Registros do Pluviômetro</h2>
            </div>
            <form className="form-container" onSubmit={handleSubmit}>
                {/* Data */}
                <div className="form-group">
                    <label>Data</label>
                    <input
                        type="date"
                        name="data"
                        className="form-input"
                        value={formData.data}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Altura da coluna */}
                <div className="form-group">
                    <label>Altura da coluna de água (cm)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="coluna"
                        className="form-input"
                        value={formData.coluna}
                        onChange={handleChange}
                        placeholder="Ex: 2.5"
                        required
                    />
                </div>

                {/* Chuva em mm (calculado) */}
                <div className="form-group">
                    <label>Altura da chuva (mm)</label>
                    <input
                        type="number"
                        name="mm"
                        className="form-input"
                        value={formData.mm}
                        readOnly
                        placeholder="Calculado automaticamente"
                    />
                </div>

                {/* Observação */}
                <div className="form-group">
                    <label>Observação</label>
                    <textarea
                        name="obs"
                        className="form-textarea"
                        value={formData.obs}
                        onChange={handleChange}
                        placeholder="Opcional..."
                    />
                </div>

                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar Registro"}
                </button>
            </form>

            <h2>Registros de Pluviômetro</h2>
            {loadingRegistros ? (
                <p>Carregando registros...</p>
            ) : registros.length === 0 ? (
                <p>Nenhum registro encontrado.</p>
            ) : (
                registros.map((item) => (
                    <CardResumoPluviometro
                        key={item._id}
                        id={item._id}
                        data={item.data}
                        coluna={item.coluna}
                        mm={item.mm}
                        obs={item.obs}
                        onDelete={deletarPluviometro}
                    />
                ))
            )}

            <GraficoChuvaMm dados={registros} />
        </>
    )
}

export default Pluviometro