import React, { useState } from 'react'
import { calcularEficiencia } from '../services/lavagemService';
import './FormEficiencia.css';

const FormEficiencia = () => {
    const initialState = {
        carga: '',
        litros: '',
        enxague: '',
        eficiencia: ''
    };

    const [form, setForm] = useState(initialState);
    const [insights, setInsights] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;

        const novoForm = {
            ...form,
            [name]: value
        };

        // Só calcula se for carga
        if (name === 'carga') {
            const resultado = calcularEficiencia(value);

            if (!resultado.erro) {
                novoForm.litros = resultado.litrosRecomendados;
                novoForm.enxague = resultado.litrosRecomendadosEnxague; // 👈 NOVO
                novoForm.eficiencia = resultado.eficiencia;

                setInsights(resultado);
            } else {
                setInsights(null);
            }
        }
        setForm(novoForm);
    };


    return (
        <>
            <form className='form-container'>
                <div className='form-group'>
                    <label>Carga de Roupa
                        <input
                            className='form-input'
                            type='number'
                            name='carga'
                            value={form.carga}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Quantidade Ideal de Água para Lavagem
                        <input
                            className='form-input'
                            type='number'
                            name='litros'
                            value={form.litros}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label>Quantidade Ideal de Água para Enxágue
                        <input
                            className='form-input'
                            type='number'
                            name='enxague'
                            value={form.enxague}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label>Eficiência (L/kg)
                        <input
                            className='form-input'
                            type='number'
                            name='eficiencia'
                            value={form.eficiencia}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                </div>
                <div className='insights-container'>
                    <h4>Insights</h4>

                    {insights && (
                        <div className='card-insights'>
                            <p><strong>Carga:</strong> {insights.carga} kg</p>
                            <hr />

                            <p><strong>Lavagem:</strong> {insights.litrosRecomendados} L</p>
                            <p><strong>Enxágue:</strong> {insights.litrosRecomendadosEnxague} L</p>
                            <p><strong>Total:</strong> {insights.totalAgua} L</p>

                            <hr />
                            <p><strong>Eficiência:</strong> {insights.eficiencia} L/kg</p>
                            <p><strong>Nível da Máquina:</strong> {insights.nivel}</p>

                            <p>
                                <strong>Status:</strong>{' '}
                                <span className={`status ${insights.status.replace(' ', '-')}`}>
                                    {insights.status}
                                </span>
                            </p>

                            <div className='dica'>
                                💡 {insights.status === 'baixa eficiência'
                                    ? 'Considere aumentar a carga ou reduzir o nível de água.'
                                    : 'Configuração adequada para a carga informada.'}
                            </div>

                        </div>
                    )}
                </div>
            </form>

        </>
    )
}

export default FormEficiencia