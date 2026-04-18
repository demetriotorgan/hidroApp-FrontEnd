import { ArrowBigLeft, Pencil, Save } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormCloro from '../components/FormCloro';
import useCloracao from '../hooks/useCloracao';
import CloracaoCard from '../components/CloracaoCard';
import FormPh from '../components/FormPh';
import usePh from '../hooks/usePh';
import CardPh from '../components/CardPh';
import GraficoCloracao from '../components/GraficoCloracao'
import GraficoDosagem from '../components/GraficoDosagem';
import GraficoVolumeReservatorio from '../components/GraficoVolumeReservatorio';

const Cloro = () => {
  const { registros, carregando, carregarRegistrosCloracao, handleDelete, deletando } = useCloracao();
  const { carregandopH, registrosPh, deletandoPh, carregarRegistrospH, handleDeletePh } = usePh();
  const primeiroCloracao = registros[0];
  const primeiroPh = registrosPh[0];

  const navigate = useNavigate();

  return (
    <>
      <h1>
        <ArrowBigLeft onClick={() => navigate("/")} />
        {' '}Cálculo de Cloração
      </h1>

      <FormCloro carregarRegistro={carregarRegistrosCloracao} />

      <h3>Histórico de Cloração</h3>
      <GraficoCloracao dados={registros} />
      
      <h3>Última correção de Cloro</h3>
      {carregando ? (
        <div className="empty-state">Carregando registros...</div>
      ) : registros.length === 0 ? (
        <div className="empty-state">Aguardando Registro de Cloro</div>
      ) : (
        primeiroCloracao && (
          <CloracaoCard
            key={primeiroCloracao._id}
            registro={primeiroCloracao}
            onDelete={handleDelete}
            deletandoCloro={deletando}
          />
        )
      )}

      <h3>Dosagem (Volume x Cloro)</h3>
      <GraficoDosagem registros={registros} />

      <h3>Volume do Reservatório</h3>
      <GraficoVolumeReservatorio registros={registros} />


      <button className="form-button" type="submit">
        <Pencil size={18} />
        Ver Registros
      </button>

      <FormPh carregarRegistroPh={carregarRegistrospH} />

      <h3>Útilma Correção de pH</h3>

      {carregandopH ? (
        <div className="empty-state">Carregando registros...</div>
      ) : registrosPh.length === 0 ? (
        <div className="empty-state">Aguardando Registro de pH</div>
      ) : (
        primeiroPh && (
          <CardPh
            key={primeiroPh._id}
            registro={primeiroPh}
            onDelete={handleDeletePh}
            deletando={deletandoPh}
          />
        )
      )}
      <button className="form-button" type="submit">
        <Pencil size={18} />
        Ver Registros
      </button>
    </>
  );
}

export default Cloro