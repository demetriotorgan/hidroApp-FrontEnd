import React from 'react';
import './RegraDeEficiencia.css';

const RegraDeEficiencia = () => {
    return (
        <div className="regra-container">
            <h2 className="regra-titulo">Como funciona a eficiência da lavagem</h2>

            <p className="regra-descricao">
                O sistema calcula a eficiência separando dois processos:
                <strong> lavagem</strong> e <strong>enxágue</strong>.
                Isso permite identificar exatamente onde há desperdício de água.
            </p>

            {/* 📐 CONSUMO IDEAL */}
            <h3 className="secao-titulo">📐 Como o Consumo Ideal é calculado</h3>

            <p>
                O consumo ideal representa a quantidade de água recomendada para uma lavagem eficiente,
                considerando as limitações físicas da máquina e a quantidade de roupa.
            </p>

            <h4 className="subtitulo">🧼 Lavagem Ideal</h4>

            <p>
                A água de lavagem é calculada de forma linear com base no peso da roupa:
            </p>

            <div className="formula">
                Lavagem ideal = 40 + ((80 - 40) / 12) × carga (kg)
            </div>

            <ul>
                <li>40 L → mínimo da máquina</li>
                <li>80 L → capacidade máxima</li>
                <li>12 kg → capacidade total</li>
            </ul>

            <p>
                Isso garante que a água aumente proporcionalmente conforme a carga.
            </p>

            <h4 className="subtitulo">🚿 Enxágue Ideal</h4>

            <p>
                O enxágue é calculado como uma fração da lavagem, respeitando o limite mínimo:
            </p>

            <div className="formula">
                Enxágue ideal = max(50% da lavagem ideal, 40 L)
            </div>

            <p>
                Isso evita desperdício, mas garante volume suficiente para remoção de resíduos.
            </p>

            <h4 className="subtitulo">📊 Consumo Total Ideal</h4>

            <div className="formula">
                Total ideal = lavagem ideal + enxágue ideal
            </div>

            <p>
                Esse valor é a referência principal usada pelo sistema para avaliar eficiência.
            </p>

            <h4 className="subtitulo">⚖️ Comparação com consumo real</h4>

            <p>
                A eficiência é calculada comparando o consumo real com o ideal:
            </p>

            <div className="formula">
                Eficiência = consumo real ÷ consumo ideal
            </div>

            <p>
                Onde:
            </p>

            <ul>
                <li><strong>&lt; 1:</strong> uso abaixo do ideal (ótimo)</li>
                <li><strong>≈ 1:</strong> uso ideal</li>
                <li><strong>&gt; 1:</strong> excesso de consumo</li>
            </ul>

            {/* 🧼 LAVAGEM */}
            <h3 className="secao-titulo">🧼 Eficiência da Lavagem</h3>

            <p>
                A água de lavagem varia conforme o peso da roupa, respeitando os limites da máquina:
            </p>

            <ul>
                <li>Mínimo: <strong>40 L</strong></li>
                <li>Máximo: <strong>80 L</strong></li>
                <li>Capacidade: <strong>12 kg</strong></li>
            </ul>

            <p>
                O cálculo é feito de forma linear, aumentando a água conforme a carga.
            </p>

            {/* 🚿 ENXÁGUE */}
            <h3 className="secao-titulo">🚿 Eficiência do Enxágue</h3>

            <p>
                O enxágue não precisa usar o mesmo volume da lavagem.
                O sistema considera:
            </p>

            <ul>
                <li>Ideal: <strong>50% da água da lavagem</strong></li>
                <li>Restrição: <strong>mínimo de 40 L</strong></li>
            </ul>

            <p>
                Ou seja, o enxágue segue a regra:
            </p>

            <div className="formula">
                Enxágue ideal = max(50% da lavagem, 40 L)
            </div>

            {/* 📊 EFICIÊNCIA */}
            <h3 className="secao-titulo">📊 Cálculo da Eficiência</h3>

            <p>
                A eficiência é calculada separadamente para cada etapa:
            </p>

            <ul>
                <li><strong>Lavagem:</strong> Litros de lavagem ÷ Kg de roupa</li>
                <li><strong>Enxágue:</strong> Litros de enxágue ÷ Kg de roupa</li>
                <li><strong>Total:</strong> (Lavagem + Enxágue) ÷ Kg</li>
            </ul>

            {/* 📈 EFICIÊNCIA RELATIVA */}
            <h3 className="secao-titulo">📈 Eficiência Relativa</h3>

            <p>
                O sistema compara o valor real com o valor ideal da máquina:
            </p>

            <div className="formula">
                Eficiência relativa = Consumo real ÷ Consumo ideal
            </div>

            <table className="regra-tabela">
                <thead>
                    <tr>
                        <th>Faixa</th>
                        <th>Classificação</th>
                        <th>Interpretação</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>≤ 1.1</td>
                        <td><span className="badge excelente">EXCELENTE</span></td>
                        <td>Uso ideal da água (próximo do recomendado)</td>
                    </tr>

                    <tr>
                        <td>1.1 – 1.3</td>
                        <td><span className="badge boa">BOA</span></td>
                        <td>Leve excesso, aceitável</td>
                    </tr>

                    <tr>
                        <td>1.3 – 1.6</td>
                        <td><span className="badge media">MÉDIA</span></td>
                        <td>Consumo acima do ideal</td>
                    </tr>

                    <tr>
                        <td>&gt; 1.6</td>
                        <td><span className="badge ruim">RUIM</span></td>
                        <td>Desperdício significativo de água</td>
                    </tr>
                </tbody>
            </table>

            {/* 💡 INSIGHT FINAL */}
            <div className="regra-dica">
                💡 <strong>Importante:</strong>
                Uma lavagem pode ser eficiente na etapa de lavagem e ineficiente no enxágue.
                O sistema foi projetado para identificar exatamente onde está o desperdício.
            </div>
        </div>
    );
};

export default RegraDeEficiencia;