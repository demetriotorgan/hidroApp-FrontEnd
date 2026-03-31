import { useState } from "react";
import {
  calcularCoeficienteA,
  calcularConsumoEstimado,
  calcularCustoEstimado,
  montarEstimativaJSON
} from "../services/hidrometroService";
import api from "../services/api";

export default function useEstimativa(dados) {
  const [form, setForm] = useState({ dias: "" });
  const [resultado, setResultado] = useState(null);
  const [salvando, setSalvando] = useState(false);

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function calcular() {
    const dias = Number(form.dias);
    if (!dias || dias <= 0) return;
    
    const resultado = calcularConsumoEstimado(dados, dias)
    setResultado(resultado);
  }

  async function salvar() {
    const payload = montarEstimativaJSON({ resultado, dados });
    if (!payload) return;

    const confirmar = window.confirm("Deseja realmente salvar esta estimativa?");
    if (!confirmar) return;

    try {
      setSalvando(true);
      await api.post("/saveEstimativa", payload);
      alert("Estimativa salva com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar estimativa");
    } finally {
      setSalvando(false);
    }
  }

  return {
    form,
    resultado,
    salvando,
    handleChange,
    calcular,
    salvar
  };
}