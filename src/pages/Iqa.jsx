import React, { useEffect, useState } from 'react'
import FormIqa from '../components/FormIqa'
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import api from '../services/api';
import useRegistrosAgua from '../hooks/useRegistrosAgua';
import CardQualidadeIQA from '../components/CardQualidadeIQA ';

const Iqa = () => {
  const { registrosDaAgua, carregando, carregarRegistros, deletarRegistro, deletando } = useRegistrosAgua();
  const [registroEmEdicao, setRegistroEmEdicao] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!registroEmEdicao) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, [registroEmEdicao]);

  return (
    <>
      <h1><ArrowBigLeft
        onClick={() => navigate("/")}
      /> Registros de Qualidade</h1>
      <FormIqa
        onSuccess={() => {
          carregarRegistros();
          setRegistroEmEdicao(null); // limpa edição após salvar
        }}
        registroEmEdicao={registroEmEdicao}
        onCancelEdit={() => setRegistroEmEdicao(null)}
      />

      {/* LOADING */}
      {carregando && <p>Carregando registros...</p>}

      {/* LISTA VAZIA */}
      {!carregando && registrosDaAgua.length === 0 && (
        <div className="empty-state">
          <p>📭 Aguardando registros de qualidade da água...</p>
        </div>
      )}

      {/* LISTA */}
      {!carregando && registrosDaAgua.map((registro) => (
        <CardQualidadeIQA
          key={registro._id}
          registro={registro}
          onDelete={deletarRegistro}
          onEdit={setRegistroEmEdicao}
          deletando={deletando}
        />
      ))}
    </>
  )
}

export default Iqa