import { FlaskConical } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { useNavigate } from "react-router-dom";

function QualidadeAguaSection({ data }) {
  const navigate = useNavigate();

  return (
    <section className="dashboard-section">
      <h2>Qualidade da Água <FlaskConical /></h2>

      <div className="dashboard-cards">

        <DashboardCard title="Turbidez">
          <h3>{data?.turbidez ?? "--"}</h3>
        </DashboardCard>

        <DashboardCard title="Odor">
          <h3>{data?.odor ?? "--"}</h3>
        </DashboardCard>

        <DashboardCard title="Dias desde última troca">
          <h3>
            {data?.diasDesdeTroca !== undefined
              ? `${data.diasDesdeTroca} dias`
              : "--"}
          </h3>
        </DashboardCard>

        <button
          className="dashboard-button"
          onClick={() => navigate("/tambor")}
        >
          Qualidade da Água <FlaskConical />
        </button>

      </div>
    </section>
  );
}

export default QualidadeAguaSection;