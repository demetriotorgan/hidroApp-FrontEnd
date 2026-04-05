// hooks/usePrevisao.js
import { useEffect, useMemo, useState } from "react";
import { extrairPeriodo, calcularIntervaloDiasInclusivo } from "../services/dataUtils";
import {
  calcularConsumoEstimado,
  calcularConsumoNoPeriodo
} from "../services/hidrometroService";

export default function usePrevisao(dados) {
  const [form, setForm] = useState({
    dataInicial: '',
    dataFinal: '',
    quantidadeDias: ''
  });

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  // Inicializar datas
  useEffect(() => {
    if (!dados?.length) return;

    const { dataInicial, dataFinal } = extrairPeriodo(dados);

    setForm(prev => ({
      ...prev,
      dataInicial,
      dataFinal
    }));
  }, [dados]);

  // Calcular dias automaticamente
  useEffect(() => {
    if (!form.dataInicial || !form.dataFinal) return;

    const dias = calcularIntervaloDiasInclusivo(
      form.dataInicial,
      form.dataFinal
    );

    setForm(prev => ({
      ...prev,
      quantidadeDias: dias
    }));
  }, [form.dataInicial, form.dataFinal]);

  const consumoDoPeriodo = useMemo(() => {
    return calcularConsumoNoPeriodo(
      dados,
      form.dataInicial,
      form.dataFinal
    );
  }, [dados, form.dataInicial, form.dataFinal]);

  const estimativa = useMemo(() => {
    return calcularConsumoEstimado(dados, form.quantidadeDias);
  }, [dados, form.quantidadeDias]);

  const comparacao = useMemo(() => {
    if (!consumoDoPeriodo || !estimativa || estimativa.erro) return null;

    return {
      real: consumoDoPeriodo.consumoLitros,
      estimado: estimativa.consumo,
      diferenca: estimativa.consumo - consumoDoPeriodo.consumoLitros,
      erroPercentual:
        ((estimativa.consumo - consumoDoPeriodo.consumoLitros) /
          consumoDoPeriodo.consumoLitros) * 100
    };
  }, [consumoDoPeriodo, estimativa]);

  return {
    form,
    handleChange,
    consumoDoPeriodo,
    estimativa,
    comparacao
  };
}