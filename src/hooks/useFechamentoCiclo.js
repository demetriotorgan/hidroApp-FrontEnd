//Gerente de Turno

import { useEffect, useRef } from "react";

import useEstimativasSalvas from "./useEstimativasSalvas";
import useAnalises from "./useAnalises";

//chamando o gerente no radio
import { executarCicloAnalise } from "../services/ml/executarCicloAnalise";

export default function useFechamentoCiclo(cicloAtual, estimativasExternas, analises, carregarAnalises, carregandoAnalises) {
  const { carregandoEstimativas } = useEstimativasSalvas();

  const estimativas = estimativasExternas;

  const processando = useRef(false);
  const jaExecutou = useRef(false);

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
          return;
        }

        // 🛑 2. já executando OU já executou
        if (processando.current || jaExecutou.current) {
          return;
        }

        // 🛑 3. carregando dados
        if (carregandoEstimativas || carregandoAnalises) {
          console.log("⏳ Aguardando carregamento dos dados...");
          return;
        }

        // 🛑 4. dados não chegaram
        if (!estimativas || !analises) {
          console.log("⏳ Dados ainda não inicializados");
          return;
        }

        // 🛑 5. arrays vazios → aguarda
        if (estimativas.length === 0) {
          console.log("⏳ Ainda não há estimativas suficientes para fechar o ciclo");
          return;
        }

        console.log("🚀 Iniciando fechamento do ciclo...");

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
          await carregarAnalises();
          alert("🔒 Turno concluído — próximo fechamento bloqueado para este ciclo");
          // ✅ final correto
          jaExecutou.current = true;
          processando.current = false;
        }

        if (resposta.status === "sem_dados") {
          console.warn("⚠️ Gerente abortou o turno por falta de dados");
          alert("🔁 Turno liberado para nova tentativa quando houver dados suficientes");
          processando.current = false;
        }

        if (resposta.status === "erro") {
          console.error("❌ Gerente retornou erro no fechamento");
          alert("🛠️ Turno liberado para reprocessamento após correção");
          processando.current = false;
        }



      } catch (error) {
        console.error("❌ Erro ao fechar ciclo:", error);
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
}