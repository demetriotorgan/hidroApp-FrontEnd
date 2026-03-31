import { ArrowBigLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormPrevisao from '../components/FormPrevisao';

const Previsao = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1><ArrowBigLeft
                onClick={() => navigate("/")}
            /> Previsão do Modelo</h1>
            <FormPrevisao />
        </>

    )
}

export default Previsao