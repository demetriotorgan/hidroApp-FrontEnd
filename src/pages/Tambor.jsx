import React, { useEffect, useState } from 'react'
import FormTambor from '../components/FormTambor'
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import api from '../services/api';
import QualidadeAguaCard from '../components/QualidadeAguaCard';
import useRegistrosAgua from '../hooks/useRegistrosAgua';

const Tambor = () => {
  const {registrosDaAgua, carregando, carregarRegistros, deletarRegistro} = useRegistrosAgua();
  const navigate = useNavigate();  

  return (
    <>
      <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Registros de Qualidade</h1>
      <FormTambor onSuccess={carregarRegistros} />

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

export default Tambor