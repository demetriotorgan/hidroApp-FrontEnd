import React, { useEffect, useState } from 'react'
import './PainelAviso.css'
const PainelAviso = ({aviso}) => {
    const [sincronizando, setSincronizando] = useState(true);

      useEffect(() => {
    // só encerra a sincronização quando o primeiro boletim chegar
    if (aviso && sincronizando) {
      const timer = setTimeout(() => {
        setSincronizando(false);
      }, 700); // pequeno delay visual para o spinner "existir"

      return () => clearTimeout(timer);
    }
  }, [aviso, sincronizando]);

     if (sincronizando) {
    return (
      <div className="painel-aviso painel-sync">
        <div className="painel-aviso__spinner"></div>

        <div className="painel-aviso__conteudo">
          <h4 className="painel-aviso__titulo">Sincronizando painel operacional</h4>
          <p className="painel-aviso__detalhe">Aguardando boletim operacional</p>
        </div>
      </div>
    );
  }

  // fallback extra (segurança)
  if (!aviso) return null;


  return (
     <div className={`painel-aviso painel-${aviso.tipo}`}>
      <div className="painel-aviso__icone">●</div>

      <div className="painel-aviso__conteudo">
        <h4 className="painel-aviso__titulo">{aviso.titulo}</h4>
        <p className="painel-aviso__detalhe">{aviso.detalhe}</p>
      </div>
    </div>
  )
}

export default PainelAviso