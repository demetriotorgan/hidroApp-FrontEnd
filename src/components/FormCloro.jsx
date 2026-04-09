import { Save } from 'lucide-react'
import React, { useState } from 'react'
import useFormCloracao from '../hooks/useFormCloracao'


const FormCloro = () => {
    const { form,
        handleChange,
        handleSubmit,
        salvandoDadosCloro } = useFormCloracao();
    return (
        <>
            <h3>Cloro</h3>
            <form className='form-container' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Reservatório Atual (L)
                        <input
                            className='form-input'
                            type='number'
                            name='reservatorio'
                            value={form.reservatorio}
                            onChange={handleChange}
                        />
                    </label>
                    <label> Concetração Objetivo (mg/L)
                        <input
                            className='form-input'
                            type='number'
                            name='concentracao'
                            value={form.concentracao}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Quantidade de Produto (g)
                        <input
                            className='form-input'
                            type='number'
                            name='produto'
                            value={form.produto}
                            onChange={handleChange}
                            readOnly
                        />
                    </label>
                    <label>Solução Estoque (L)
                        <input
                            className='form-input'
                            type='number'
                            name='estoque'
                            value={form.estoque}
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

                    <label>Utilizado
                        <select
                            className='form-input'
                            name='utilizado'
                            value={form.utilizado}
                            onChange={handleChange}>
                            <option value='cloro'>Cloro</option>
                            <option value='estoque'>Estoque</option>
                        </select>
                    </label>
                </div>

                <button className="form-button" type="submit">
                    <Save size={18} />
                    Salvar Registro
                </button>
            </form>
        </>
    )
}

export default FormCloro