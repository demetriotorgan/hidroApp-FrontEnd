import { ActivityIcon, Calculator, CloudRainWind, FlaskConical, Save } from "lucide-react";
import useHidrometros from "../hooks/useHidrometros";
import './Dashboard.css'
import { useNavigate } from "react-router-dom";
import { totalDeRegistros, dataUltimoRegistro, mediaConsumo, calcularConsumoUltimoRegistro, totalConsumoAcumulado, maiorConsumo } from "../services/hidrometroService";
import { calcularDiasSemChuva, mediaMmChuva, obterMmUltimaChuva, totalDeRegistrosDePluviometro } from "../services/pluviometroService";
import { usePluviometro } from "../hooks/usePluviometro ";
import { useEffect } from "react";

function Dashboard() {

  const { dados, loading } = useHidrometros();
  const {listarPluviometros, registros} = usePluviometro();

  useEffect(()=>{
    listarPluviometros();
  },[])

  const navigate = useNavigate();

  //Dados do Hidrometro
  const registrosCadastrados = totalDeRegistros(dados);
  const ultimaData = dataUltimoRegistro(dados);
  const mediaDeConsumo = mediaConsumo(dados);
  const consumoDiaAnterior = calcularConsumoUltimoRegistro(dados);
  const acumulado = totalConsumoAcumulado(dados);
  const diaMaiorConsumo = maiorConsumo(dados);

  //Dados do Pluviometro
  const diasSemChuva = calcularDiasSemChuva(registros);
  const mmUltimaChuva = obterMmUltimaChuva(registros);
  const totalDeRegistrosDeChuva = totalDeRegistrosDePluviometro(registros);
  const mmMedioDeChuva = mediaMmChuva(registros);
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
            <h3>{registrosCadastrados}</h3>
          </div>

          <div className="dashboard-card">
            <p>Última Leitura</p>
            <h3> {ultimaData || "Sem registros"}</h3>
          </div>

          <div className="dashboard-card">
            <p>Média de Consumo (L)</p>
            <h3>{mediaDeConsumo}</h3>
          </div>

          <div className="dashboard-card">
            <p>Consumo Dia Anterior(L)</p>
            <h3>{consumoDiaAnterior}</h3>
          </div>

          <div className="dashboard-card">
            <p>Total Acumulado</p>
            <h3>{acumulado}</h3>
          </div>

          <div className="dashboard-card">
            <p>Maior Gasto</p>
            <h3>{diaMaiorConsumo}</h3>
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
        <h2>Pluviometria  <CloudRainWind size={18} /></h2>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <p>Dias sem Chuva</p>
            <h3>{diasSemChuva} dias</h3>
          </div>

          <div className="dashboard-card">
            <p>Coletado</p>
            <h3>{mmUltimaChuva} mm</h3>
          </div>

          <div className="dashboard-card">
            <p>Registros</p>
            <h3>{totalDeRegistrosDeChuva}</h3>
          </div>
          <div className="dashboard-card">
            <p>Média de mm</p>
            <h3>{mmMedioDeChuva} mm</h3>
          </div>
          <button className="dashboard-button"
            type="button"
            onClick={() => navigate("/pluviometro")}
          >
            <CloudRainWind size={18} />
            Chuvas
          </button>

        </div>
      </section>

      {/* SEÇÃO QUALIDADE DA ÁGUA */}

      <section className="dashboard-section">
        <h2>Qualidade da Água <FlaskConical /></h2>

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

          <button className="dashboard-button"
            type="button"
            onClick={() => navigate("/tambor")}
          >Qualidade da Água <FlaskConical /></button>

        </div>
      </section>

    </div>
  );
}

export default Dashboard;