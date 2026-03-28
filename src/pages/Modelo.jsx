import { ArrowBigLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormModelo from '../components/FormModelo';

const Modelo = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1><ArrowBigLeft
                onClick={() => navigate("/")}
            /> Estimativas do Modelo</h1>

            <FormModelo />
        </>
    )
}

export default Modelo