import React from 'react'
import FormTambor from '../components/FormTambor'
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';

const Tambor = () => {
const navigate = useNavigate();
  return (
    <>
    <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Registros de Qualidade</h1>
    <FormTambor />
    </>
  )
}

export default Tambor