import { ArrowBigLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormCloro from '../components/FormCloro';
import useCloracao from '../hooks/useCloracao';
import CloracaoCard from '../components/CloracaoCard';
import FormPh from '../components/FormPh';

const Cloro = () => {
  const { registros, carregando, carregarRegistrosCloracao, handleDelete,deletando } = useCloracao();
  const navigate = useNavigate();

  return (
    <>
      <h1>
        <ArrowBigLeft onClick={() => navigate("/")} />
        {' '}Cálculo de Cloração
      </h1>

      <FormCloro carregarRegistro={carregarRegistrosCloracao} />

      {carregando ? (
        <div className="empty-state">Carregando registros...</div>
      ) : registros.length === 0 ? (
        <div className="empty-state">Aguardando Registro</div>
      ) : (
        registros.map((item) => (
          <CloracaoCard
            key={item._id}
            registro={item}
            onDelete={handleDelete}
          />
        ))
      )}

      <FormPh />
    </>
  );
}

export default Cloro