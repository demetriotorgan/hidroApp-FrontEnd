import { FlaskConical, Save } from 'lucide-react'
import React, { useState } from 'react'
import { getDataAtual } from '../services/dataUtils'
import { calcularAcido } from '../services/acidoService'

const FormPh = () => {
    const dadosInicias = {
        reservatorio: '',
        phAtual: '',
        phObjetivo: 6.8,
        acido: '',
        data: getDataAtual()
    }

    const [form, setForm] = useState(dadosInicias);

    function handleChange(e) {
        const { name, value, type } = e.target;
        const novoValor = value;

        const novoForm = {
            ...form,
            [name]: novoValor
        };

        //Calculo da massa de ácido
        const reservatorio = parseFloat(novoForm.reservatorio);
        const phAtual = parseFloat(novoForm.phAtual);
        const phObjetivo = parseFloat(novoForm.phObjetivo);

        if (
            !isNaN(reservatorio) &&
            !isNaN(phObjetivo) &&
            !isNaN(phAtual) &&
            novoForm.reservatorio !== '' &&
            novoForm.phAtual !== '' &&
            novoForm.phObjetivo !== ''
        ) {
            novoForm.acido = calcularAcido(
                phObjetivo,
                reservatorio,
                phAtual
            );
        } else {
            novoForm.acido = '';
        }
        setForm(novoForm);
    };

    return (
        <>
            <h3><FlaskConical /> Correção de pH</h3>
            <form className='form-container'>
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
        </>
    )
}

export default FormPh
