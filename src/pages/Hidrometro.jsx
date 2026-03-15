import { useEffect, useState } from "react";
import api from "../services/api";
import CardResumoHidrometro from "../components/CardResumoHidrometro";
import useHidrometros from "../hooks/useHidrometros";
import LoadingModal from "../components/LoadingModal";
import FormHidrometro from "../components/FormHidrometro";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Hidrometro() {
  const { dados, loading, erro, deletarHidrometro,excluindo,carregarDados } = useHidrometros();
    const navigate = useNavigate();


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

      <FormHidrometro atualizarLista={carregarDados}/>

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
