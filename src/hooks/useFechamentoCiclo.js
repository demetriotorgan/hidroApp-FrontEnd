//Gerente de Turno

import { useEffect, useRef, useState } from "react";

// import useEstimativasSalvas from "./useEstimativasSalvas";
import useAnalises from "./useAnalises";

//chamando o gerente no radio
import { executarCicloAnalise } from "../services/ml/executarCicloAnalise";

export default function useFechamentoCiclo(cicloAtual, estimativasExternas, analises, carregarAnalises, carregandoAnalises,carregandoEstimativas) {

  // const { carregandoEstimativas } = useEstimativasSalvas();
  const estimativas = estimativasExternas;

  const processando = useRef(false);
  const jaExecutou = useRef(false);

  // boletim oficial do gerente
  const [avisoOperacional, setAvisoOperacional] = useState(null);

  useEffect(() => {
    async function fecharCiclo() {
      console.log("🚦 FECHAMENTO CHECK:", {
        cicloAtual,
        estimativasLength: estimativas?.length,
        analisesLength: analises?.length,
        carregandoAnalises
      });

      try {
        // 🛑 1. ciclo ainda não existe
        if (!cicloAtual) {
          console.log("⏳ cicloAtual ainda não disponível");

          //Avisando inatividade ao painel
          setAvisoOperacional({
            tipo: "inativo",
            titulo: "Sistema aguardando abertura do ciclo",
            detalhe: "cicloAtual ainda não disponível"
          });
          return;
        }

        // 🛑 2. já executando OU já executou
        if (processando.current || jaExecutou.current) {
          return;
        }

        // 🛑 3. carregando dados
        if (carregandoEstimativas || carregandoAnalises) {
          console.log("⏳ Aguardando carregamento dos dados...");

          //avisando carregamento ao painel
          setAvisoOperacional({
            tipo: "aguardando",
            titulo: "Carregando dados operacionais",
            detalhe: "Aguardando carregamento dos dados"
          });

          return;
        }

        // 🛑 4. dados não chegaram
        if (!estimativas || !analises) {
          console.log("⏳ Dados ainda não inicializados");

          //avisando inatividade ao painel
          setAvisoOperacional({
            tipo: "inativo",
            titulo: "Sistema ainda não inicializado",
            detalhe: "Dados ainda não inicializados"
          });
          return;
        }

        // 🛑 5. arrays vazios → aguarda
        if (estimativas.length === 0) {
          console.log("⏳ Ainda não há estimativas suficientes para fechar o ciclo");

          //avisando carregando me estimativas
          setAvisoOperacional({
            tipo: "aguardando",
            titulo: "Aguardando estimativas do ciclo",
            detalhe: "Ainda não há estimativas suficientes para fechar o ciclo"
          });
          return;
        }

        console.log("🚀 Iniciando fechamento do ciclo...");

        //avisando o processando do ciclo
        setAvisoOperacional({
          tipo: "processando",
          titulo: "Fechamento em execução",
          detalhe: "Iniciando fechamento do ciclo"
        });

        // 🔒 trava aqui (correto)
        processando.current = true;        

        const resposta = await executarCicloAnalise({
          dataset1: estimativas,
          dataset2: analises,
          ciclo: cicloAtual,
          opcoes: { salvar: true }
        });

        //Ouvir a resposta do gerente
        if (resposta.status === "ok") {
          console.log("✅ Ciclo fechado com sucesso");

          //gerente publica boletim oficial
          setAvisoOperacional({
            tipo: "sucesso",
            titulo: "Turno concluído com sucesso",
            detalhe: "Ciclo fechado com sucesso"
          });

          await carregarAnalises();
          // ✅ final correto
          jaExecutou.current = true;
          processando.current = false;
        }

        if (resposta.status === "sem_dados") {
          console.warn("⚠️ Gerente abortou o turno por falta de dados");
          // alert("🔁 Turno liberado para nova tentativa quando houver dados suficientes");

          //avisando o painel que a esteira esta sem dados
          setAvisoOperacional({
            tipo: "erro",
            titulo: "Fechamento abortado",
            detalhe: "Gerente abortou o turno por falta de dados"
          });
          processando.current = false;
        }

        if (resposta.status === "erro") {
          console.error("❌ Gerente retornou erro no fechamento");
          // alert("🛠️ Turno liberado para reprocessamento após correção");

          //avisando painel que houve um erro na esteira
          setAvisoOperacional({
            tipo: "erro",
            titulo: "Falha no fechamento",
            detalhe: "Gerente retornou erro no fechamento"
          });
          processando.current = false;
        }



      } catch (error) {
        console.error("❌ Erro ao fechar ciclo:", error);

        //avisando um erro inesperado ao painel
        setAvisoOperacional({
          tipo: "erro",
          titulo: "Erro crítico no fechamento",
          detalhe: "Erro ao fechar ciclo"
        });
        processando.current = false;
      }
    }

    fecharCiclo();

  }, [
    cicloAtual,
    estimativas,
    analises,
    carregandoEstimativas,
    carregandoAnalises
  ]);

  // gerente entrega boletim ao dashboard
  return {
    avisoOperacional
  };
}