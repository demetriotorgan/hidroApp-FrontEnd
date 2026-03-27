import { ActivityIcon } from "lucide-react";
import './Dashboard.css'
import { useDashboardData } from "../hooks/useDashboardData";

import HidrometroSection from "../components/dashboard/sections/HidrometroSection";
import PluviometroSection from "../components/dashboard/sections/PluviometroSection";
import QualidadeAguaSection from "../components/dashboard/sections/QualidadeAguaSection";
import ModeloSection from "../components/dashboard/sections/ModeloSection";

function Dashboard() {

  const { loading, hidrometro, pluviometro,qualidadeAgua, modelo } = useDashboardData();  

  if (loading) {
    return <p>Carregando dashboard...</p>;
  }

  return (
    <div className="dashboard">
      <h1>Painel de Monitoramento <ActivityIcon /></h1>
      <HidrometroSection data={hidrometro}/>
      <PluviometroSection data={pluviometro}/>      
      <QualidadeAguaSection data={qualidadeAgua}/>
      <ModeloSection data={modelo} />
    </div>
  );
}

export default Dashboard;