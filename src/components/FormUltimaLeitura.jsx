import { Save } from 'lucide-react'
import React from 'react'

const FormUltimaLeitura = () => {
  return (
    <>
    <h2>Cadastrar Última Leitura</h2>
    <form className='form-container'>
        <div className='form-group'>
            <label>Data
                <input 
                className='form-input'
                type='date'
                name='data'                
                />
            </label>
            <label>Leitura
                <input 
                className='form-input'
                type='text'
                name='leitura'
                />
            </label>
        </div>
        <button className="form-button" type="submit">
        <Save size={18}/>
        Salvar Leitura
      </button>
    </form>
    </>
  )
}

export default FormUltimaLeitura