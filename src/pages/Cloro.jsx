import { ArrowBigLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cloro = () => {
    const navigate = useNavigate();
  return (
    <>
    <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Cálculo de Cloração</h1>

    </>
  )
}

export default Cloro