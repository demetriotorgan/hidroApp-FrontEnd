import { Save } from 'lucide-react'
import React, { useState } from 'react'
import api from '../services/api';
import { useUltimaLeitura } from '../hooks/useUltimaLeitura';

const FormUltimaLeitura = ({ handleChange, handleSubmit, form}) => {
 
    
  return (
    <>
      <h2>Cadastrar Última Leitura</h2>
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
          <label>Leitura
            <input
              className='form-input'
              type='number'
              placeholder='Apenas os três primeiros digitos'
              name='leitura'
              value={form.leitura}
              onChange={handleChange}
            />
          </label>
          <label>Obs
            <input
              className='form-input'
              type='text'
              name='obs'
              value={form.obs || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="form-button" type="submit">
          <Save size={18} />
          Salvar Leitura
        </button>
      </form>
    </>
  )
}

export default FormUltimaLeitura