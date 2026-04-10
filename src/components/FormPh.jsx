import { FlaskConical, Save } from 'lucide-react'
import React, { useState } from 'react'
import { getDataAtual } from '../services/dataUtils'
import { calcularAcido } from '../services/acidoService'
import useFormPh from '../hooks/useFormPh'
import api from '../services/api'
import CardPh from './CardPh'

const FormPh = () => {

    const { form, handleChange, handleSubmit, salvandopH, registroPh, carregandopH } = useFormPh();


    return (
        <>
            <h3><FlaskConical /> Correção de pH</h3>
            <form className='form-container' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Reservatório Atual (L)
                        <input
                            className='form-input'
                            type='number'
                            name='reservatorio'
                            value={form.reservatorio}
                            onChange={handleChange}
                        />
                    </label>
                    <label>pH Atual
                        <input
                            className='form-input'
                            type='number'
                            name='phAtual'
                            value={form.phAtual}
                            onChange={handleChange}
                        />
                    </label>
                    <label>pH Objetivo
                        <input
                            className='form-input'
                            type='number'
                            name='phObjetivo'
                            value={form.phObjetivo}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Quantidade de Ácido (g)
                        <input
                            className='form-input'
                            type='number'
                            name='acido'
                            value={form.acido === '' ? '' : Number(form.acido).toFixed(2)}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label>Data
                        <input
                            className='form-input'
                            type='date'
                            name='data'
                            value={form.data}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button className="form-button" type="submit">
                    <Save size={18} />
                    Salvar Registro
                </button>
            </form>

            {carregandopH ? (
                <div className="empty-state">Carregando registros...</div>
            ) : registroPh.length === 0 ? (
                <div className="empty-state">Aguardando Registro</div>
            ) : (
                registroPh.map((item) => (
                    <CardPh
                        key={item._id}
                        registro={item}                        
                    />
                ))
            )}
        </>
    )
}

export default FormPh
