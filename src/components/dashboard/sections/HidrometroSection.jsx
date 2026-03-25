import { Calculator, Save, TrendingUp, TrendingDown, Minus, ActivityIcon, CloudRainWind } from "lucide-react";
import DashboardCard from "../DashboardCard";
import CardRegua from "../CardRegua";
import { mapaCoresConsumo } from "../../../services/dashboardConfig";
import { getCVConfig, getTendenciaConfig } from "../../../services/dashboardFormatters";
import { useNavigate } from "react-router-dom";

function HidrometroSection({ data }) {
  const navigate = useNavigate();

  const tipoAtual = data.percentualAtualMaiorConsumo.tipo;
  const config = mapaCoresConsumo[tipoAtual] || mapaCoresConsumo.sem_dados;

  const tendencia = getTendenciaConfig(data.resultado);
  const cvConfig = getCVConfig(data.cvConsumo);

  const iconMap = {
    up: <TrendingUp size={18} />,
    down: <TrendingDown size={18} />,
    neutral: <Minus size={18} />,
    activity: <ActivityIcon size={18} />,
    rain: <CloudRainWind size={18} />
  };

  return (
    <section className="dashboard-section">
      <h2>Hidrômetro <Calculator /></h2>

      <div className="dashboard-cards">

        <DashboardCard title="Total de Registros">
          <h3>{data.total}</h3>
        </DashboardCard>

        <DashboardCard title="Última Leitura">
          <h3>{data.ultimaData || "Sem registros"}</h3>
        </DashboardCard>

        <DashboardCard title="Média de Consumo (L)">
          <h3>{data.media}</h3>
        </DashboardCard>

        <DashboardCard title="Consumo Atual(L)">
          <h3>{data.consumoDiaAnterior}</h3>
        </DashboardCard>

        <DashboardCard title="Total Acumulado">
          <h3>{data.acumulado}</h3>
        </DashboardCard>

        <DashboardCard title="Maior Consumo">
          <h3>{data.diaMaiorConsumo}</h3>
        </DashboardCard>

        <DashboardCard title="Tendência">
          <h3 style={{ color: tendencia.color }}>
            {iconMap[tendencia.icon]}
            {tendencia.texto}
          </h3>
        </DashboardCard>

        <DashboardCard title="Consistência (CV)">
          <h3 style={{ color: cvConfig.color }}>
            {iconMap[cvConfig.icon]}
            {cvConfig.texto}
          </h3>
        </DashboardCard>

        <DashboardCard
          title="Comparação com maior consumo"
          style={{ borderLeft: `5px solid ${config.cor}` }}
        >
          <h3 style={{ color: config.cor }}>
            {data.percentualAtualMaiorConsumo.percentual}%
          </h3>
          <small>{config.label}</small>
        </DashboardCard>

        <DashboardCard title="Estabilidade (~r)">
          <h3>{data.estabilidadeDoConsumo.coeficiente}</h3>
          <small>{data.estabilidadeDoConsumo.nivel}</small>
        </DashboardCard>

        <CardRegua regua={data.regua} />

        <button
          className="dashboard-button"
          onClick={() => navigate("/hidrometro")}
        >
          <Save size={18} />
          Registros
        </button>

      </div>
    </section>
  );
}

export default HidrometroSection;