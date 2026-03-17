import { ArrowBigLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from "react-router-dom";

const Pluviometro = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1><ArrowBigLeft
                onClick={() => navigate("/")}
            /> Registros do Hidrômetro</h1>
            Pluviometro
        </div>
    )
}

export default Pluviometro