import { ArrowBigLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormLavagem from '../components/FormLavagem';
import { useLavagem } from '../hooks/useLavagem';
import api from '../services/api';
import CardLavagem from '../components/CardLavagem';
import GraficoAguaDeLavagem from '../components/GraficoAguaDeLavagem';
import GraficoEficienciaDeLavagem from '../components/GraficoEficienciaDeLavagem';
import TabelaDeEficiencia from '../components/TabelaDeEficiencia';
import RegraDeEficiencia from '../components/RegraDeEficiencia';
import FormEficiencia from '../components/FormEficiencia';
import GraficoEficienciaRelativa from '../components/GraficoEficienciaRelativa';


const Lavagem = () => {
  const navigate = useNavigate();
  const lavagemHook = useLavagem();

  return (
    <>
      <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Registro de Lavagem</h1>

      <h3>Calculador de Eficiência</h3>
      <FormEficiencia />

      <h3>Cadastrar Nova Lavagem</h3>
      <FormLavagem {...lavagemHook} />

      <h3>Histórico de Consumo de Água</h3>
      <GraficoAguaDeLavagem registros={lavagemHook.lavagens} />

      <h3>Eficiência das Lavagens</h3>
      <GraficoEficienciaDeLavagem registros={lavagemHook.lavagens} />

      <h3>Escala de Eficiência</h3>
      <GraficoEficienciaRelativa registros={lavagemHook.lavagens} />

      <h3>Eficiência nas Lavagens</h3>
      <TabelaDeEficiencia registros={lavagemHook.lavagens} />

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

      {lavagemHook.lavagens.length > 3 && (
        <button className="btn-ver-mais">
          Ver mais lavagens
        </button>
      )}

      <h3>Faixas de Eficiência</h3>
      <RegraDeEficiencia />

    </>
  )
}

export default Lavagem