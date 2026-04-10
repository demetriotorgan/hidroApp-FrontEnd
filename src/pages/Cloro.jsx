import { ArrowBigLeft, Pencil, Save } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormCloro from '../components/FormCloro';
import useCloracao from '../hooks/useCloracao';
import CloracaoCard from '../components/CloracaoCard';
import FormPh from '../components/FormPh';
import usePh from '../hooks/usePh';
import CardPh from '../components/CardPh';

const Cloro = () => {
  const { registros, carregando, carregarRegistrosCloracao, handleDelete, deletando } = useCloracao();
  const { carregandopH, registroPh, deletandoPh, carregarRegistrospH, handleDeletePh } = usePh();
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
            deletandoCloro={deletando}
          />
        ))
      )}
      <button className="form-button" type="submit">
        <Pencil size={18} />
        Ver Registros
      </button>

      <FormPh carregarRegistroPh={carregarRegistrospH} />
      
      <h3>Útilma Correção de pH</h3>

      {carregandopH ? (
        <div className="empty-state">Carregando registros...</div>
      ) : registroPh.length === 0 ? (
        <div className="empty-state">Aguardando Registro</div>
      ) : (
        registroPh.map((item) => (
          <CardPh
            key={item._id}
            registro={item}            
            onDelete={handleDeletePh}
            deletando={deletandoPh}
          />
        ))
      )}
       <button className="form-button" type="submit">
        <Pencil size={18} />
        Ver Registros
      </button>
    </>
  );
}

export default Cloro