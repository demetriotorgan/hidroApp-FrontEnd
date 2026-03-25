import DashboardCard from "./DashboardCard";
import { formatarStatusTexto } from "../../services/dashboardFormatters";

export default function CardRegua({ regua }) {
  const { posicao, diferencaPercentual, status } = regua;

  return (
    <DashboardCard title="Comparação de Consumo" className="regua-card">

      <div className="regua">
        {/* Label da média */}
        <span className="label media" style={{ left: "50%" }}>
          Média
        </span>

        {/* Label do consumo */}
        <span
          className="label atual"
          style={{ left: `${posicao * 100}%` }}
        >
          C.A
        </span>

        {/* Pontos */}
        <div className="ponto media" style={{ left: "50%" }} />

        <div
          className={`ponto atual ${status}`}
          style={{ left: `${posicao * 100}%` }}
        />
      </div>

      <div className="resultado-regua">
        <span className="valor">
          {diferencaPercentual > 0 && "+"}
          {diferencaPercentual.toFixed(1)}%
        </span>

        <span className={`status ${status}`}>
          {formatarStatusTexto(status)}
        </span>
      </div>

    </DashboardCard>
  );
}