import { Atom, Flag, Pipette, TestTubeDiagonal, WandSparkles, Waves } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../DashboardCard';

const CloroSection = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className='dashboard-section'>
                <h2><TestTubeDiagonal /> Cloração</h2>

                <div className="dashboard-cards">
                    <DashboardCard title='Última Cloração'>
                        <Pipette /> <h3>---</h3>
                    </DashboardCard>

                    <DashboardCard title='PPM'>
                        <Atom /> <h3>---</h3>
                    </DashboardCard>

                    <DashboardCard title='Reservatório (L)'>
                        <Waves /> <h3>---</h3>
                    </DashboardCard>

                    <DashboardCard title='pH Final'>
                        <WandSparkles /> <h3>---</h3>
                    </DashboardCard>

                    <button
                        className="dashboard-button"
                        onClick={() => navigate("/cloro")}
                    >
                        <TestTubeDiagonal size={18} />
                        Cloração
                    </button>
                </div>
            </section>
        </>
    )
}

export default CloroSection