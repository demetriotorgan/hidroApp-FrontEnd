import { CloudRainWind } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { useNavigate } from "react-router-dom";

function PluviometroSection({ data }) {
  const navigate = useNavigate();

  return (
    <section className="dashboard-section">
      <h2>Pluviometria <CloudRainWind size={18} /></h2>

      <div className="dashboard-cards">

        <DashboardCard title="Dias sem Chuva">
          <h3>{data.diasSemChuva} dias</h3>
        </DashboardCard>

        <DashboardCard title="Coletado">
          <h3>{data.mmUltimaChuva} mm</h3>
        </DashboardCard>

        <DashboardCard title="Registros">
          <h3>{data.total}</h3>
        </DashboardCard>

        <DashboardCard title="Média de mm">
          <h3>{data.media} mm</h3>
        </DashboardCard>

        <button
          className="dashboard-button"
          onClick={() => navigate("/pluviometro")}
        >
          <CloudRainWind size={18} />
          Chuvas
        </button>

      </div>
    </section>
  );
}

export default PluviometroSection;