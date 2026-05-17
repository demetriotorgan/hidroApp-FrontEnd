import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Activity,
  AlertTriangle,
} from 'lucide-react';

const GraficoUltimos7Dias = ({
  velocidades = [],
  percentil = 0,
  dadosDoGrafico = {},
}) => {
  // Se existir a série estruturada em dadosDoGrafico, use-a.
  // Caso contrário, monta uma série simples a partir do array de velocidades.
  const serie =
    dadosDoGrafico?.serie?.length > 0
      ? dadosDoGrafico.serie
      : velocidades
        .slice()
        .reverse()
        .map((valor, index) => ({
          dia: `D-${6 - index}`,
          velocidade: valor,
        }));

  const resumo = dadosDoGrafico?.resumo || {};

  const {
    mediaSemanal = 0,
    mediaUltimos3Dias = 0,
    maximoSemanal = 0,
    minimoSemanal = 0,
    classificacaoConsumoAtual = '',
    tendenciaRecente = '',
    isPicoSemanal = false,
  } = resumo;

  // Tooltip customizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const ponto = payload[0].payload;

    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #ddd',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontSize: '12px',
        }}
      >
        <p><strong>{label}</strong></p>
        <p>Velocidade: <strong>{ponto.velocidade} m³/dia</strong></p>

        {ponto.mediaSemanal !== undefined && (
          <p>Média semanal: {ponto.mediaSemanal.toFixed(1)} m³/dia</p>
        )}

        {ponto.classificacao && (
          <p>Classificação: {ponto.classificacao}</p>
        )}
      </div>
    );
  };

  if (!serie.length) {
    return <p>Sem dados para exibir o gráfico.</p>;
  }

  return (
    <div>
      {/* ===========================
          RESUMO ACIMA DO GRÁFICO
      ============================ */}
      <div className="grafico-resumo">
        <div className="grafico-resumo-header">
          <div className="grafico-resumo-header-icon">
            <BarChart3 size={20} />
          </div>
          <div>
            <h4>Indicadores do Gráfico</h4>
            <p>Leitura rápida dos principais indicadores da série temporal.</p>
          </div>
        </div>

        <div className="grafico-resumo-grid">
          <div className="grafico-resumo-card">
            <Activity size={18} className="grafico-resumo-icon" />
            <div>
              <span className="grafico-resumo-label">Percentil</span>
              <strong className="grafico-resumo-value">
                {percentil.toFixed(1)}%
              </strong>
            </div>
          </div>

          <div className="grafico-resumo-card">
            <BarChart3 size={18} className="grafico-resumo-icon" />
            <div>
              <span className="grafico-resumo-label">Classificação</span>
              <strong className="grafico-resumo-value">
                {classificacaoConsumoAtual}
              </strong>
            </div>
          </div>

          <div className="grafico-resumo-card">
            <TrendingUp size={18} className="grafico-resumo-icon" />
            <div>
              <span className="grafico-resumo-label">Tendência</span>
              <strong className="grafico-resumo-value">
                {tendenciaRecente}
              </strong>
            </div>
          </div>

          <div className="grafico-resumo-card">
            <AlertTriangle size={18} className="grafico-resumo-icon" />
            <div>
              <span className="grafico-resumo-label">Pico Semanal</span>
              <strong className="grafico-resumo-value">
                {isPicoSemanal ? 'Sim' : 'Não'}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================
          GRÁFICO
      ============================ */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={serie}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="dia" />

          <YAxis />

          <Tooltip content={<CustomTooltip />} />

          <Legend />

          {/* Linha principal */}
          <Line
            type="monotone"
            dataKey="velocidade"
            name="Velocidade"
            stroke="#1976d2"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          {/* Média semanal */}
          {mediaSemanal > 0 && (
            <ReferenceLine
              y={mediaSemanal}
              stroke="#43a047"
              strokeDasharray="5 5"
              label="Média"
            />
          )}

          {/* Média últimos 3 dias */}
          {mediaUltimos3Dias > 0 && (
            <ReferenceLine
              y={mediaUltimos3Dias}
              stroke="#fb8c00"
              strokeDasharray="4 4"
              label="Média 3 dias"
            />
          )}

          {/* Máximo semanal */}
          {maximoSemanal > 0 && (
            <ReferenceLine
              y={maximoSemanal}
              stroke="#e53935"
              strokeDasharray="2 2"
              label="Máximo"
            />
          )}

          {/* Mínimo semanal */}
          {minimoSemanal > 0 && (
            <ReferenceLine
              y={minimoSemanal}
              stroke="#8e24aa"
              strokeDasharray="2 2"
              label="Mínimo"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoUltimos7Dias;