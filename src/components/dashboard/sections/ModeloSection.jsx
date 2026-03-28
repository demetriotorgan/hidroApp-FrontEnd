import React from 'react'
import DashboardCard from '../DashboardCard'
import { FileBox } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ModeloSection = ({ data }) => {
    const navigate = useNavigate();
    const corClasse = `status-${data.viabilidadeDosDados.cor}`;

    return (
        <section className="dashboard-section">
            <h2>Modelo de Consumo <FileBox /></h2>
            <div className="dashboard-cards">
                <DashboardCard title="Modelo">
                    <h5>
                        {data.viabilidadeDosDados.valor !== null
                            ? "V(d) = " + Number(data.viabilidadeDosDados.valor).toFixed(2) + "d"
                            : "--"}
                    </h5>
                    <small>{data.viabilidadeDosDados.mensagem}</small>
                </DashboardCard>

                <DashboardCard title="Confiabilidade">
                    <h3 className={`status ${corClasse}`}>
                        {data.viabilidadeDosDados.confiabilidade}
                    </h3>
                    <small>{data.viabilidadeDosDados.nivel}</small>
                </DashboardCard>

                <button
                    className="dashboard-button"
                    onClick={() => navigate("/modelo")}
                >
                    <FileBox size={18} />
                    Ver Modelo
                </button>
            </div>
        </section>
    )
}

export default ModeloSection