import { ActivityIcon, Calculator, Save } from "lucide-react";
import useHidrometros from "../hooks/useHidrometros";
import './Dashboard.css'
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const { dados, loading } = useHidrometros();
  const navigate = useNavigate();

  if (loading) {
    return <p>Carregando dashboard...</p>;
  }

  return (
    <div className="dashboard">

      <h1>Painel de Monitoramento <ActivityIcon /></h1>

      {/* SEÇÃO HIDROMETRO */}

      <section className="dashboard-section">
        <h2>Hidrômetro <Calculator /></h2>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <p>Total de Registros</p>
            <h3>--</h3>
          </div>

          <div className="dashboard-card">
            <p>Última Leitura</p>
            <h3>--</h3>
          </div>

          <div className="dashboard-card">
            <p>Média de Consumo</p>
            <h3>--</h3>
          </div>

          <div className="dashboard-card">
            <p>Consumo mensal</p>
            <h3>--</h3>
          </div>
          <button className="dashboard-button" 
          type="button"
           onClick={() => navigate("/hidrometro")}
          >
            <Save size={18} />
            Registros
          </button>
        </div>
      </section>

      {/* SEÇÃO PLUVIOMETRO */}

      <section className="dashboard-section">
        <h2>Pluviometria</h2>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <p>Chuva hoje</p>
            <h3>-- mm</h3>
          </div>

          <div className="dashboard-card">
            <p>Chuva semanal</p>
            <h3>-- mm</h3>
          </div>

          <div className="dashboard-card">
            <p>Chuva mensal</p>
            <h3>-- mm</h3>
          </div>

        </div>
      </section>

      {/* SEÇÃO QUALIDADE DA ÁGUA */}

      <section className="dashboard-section">
        <h2>Qualidade da Água (Reservatório)</h2>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <p>Turbidez</p>
            <h3>--</h3>
          </div>

          <div className="dashboard-card">
            <p>Odor</p>
            <h3>--</h3>
          </div>

          <div className="dashboard-card">
            <p>Dias desde última troca</p>
            <h3>--</h3>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Dashboard;