import { Save } from 'lucide-react'
import React, { useState } from 'react'
import LoadingModal from './LoadingModal';


const FormLavagem = ({ form, salvando, handleChange, handleSubmit }) => {
    return (
        <>
            <LoadingModal
                isOpen={salvando}
                message="Salvando Registro..."
            />
            <form className='form-container' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Data
                        <input
                            className='form-input'
                            type='date'
                            name='data'
                            value={form.data || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Obs
                        <input
                            className='form-input'
                            type='text'
                            name='obs'
                            placeholder='Descrição da lavagem'
                            value={form.obs || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Carga(kg)
                        <input
                            className='form-input'
                            type='number'
                            name='pesoRoupas'
                            placeholder='Peso da roupa'
                            value={form.pesoRoupas}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Tipo de Lavagem
                        <select
                            className='form-input'
                            name='tipoLavagem'
                            value={form.tipoLavagem}
                            onChange={handleChange}
                        >
                            <option value="leve">Leve</option>
                            <option value="moderada">Moderada</option>
                            <option value="pesada">Pesada</option>
                        </select>
                    </label>
                    <label>Nível da Máquina
                        <select
                            className='form-input'
                            name='nivelMaquina'
                            value={form.nivelMaquina}
                            onChange={handleChange}
                        >
                            <option value="extra-baixo">Extra-Baixo</option>
                            <option value="baixo">Baixo</option>
                            <option value="medio">Médio</option>
                            <option value="alto">Alto</option>
                        </select>
                    </label>
                    <label>Litros(L)
                        <input
                            className='form-input'
                            type='number'
                            name='litros'
                            value={form.litros}
                            placeholder='Água usada na lavagem'
                            onChange={handleChange} />
                    </label>
                    <label>Sabão(g)
                        <input
                            className='form-input'
                            type='number'
                            name='sabao'
                            placeholder='Quantidade em gramas'
                            value={form.sabao}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Amaciante(g)
                        <input
                            className='form-input'
                            type='number'
                            name='amaciante'
                            placeholder='Quantidade em gramas'
                            value={form.amaciante}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Modo de Lavagem
                        <select
                            className='form-input'
                            name='modoLavagem'
                            value={form.modoLavagem}
                            onChange={handleChange}
                        >
                            <option value="longo">Longo</option>
                            <option value="normal">Normal</option>
                            <option value="curto">Curto</option>
                        </select>
                    </label>
                    <label>Enchague(L)
                        <input
                            className='form-input'
                            type='number'
                            name='enchague'
                            value={form.enchague}
                            placeholder='Água usada no enchague'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button className="form-button" type="submit">
                    <Save size={18} />
                    Salvar Registro
                </button>
            </form>
        </>
    )
};

export default FormLavagem