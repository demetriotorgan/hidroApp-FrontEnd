/**
 * 🏭 DASHBOARD = ALMOXARIFADO CENTRAL
 *
 * Responsável por:
 * - coletar dados globais da aplicação
 * - organizar lotes por domínio
 * - distribuir insumos para os painéis
 * - acionar automações da esteira (ex: fechamento de ciclo)
 *
 * NÃO é responsabilidade do Dashboard:
 * - interpretar regra de negócio
 * - preparar dados de UI
 * - montar gráficos
 * - processar análises
 */

import { ActivityIcon } from "lucide-react";
import './Dashboard.css'
import { useDashboardData } from "../hooks/useDashboardData";

import HidrometroSection from "../components/dashboard/sections/HidrometroSection";
import PluviometroSection from "../components/dashboard/sections/PluviometroSection";
import QualidadeAguaSection from "../components/dashboard/sections/QualidadeAguaSection";
import ModeloSection from "../components/dashboard/sections/ModeloSection";
import PrevisaoSection from "../components/dashboard/sections/PrevisaoSection";
import LavagemSection from "../components/dashboard/sections/LavagemSection";
import CloroSection from "../components/dashboard/sections/CloroSection";
import CicloMensalPanel from "./CicloMensalPanel";
import { useUltimaLeitura } from "../hooks/useUltimaLeitura";
import useCicloMensal from "../hooks/useCicloMensal";
import useFechamentoCiclo from "../hooks/useFechamentoCiclo";
import { useEffect } from "react";
import useEstimativasSalvas from "../hooks/useEstimativasSalvas";
import useAnalises from "../hooks/useAnalises";
import usePainelCiclo from "../hooks/usePainelCiclo";
import usePreparadorCicloPainel from "../hooks/usePreparadorCicloPainel";

function Dashboard() {

  

  //1.Organização - Insumos Operacionais - Estado operacional
  const { estimativas, buscar } = useEstimativasSalvas(); //Dataset1
  const { analises, carregarAnalises, loading: carregandoAnalises } = useAnalises(); //Dataset2

  const ultimaLeituraHook = useUltimaLeitura();
  const { cicloAtual } = useCicloMensal(ultimaLeituraHook.leituras);
  //Buscando Produto Final em Estoque no backend
  const {analiseFinal, loadingAnaliseFinal, errorAnaliseFinal} = usePreparadorCicloPainel();

  //2.Coleta - Abastecimento visual
  //Dados para sections
  const { loading, hidrometro, pluviometro, qualidadeAgua, modelo, ultimaLavagem, mediasProdutos, lavagemHook, eficienciaGlobal, ultimaCloracao, metricasCloracao } = useDashboardData();
  //Dados para vitrine do produto final e gráficos
  const { produto, graficos, loadingCiclo } = usePainelCiclo({analiseFinal, estimativas, analises });

  //3.Automação - Efeitos automáticos
  useFechamentoCiclo(cicloAtual, estimativas, analises, carregarAnalises, carregandoAnalises);


  //4.Debug temporário
  // console.log("📊 leituras:", ultimaLeituraHook.leituras);
  // console.log("🔄 cicloAtual:", cicloAtual);
    // useEffect(() => {
  //   console.log("📦 ESTIMATIVAS NO DASHBOARD:", estimativas.length);
  // }, [estimativas]);
    // useEffect(() => {
  //   console.log("📦 analises:", analises);
  // }, [analises]);
  //useEffect(() => {
  //   console.log("🧠 cicloAtual:", cicloAtual);
  // }, [cicloAtual]);
  // useEffect(() => {
  //   console.log("⚡ carregandoAnalises:", carregandoAnalises);
  // }, [carregandoAnalises]);

  // useEffect(() => {
  //   console.log("💰 estimativas:", estimativas);
  // }, [estimativas]);

  useEffect(() => {
    // console.log("🔥 Chamando buscar estimativas...");
    buscar();
  }, []);



   



  

  //5.Render - Distribuição - Entrega dos lotes para os painéis
  if (loading) {
    return <p>Carregando dashboard...</p>;
  }

  return (
    <div className="dashboard">
      <h1>Painel de Monitoramento <ActivityIcon /></h1>
      <HidrometroSection
        data={hidrometro}
        ultimasLeituraHook={ultimaLeituraHook}
      />
      <PluviometroSection data={pluviometro} />
      <QualidadeAguaSection data={qualidadeAgua} />
      <ModeloSection data={modelo} />
      <PrevisaoSection />
      <LavagemSection
        ultimaLavagem={ultimaLavagem}
        mediasProdutos={mediasProdutos}
        lavagemHook={lavagemHook}
        eficienciaGlobal={eficienciaGlobal}
      />
      <CloroSection
        dadosUltimaCloracao={ultimaCloracao}
        dadosCloracao={metricasCloracao}
      />
      <CicloMensalPanel
        produto={produto}
        graficos={graficos}
        loading={loadingCiclo}
      />
    </div>
  );
}

export default Dashboard;