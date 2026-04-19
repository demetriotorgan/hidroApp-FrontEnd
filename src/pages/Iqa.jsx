import React, { useEffect, useState } from 'react'
import FormIqa from '../components/FormIqa'
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import api from '../services/api';
import QualidadeAguaCard from '../components/QualidadeAguaCard';
import useRegistrosAgua from '../hooks/useRegistrosAgua';

const Iqa = () => {
  const {registrosDaAgua, carregando, carregarRegistros, deletarRegistro} = useRegistrosAgua();
  const navigate = useNavigate();  

  return (
    <>
      <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Registros de Qualidade</h1>
      <FormIqa onSuccess={carregarRegistros} />

       {/* LOADING */}
      {carregando && <p>Carregando registros...</p>}

      {/* LISTA */}
      {!carregando && registrosDaAgua.map((registro) => (
        <QualidadeAguaCard
          key={registro._id}
          registro={registro}
          onDelete={deletarRegistro}
        />
      ))}
    </>
  )
}

export default Iqa