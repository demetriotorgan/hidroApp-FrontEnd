import { Atom, Flag, Pipette, TestTubeDiagonal, WandSparkles, Waves } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../DashboardCard';
import useCloracao from '../../../hooks/useCloracao';
import { getUltimaCloracao } from '../../../services/cloracaoUtils';
import { formatarData } from '../../../services/dataUtils';

const CloroSection = ({dadosUltimaCloracao,dadosCloracao}) => {
    

    const navigate = useNavigate();
    return (
        <>
            <section className='dashboard-section'>
                <h2><TestTubeDiagonal /> Cloração</h2>

                <div className="dashboard-cards">
                    <DashboardCard title='Última Cloração'>
                        <Pipette /> <h3>{dadosUltimaCloracao?.produto || '---'}(g)</h3>
                    </DashboardCard>

                    <DashboardCard title='Concentração Objetivo'>
                        <Atom /> <h3>{dadosUltimaCloracao?.concentracao || '---'}(mg/L)</h3>
                    </DashboardCard>

                    <DashboardCard title='Reservatório Alvo'>
                        <Waves /> <h3>{dadosUltimaCloracao?.reservatorio || '---'}(L)</h3>
                    </DashboardCard>

                    <DashboardCard title='Data'>
                        <WandSparkles /> <h3>{formatarData(dadosUltimaCloracao?.data) || '---'}</h3>
                    </DashboardCard>

                    <DashboardCard title='Volume Médio'>
                        <h3>{dadosCloracao.volumeMedio}(L)</h3>
                    </DashboardCard>

                    <DashboardCard title='Cloro Médio'>
                        <h3>{dadosCloracao.produtoMedio}(g)</h3>
                    </DashboardCard>

                    <DashboardCard title='Concentração Média'>
                        <h3>{dadosCloracao.concentracaoMedia}(g/L)</h3>
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