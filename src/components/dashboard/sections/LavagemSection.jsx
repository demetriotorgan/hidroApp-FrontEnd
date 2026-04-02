import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../DashboardCard'
import { SoapDispenserDroplet } from 'lucide-react';

const LavagemSection = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className='dashboard-section'>
                <h2>Dados de Lavagem <SoapDispenserDroplet /></h2>
                <small>Dados da última lavagem</small>
                <div className='dashboard-cards'>
                    <DashboardCard title="Água usada (L)">
                        <h3>---</h3>
                    </DashboardCard>
                    <DashboardCard title="Data">
                        <h3>---</h3>
                    </DashboardCard>
                    <DashboardCard title="Carga (kg)">
                        <h3>---</h3>
                    </DashboardCard>
                    <DashboardCard title="Qtd de Produtos(g)">
                        <small>Sabão</small><br></br>
                        <small>Amaciante</small>
                    </DashboardCard>                                        
                    <DashboardCard title="Total de Lavagens">
                        <h3>---</h3>
                    </DashboardCard>                          
                    <DashboardCard title="Média por Lavagem">
                        <small>Água utilizada</small>                        
                    </DashboardCard>                          
                    <DashboardCard title="Média de Carga">
                        <h3>---</h3>
                    </DashboardCard>     
                    <DashboardCard title="Média de Produtos">
                        <small>Sabão</small><br></br>
                        <small>Amaciante</small>
                    </DashboardCard>     
                    <button
                        className="dashboard-button"
                        onClick={() => navigate("/lavagem")}
                    >                        
                        Registrar Lavagem <SoapDispenserDroplet />                    
                    </button>
                </div>
            </section>
        </>
    )
}

export default LavagemSection