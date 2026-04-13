import React from 'react';
import './CardEficienciaLavagem.css';

const normalizar = (texto) =>
    texto?.toLowerCase()?.normalize("NFD")?.replace(/[̀-ͯ]/g, "") || "";

// 🔥 NOVO: função de diagnóstico
const gerarDiagnostico = (item) => {

    const lav = item.indicadorLavagem;
    const enx = item.indicadorEnxague;
    const total = item.indicadorTotal;

    // 🚿 Problema no enxágue
    if (enx === 'RUIM') {
        return {
            tipo: 'alerta',
            mensagem: 'Excesso de água no enxágue',
            dica: 'Reduza o volume de enxágue para melhorar a eficiência'
        };
    }

    // ⚖️ Total médio mas lavagem boa
    if (
        total === 'MÉDIA' &&
        (lav === 'BOA' || lav === 'EXCELENTE')
    ) {
        return {
            tipo: 'atencao',
            mensagem: 'Eficiência limitada pelo enxágue',
            dica: 'A lavagem está boa, mas o enxágue pode ser otimizado'
        };
    }

    // 🔴 Tudo ruim
    if (total === 'RUIM') {
        return {
            tipo: 'critico',
            mensagem: 'Alto consumo de água',
            dica: 'Revise o volume de lavagem e enxágue'
        };
    }

    // 🟢 Ideal
    return {
        tipo: 'ok',
        mensagem: 'Lavagem eficiente',
        dica: 'Consumo de água dentro do ideal'
    };
};

const CardEficienciaLavagem = ({ item }) => {

    const diagnostico = gerarDiagnostico(item);

    return (
        <div className="card-eficiencia">

            {/* HEADER */}
            <div className="card-header">
                <h3>{item.data}</h3>
                <span className={`badge ${normalizar(item.indicadorTotal)}`}>
                    {item.indicadorTotal}
                </span>
            </div>

            <div className="card-grid">

                {/* 🧼 LAVAGEM */}
                <div className="bloco">
                    <h4>Lavagem</h4>
                    <p><strong>Real:</strong> {item.totalLavagem} L</p>
                    <p><strong>Ideal:</strong> {item.litrosIdeaisLavagem} L</p>
                    <p><strong>Eficiência:</strong> {item.eficienciaRelativaLavagem}x</p>

                    <span className={`badge ${normalizar(item.indicadorLavagem)}`}>
                        {item.indicadorLavagem}
                    </span>
                </div>

                {/* 🚿 ENXÁGUE */}
                <div className="bloco">
                    <h4>Enxágue</h4>
                    <p><strong>Real:</strong> {item.totalEnxague} L</p>
                    <p><strong>Ideal:</strong> {item.litrosIdeaisEnxague} L</p>
                    <p>
                        <strong>Eficiência:</strong>{' '}
                        {item.totalEnxague > 0
                            ? `${item.eficienciaRelativaEnxague}x`
                            : '—'}
                    </p>

                    <span className={`badge ${normalizar(item.indicadorEnxague)}`}>
                        {item.totalEnxague > 0
                            ? item.indicadorEnxague
                            : 'SEM ENXÁGUE'}
                    </span>
                </div>

                {/* 📊 TOTAL */}
                <div className="bloco destaque">
                    <h4>Total</h4>
                    <p><strong>Água:</strong> {item.totalAgua} L</p>
                    <p><strong>Ideal:</strong> {item.totalIdeal} L</p>
                    <p><strong>Eficiência:</strong> {item.eficienciaRelativaTotal}x</p>

                    <span className={`badge ${normalizar(item.indicadorTotal)}`}>
                        {item.indicadorTotal}
                    </span>
                </div>

                {/* ⚖️ CARGA */}
                <div className="bloco">
                    <h4>Carga</h4>
                    <p><strong>Peso:</strong> {item.pesoTotal} kg</p>
                    <p><strong>L/kg:</strong> {item.eficienciaTotal}</p>
                </div>

            </div>

            {/* 🔥 NOVO BLOCO DE DIAGNÓSTICO */}
            <div className={`diagnostico ${diagnostico.tipo}`}>
                <p><strong>{diagnostico.mensagem}</strong></p>
                <p>{diagnostico.dica}</p>
            </div>

        </div>
    );
};

export default CardEficienciaLavagem;