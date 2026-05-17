import React from 'react'
import DashboardCard from '../components/dashboard/DashboardCard'
import GraficoUltimos7Dias from '../components/GraficoUltimos7Dias';
import './PainelCinematico.css'
import {
    Activity,
    TrendingUp,
    BarChart3,
    AlertTriangle,
    ShieldCheck,
} from 'lucide-react';

const PainelCinematico = ({ cinematica }) => {
    if (!cinematica.gerenteValido) {
        return (
            <div className='painel-indisponivel'>
                <h2>Cinemática de Consumo</h2>
                <p>Dados de cinemática indisponíveis</p>
            </div>
        )
    }

    //dados de cinematica
    const dados = cinematica.pipeline.tecnicoVelocidade;

    // Funções auxiliares
    const formatarNumero = (valor, casas = 1) =>
        Number(valor).toFixed(casas).replace('.', ',');

    const formatarPercentual = (valor, casas = 1) =>
        `${formatarNumero(valor, casas)}%`;

    const obterCorClassificacao = (classificacao = '') => {
        const texto = classificacao.toLowerCase();

        if (
            texto.includes('extremamente alto') ||
            texto.includes('alto') ||
            texto.includes('pico')
        ) {
            return '#e53935';
        }

        if (
            texto.includes('moderadamente') ||
            texto.includes('variável') ||
            texto.includes('atenção')
        ) {
            return '#fb8c00';
        }

        if (
            texto.includes('normal') ||
            texto.includes('estável') ||
            texto.includes('baixo')
        ) {
            return '#43a047';
        }

        return '#546e7a';
    };


    // Interpretações resumidas  
    const resumoExecutivo = [
        `O consumo atual está classificado como ${dados.classificacaoConsumoAtual}.`,
        `O valor atual encontra-se no percentil ${dados.classificacaoPercentil}.`,
        dados.isPicoSemanal
            ? 'O consumo atual representa o maior valor da semana.'
            : 'O consumo atual não é o maior valor da semana.',
        `A tendência recente é ${dados.tendenciaRecente}.`,
        `A variabilidade semanal é considerada ${dados.classificacaoVariabilidade}.`,
    ];


    return (
        <section className='dashboard-section'>
            <h2>Painel de Cinemática</h2>
            <div className='dashboard-cards'>
                {/* =========================================================
                    1. VELOCIDADE ATUAL
                ========================================================== */}
                <DashboardCard title={'Velocidade Atual'}>
                    <h3>{formatarNumero(dados.velocidadeAtual, 0)} m³/dia</h3>
                    <small>
                        Classificação:{' '}
                        <strong
                            style={{
                                color: obterCorClassificacao(
                                    dados.classificacaoConsumoAtual
                                ),
                            }}
                        >
                            {dados.classificacaoConsumoAtual}
                        </strong>
                        <small> Tendência: {dados.tendenciaRecente}</small>
                    </small>

                </DashboardCard>
                {/* =========================================================
                     2. POSIÇÃO NA FAIXA SEMANAL
                    ========================================================== */}
                <DashboardCard title={'Faixa de consumo'}>
                    <h4>{formatarPercentual(dados.posicaoAtualNaFaixa, 0)}</h4>
                    <small style={{ fontSize: '12px' }}>Mínimo: {formatarNumero(dados.minimoSemanal, 0)} m³ </small>
                    <small style={{ fontSize: '12px' }} >Máximo: {formatarNumero(dados.maximoSemanal, 0)} m³ </small>
                    <small style={{ fontSize: '10px' }}>Distância ao máximo:{' '}{formatarPercentual(dados.distanciaPercentualAoMaximo, 0)}</small>

                </DashboardCard>

                {/* =========================================================
                3. MÉDIAS
                ========================================================== */}
                <DashboardCard title="Média Semnal">
                    <p><strong>{formatarNumero(dados.mediaSemanal, 1)} m³/dia</strong></p>
                    <p>Últimos 3 dias:{' '}
                        <strong>
                            {formatarNumero(dados.mediaUltimos3Dias, 1)} m³/dia
                        </strong>
                    </p>
                    <small style={{ fontSize: '10px' }}>
                        Diferença:{' '}
                        {formatarNumero(dados.diferencaSemanal, 1)} m³
                    </small>
                </DashboardCard>

                {/* =========================================================
                    4. PICO SEMANAL
                ========================================================== */}
                <DashboardCard title="Pico Semanal">
                    <h3>{dados.isPicoSemanal ? 'Sim' : 'Não'}</h3>
                    <small style={{ fontSize: '10px' }}>{dados.classificacaoDePico}</small>
                    <small style={{ fontSize: '10px' }}>
                        Diferença para a média:{' '}
                        {formatarNumero(
                            dados.velocidadeAtual - dados.mediaSemanal,
                            1
                        )}{' '}
                        m³
                    </small>
                </DashboardCard>
                {/* =========================================================
                    5. VARIABILIDADE
                ========================================================== */}
                <DashboardCard title="Variabilidade">
                    <h3>
                        {formatarPercentual(
                            dados.variabilidadeSemanal,
                            1
                        )}
                    </h3>
                    <small style={{ fontSize: '10px' }} >{dados.classificacaoVariabilidade}</small>

                    <p style={{ fontSize: '10px' }} >
                        CV: {formatarPercentual(dados.CV, 1)}
                    </p>
                </DashboardCard>
                <DashboardCard title="Desvio Padrão">
                    <h3>{formatarNumero(dados.desvioPadraoSemanal, 1)} m³/dia</h3>
                </DashboardCard>

                {/* =========================================================
                    6. AMPLITUDE
                ========================================================== */}
                <DashboardCard title="Amplitude Semanal">
                    <h3>{formatarNumero(dados.amplitudeSemanal, 0)} m³/dia</h3>
                    <p style={{ fontSize: '10px' }} >
                        Intervalo entre o menor e o maior consumo da
                        semana.
                    </p>
                </DashboardCard>

                {/* =========================================================
                7. PERCENTIL
            ========================================================== */}
                <DashboardCard title="Classificação Percentil">
                    <h5
                        style={{
                            color: obterCorClassificacao(
                                dados.classificacaoPercentil
                            ),
                        }}
                    >
                        {dados.classificacaoPercentil}
                    </h5>
                </DashboardCard>
            </div>

              {/* =========================================================
                8. RESUMO
            ========================================================== */}

            <div className="resumo-cinematico">
                <div className="resumo-header">
                    <div className="resumo-header-icon">
                        <Activity size={22} />
                    </div>
                    <div>
                        <h3>Resumo da Cinemática de Consumo</h3>
                        <p>Interpretação consolidada dos indicadores dos últimos 7 dias.</p>
                    </div>
                </div>

                <div className="resumo-lista">
                    <div className="resumo-item">
                        <TrendingUp size={18} className="resumo-item-icon" />
                        <span>
                            O consumo atual está classificado como{' '}
                            <strong>{dados.classificacaoConsumoAtual}</strong>.
                        </span>
                    </div>

                    <div className="resumo-item">
                        <BarChart3 size={18} className="resumo-item-icon" />
                        <span>
                            O valor atual encontra-se no percentil{' '}
                            <strong>{dados.classificacaoPercentil}</strong>.
                        </span>
                    </div>

                    <div className="resumo-item">
                        <AlertTriangle size={18} className="resumo-item-icon" />
                        <span>
                            {dados.isPicoSemanal
                                ? 'O consumo atual representa o maior valor da semana.'
                                : 'O consumo atual não é o maior valor da semana.'}
                        </span>
                    </div>

                    <div className="resumo-item">
                        <TrendingUp size={18} className="resumo-item-icon" />
                        <span>
                            A tendência recente é <strong>{dados.tendenciaRecente}</strong>.
                        </span>
                    </div>

                    <div className="resumo-item">
                        <ShieldCheck size={18} className="resumo-item-icon" />
                        <span>
                            A variabilidade semanal é considerada{' '}
                            <strong>{dados.classificacaoVariabilidade}</strong>.
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <h3>Histórico Últimos 7 dias</h3>
                <GraficoUltimos7Dias
                    velocidades={dados.ultimas7Velocidades}
                    percentil={dados.percentilAtual}
                    dadosDoGrafico={dados.dadosGrafico}
                />
            </div>

        </section>
    )
}

export default PainelCinematico