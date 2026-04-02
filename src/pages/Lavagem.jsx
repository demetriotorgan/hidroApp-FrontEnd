import { ArrowBigLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormLavagem from '../components/FormLavagem';
import { useLavagem } from '../hooks/useLavagem';
import api from '../services/api';
import CardLavagem from '../components/CardLavagem';

const Lavagem = () => {
  const navigate = useNavigate();
  const lavagemHook = useLavagem();

  return (
    <>
      <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Registro de Lavagem</h1>

      <FormLavagem {...lavagemHook} />

      <h2>Lavagens Realizadas</h2>
      {lavagemHook.lavagens.length === 0 ? (
        <p className="empty-message">Aguardando registros...</p>
      ) : (
        lavagemHook.lavagens.map((lavagem) => (
          <CardLavagem
            key={lavagem._id}
            lavagem={lavagem}
            onDelete={lavagemHook.deletarLavagem}
            excluindo={lavagemHook.excluindoLavagem}
          />
        ))
      )}
    </>
  )
}

export default Lavagem