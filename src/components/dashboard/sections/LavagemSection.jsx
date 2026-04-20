import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../DashboardCard'
import {
    SoapDispenserDroplet,
    Droplet,
    Calendar,
    Package,
    Coffee,
    ListChecks,
    Zap,
    Scale,
    Bubbles
} from 'lucide-react'
import {
    calcularMediaDiaria,
    getMediaAgua,
    getMediaCarga,
    getMediaProdutos,
    getTotalLavagens,
    getUltimaLavagem
} from '../../../services/lavagemService'
import { useLavagem } from '../../../hooks/useLavagem'
import { formatarData } from '../../../services/dataUtils'

const LavagemSection = ({ultimaLavagem,mediasProdutos,lavagemHook,eficienciaGlobal}) => {
    const navigate = useNavigate()  

    return (
        <section className="dashboard-section">
            <h2>Dados de Lavagem <SoapDispenserDroplet /></h2>
            <small>Dados da última lavagem</small>
            <div className="dashboard-cards">

                <DashboardCard title="Água usada (L)">
                    <div className="flex flex-col items-center justify-center">
                        <Droplet size={18} />
                        <h3>{ultimaLavagem ? ultimaLavagem.aguaUsada : '---'}</h3>
                    </div>
                </DashboardCard>

                <DashboardCard title="Data">
                    <div className="flex flex-col items-center justify-center">
                        <Calendar size={18} />
                        <h3>{ultimaLavagem ? formatarData(ultimaLavagem.data) : '---'}</h3>
                    </div>
                </DashboardCard>

                <DashboardCard title="Carga (kg)">
                    <div className="flex flex-col items-center justify-center">
                        <Package size={18} />
                        <h3>{ultimaLavagem ? ultimaLavagem.carga : '---'}</h3>
                    </div>
                </DashboardCard>

                <DashboardCard title="Qtd de Produtos (g)">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                            <Bubbles size={18} />
                            <small>Sabão: {ultimaLavagem ? ultimaLavagem.produtos.sabao : '---'}</small>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bubbles size={18} />
                            <small>Amaciante: {ultimaLavagem ? ultimaLavagem.produtos.amaciante : '---'}</small>
                        </div>
                    </div>
                </DashboardCard>

                <DashboardCard title="Total de Lavagens">
                    <div className="flex flex-col items-center justify-center">
                        <ListChecks size={18} />
                        <h3>{getTotalLavagens(lavagemHook.lavagens)}</h3>
                    </div>
                </DashboardCard>

                <DashboardCard title="Média por Lavagem">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="mb-2">  {/* Espaço entre ícone e texto */}
                            <Zap size={18} />      {/* Ícone maior e centralizado */}
                        </div>
                        <h3 className="text-center text-gray-700">
                            {lavagemHook.lavagens.length > 0
                                ? getMediaAgua(lavagemHook.lavagens)
                                : '---'} L
                        </h3>
                    </div>
                </DashboardCard>

                <DashboardCard title="Média de Carga">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="mb-2">
                            <Scale size={18} /> {/* Ícone maior e centralizado */}
                        </div>
                        <h3 className="text-center text-gray-700">
                            {lavagemHook.lavagens.length > 0
                                ? getMediaCarga(lavagemHook.lavagens)
                                : '---'} kg
                        </h3>
                    </div>
                </DashboardCard>

                <DashboardCard title="Média de Produtos">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2">
                            <SoapDispenserDroplet size={18} />
                            <small>
                                Sabão: {lavagemHook.lavagens.length > 0 ? mediasProdutos.sabao : '---'} g
                            </small>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <SoapDispenserDroplet size={18} />
                            <small>
                                Amaciante: {lavagemHook.lavagens.length > 0 ? mediasProdutos.amaciante : '---'} g
                            </small>
                        </div>
                    </div>
                </DashboardCard>

                <DashboardCard title="EFR Global">
                    <h3>{eficienciaGlobal.efrGeral.toFixed(2)}</h3>
                </DashboardCard>

                <DashboardCard title="EFR Global por Lavagens">
                    <h3>{eficienciaGlobal.efrLavagem.toFixed(2)}</h3>
                </DashboardCard>

                 <DashboardCard title="EFR Global por Enxágues">
                    <h3>{eficienciaGlobal.efrEnxague.toFixed(2)}</h3>
                </DashboardCard>

                <DashboardCard title="Volume Médio Diário de Lavagem">
                    <h3>{calcularMediaDiaria(lavagemHook.lavagens)}(L)</h3>
                </DashboardCard>

                <button
                    className="dashboard-button"
                    onClick={() => navigate("/lavagem")}
                >
                    Registrar Lavagem <SoapDispenserDroplet />
                </button>

            </div>
        </section>
    )
}

export default LavagemSection