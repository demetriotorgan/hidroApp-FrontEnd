import { ArrowBigLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormCloro from '../components/FormCloro';
import useCloracao from '../hooks/useCloracao';
import CloracaoCard from '../components/CloracaoCard';

const Cloro = () => {
  const { registros, carregando, carregarRegistrosCloracao } = useCloracao();
  const navigate = useNavigate();
  return (
    <>
      <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Cálculo de Cloração</h1>
      <FormCloro />

      {registros.map((item) => (
        <CloracaoCard key={item._id} registro={item} />
      ))}


    </>
  )
}

export default Cloro