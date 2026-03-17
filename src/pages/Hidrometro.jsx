import CardResumoHidrometro from "../components/CardResumoHidrometro";
import useHidrometros from "../hooks/useHidrometros";
import LoadingModal from "../components/LoadingModal";
import FormHidrometro from "../components/FormHidrometro";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TabelaHidrometro from "../components/TabelaHidrometro";
import { gerarDadosTabela } from "../services/hidrometroService";
import GraficoConsumo from "../components/GraficoConsumo";
import GraficoConsumoAcumulado from "../components/GraficoConsumoAcumulado";

function Hidrometro() {
  const { dados, loading, erro, deletarHidrometro, excluindo, carregarDados } = useHidrometros();
  const navigate = useNavigate();

  const dadosParaTabela = gerarDadosTabela(dados);


  if (loading) {
    return <p>Carregando registros...</p>
  }

  if (erro) {
    return <p>Erro ao carregar dados</p>
  }


  return (
    <div>
      <LoadingModal
        isOpen={excluindo}
        message="Excluindo registro..."
      />

      <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Registros do Hidrômetro</h1>

      <FormHidrometro atualizarLista={carregarDados} />

      <div>
        <h2>Tabela de Consumo</h2>
        <TabelaHidrometro dados={dadosParaTabela} />
      </div>
      <h3>Consumo</h3>
      <GraficoConsumo dados={dados}/>
      <h3>Consumo Acumulado</h3>
      <GraficoConsumoAcumulado dados={dados}/>

      {dados.length === 0 ? (
        <p>Sem registros de Hidrômetro</p>
      ) : (
        dados.map((item) => (
          <CardResumoHidrometro
            key={item._id}
            id={item._id}
            data={item.data}
            horario={item.horario}
            leitura={item.leitura}
            obs={item.obs}
            onDelete={deletarHidrometro}
          />
        ))
      )}
    </div>
  );
}

export default Hidrometro;
