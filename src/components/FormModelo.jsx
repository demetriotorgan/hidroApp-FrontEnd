import { Save, Sigma } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import useHidrometros from '../hooks/useHidrometros';
import './ModeloCard.css'
import useEstimativa from '../hooks/useEstimativa';
import useEstimativasSalvas from '../hooks/useEstimativasSalvas';
import EstimativaCard from './EstimativaCard';

const FormModelo = () => {
    const { dados } = useHidrometros();
    const { form, resultado, salvando, handleChange, calcular, salvar } = useEstimativa(dados);
    const { estimativas, buscar, carregandoEstimativas,deletarEstimativa } = useEstimativasSalvas();

    useEffect(() => {
        buscar();
    }, []);

    return (
        <>
            <form className='form-container'>
                <div className='form-group'>
                    <label>Estimar dias de consumo:</label>
                    <input
                        className='form-input'
                        placeholder='Dias de consumo'
                        type='number'
                        name='dias'
                        value={form.dias || ""}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className='form-button'
                    type='button'
                    onClick={calcular}
                >
                    <Sigma size={18} />
                    Calcular
                </button>
            </form>

            {/* 📊 Resultado */}
            {resultado && !resultado.erro && (
                <div className="modelo-card">

                    <div className="modelo-header">
                        <h3>Previsão de Consumo</h3>
                        <span className="modelo-badge">{resultado.dias} dias</span>
                    </div>

                    <div className="modelo-main">
                        <span className="modelo-label">Consumo estimado</span>
                        <h1 className="modelo-valor">
                            {resultado.consumo.toFixed(2)}
                            <span> L</span>
                        </h1>
                    </div>

                    <div className="modelo-formula">
                        <span>Modelo: </span>
                        <code>
                            V(d) = {resultado.coeficiente.toFixed(4)} × {resultado.dias}
                        </code>
                    </div>

                    <div className="modelo-footer">
                        <div className="modelo-info">
                            <span>Coeficiente (a)</span>
                            <strong>{resultado.coeficiente.toFixed(4)}</strong>
                        </div>

                        <div className="modelo-info">
                            <span>Confiabilidade</span>
                            <strong style={{ color: resultado.cor }}>
                                {resultado.confiabilidade}
                            </strong>
                        </div>
                    </div>
                </div>
            )}

            {resultado?.custo && (
                <div className="modelo-card custo-card">

                    <div className="modelo-header">
                        <h3>Custo Estimado</h3>
                        <span className="modelo-badge">
                            {resultado.custo.consumoM3} m³
                        </span>
                    </div>

                    <div className="modelo-main">
                        <span className="modelo-label">Valor total da fatura</span>
                        <h1 className="modelo-valor">
                            R$ {resultado.custo.total}
                        </h1>
                    </div>

                    <div className="modelo-footer">
                        <div className="modelo-info">
                            <span>Água</span>
                            <strong>R$ {resultado.custo.agua}</strong>
                        </div>

                        <div className="modelo-info">
                            <span>Esgoto</span>
                            <strong>R$ {resultado.custo.esgoto}</strong>
                        </div>
                    </div>

                    {/* 🔍 Detalhamento por faixa */}
                    <div className="custo-detalhamento">
                        {resultado.custo.detalhamento.map((item, index) => (
                            <div key={index} className="custo-faixa">
                                <span>{item.faixa}</span>
                                <small>
                                    {Number(item.volume || 0).toFixed(2)} m³
                                </small>
                                <strong>
                                    R$ {(item.agua + item.esgoto).toFixed(2)}
                                </strong>
                            </div>
                        ))}
                    </div>
                    <button
                        className='form-button'
                        type='button'
                        onClick={async () => {
                            await salvar();
                            buscar();
                        }}
                    >
                        <Save size={18} />
                        {salvando ? "Salvando..." : "Salvar Estimativa"}
                    </button>
                </div>
            )}
            <div>
                {estimativas.map((item) => (
                    <EstimativaCard
                        key={item._id} 
                        estimativa={item} 
                        onDelete={deletarEstimativa}
                        />
                ))}
            </div>
        </>
    )
}

export default FormModelo