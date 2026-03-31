import { Activity, FileBox } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../DashboardCard'

const PrevisaoSection = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="dashboard-section">
                <h2>Previsão de Consumo <Activity /></h2>
                <div className="dashboard-cards">
                    <DashboardCard title="Previsão próximos 3 dias">
                        <h3>---</h3>
                    </DashboardCard>
                    <DashboardCard title="Erro percentual atual">
                        <h3>---</h3>
                    </DashboardCard>
                    <button
                        className="dashboard-button"
                        onClick={() => navigate("/previsao")}
                    >
                        <Activity size={18} />
                        Ver Modelo
                    </button>
                </div>
            </section>
        </>
    )
}

export default PrevisaoSection