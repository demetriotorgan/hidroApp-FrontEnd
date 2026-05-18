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

import { ActivityIcon, MessageCircleWarning } from "lucide-react";
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
import PainelAviso from "./PainelAviso";
import useGerenteLaboratorioErro from "../hooks/useLaboratorioDeErro/useGerenteLaboratorioErro";
import useCarregadorDeExibicaoErro from "../hooks/useLaboratorioDeErro/useCarregadorDeExibicaoErro";
import PainelExpedicaoErro from "./PainelExpedicaoErro";
import centroCoordenacaoTecnicos from "../hooks/useLaboratorioDeErro/cct/centroCoordenacaoTecnicos";
import useGerenteCinematico from "../hooks/useLaboratorioCinematico/gerencia/useGerenteCinematico";
import PainelCinematico from "./PainelCinematico";

function Dashboard() {

  //1.Organização - Insumos Operacionais - Estado operacional
  const { estimativas, buscar, carregandoEstimativas } = useEstimativasSalvas(); //Dataset1
  const { analises, carregarAnalises, loading: carregandoAnalises } = useAnalises(); //Dataset2

  const ultimaLeituraHook = useUltimaLeitura();
  const { cicloAtual } = useCicloMensal(ultimaLeituraHook.leituras);

  //Buscando Produto Final em Estoque no backend
  const { analiseFinal, loadingAnaliseFinal, errorAnaliseFinal } = usePreparadorCicloPainel();

  //Laboratórios de análise de erros
  const gerente = useGerenteLaboratorioErro({
    dataset1: estimativas,
    dataset2: analises,
    dataInicial: cicloAtual?.dataInicial,
    dataFinal: cicloAtual?.dataFinal
  });
  
  console.log("📦 GERENTE → CCT | pacote entregue:", gerente);
  const cct = centroCoordenacaoTecnicos(gerente.pacote);

  //Expedição das analises do laboratório de erros
  const expedicao = useCarregadorDeExibicaoErro(cct)
  // console.log('Expedição finalizada: ', expedicao);


  //2.Coleta - Abastecimento visual
  //Dados para sections
  const { loading, registrosHidrometro, hidrometro, pluviometro, qualidadeAgua, modelo, ultimaLavagem, mediasProdutos, lavagemHook, eficienciaGlobal, ultimaCloracao, metricasCloracao } = useDashboardData();
  //Dados para vitrine do produto final e gráficos
  // console.log("📦 ANALISES ENTREGUES AO PAINEL:", analises);
  const { produto, graficos, loadingCiclo } = usePainelCiclo({ analiseFinal, estimativas, analises });
  const {resultadoDeCinematica} = useGerenteCinematico({registrosHidrometro,loading});
  //Dados de Cinemática
  // console.log('Dados de Cinemática: ', resultadoDeCinematica);

  //3.Automação - Efeitos automáticos  
  const { avisoOperacional } = useFechamentoCiclo(cicloAtual, estimativas, analises, carregarAnalises, carregandoAnalises, carregandoEstimativas);

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
    <>
      <h3>Painel de Avisos <MessageCircleWarning /></h3>
      <PainelAviso
        aviso={avisoOperacional}
      />
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

        <PainelCinematico
          cinematica={resultadoDeCinematica}
         />

        <CicloMensalPanel
          produto={produto}
          graficos={graficos}
          loading={loadingCiclo}
        />       

        <PainelExpedicaoErro
          expedicao={expedicao}
        />
      </div>
    </>
  );
}

export default Dashboard;

