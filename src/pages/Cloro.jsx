import { ArrowBigLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormCloro from '../components/FormCloro';

const Cloro = () => {
    const navigate = useNavigate();
  return (
    <>
    <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Cálculo de Cloração</h1>
      <FormCloro />

    </>
  )
}

export default Cloro