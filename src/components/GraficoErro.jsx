import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine
} from "recharts";

function GraficoErro({ data }) {
    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    style={{ backgroundColor: "#ffffff" }}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    {/* 🔹 Grid */}
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

                    {/* 🔹 Linha ZERO */}
                    <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="4 4" />

                    {/* 🔹 Eixo X */}
                    <XAxis
                        dataKey="data"
                        tickFormatter={(data) =>
                            new Date(data).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit"
                            })
                        }
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: "#d1d5db" }}
                        tickLine={false}
                    />

                    {/* 🔵 Eixo Y ESQUERDA (m³) */}
                    <YAxis
                        yAxisId="left"
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: "#d1d5db" }}
                        tickLine={false}
                        label={{
                            value: "Erro (m³)",
                            angle: -90,
                            position: "insideLeft",
                            style: {
                                textAnchor: "middle",
                                fill: "#374151",
                                fontSize: 12
                            }
                        }}
                    />

                    {/* 🔴 Eixo Y DIREITA (%) */}
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: "#d1d5db" }}
                        tickLine={false}
                        label={{
                            value: "Erro (%)",
                            angle: 90,
                            position: "insideRight",
                            style: {
                                textAnchor: "middle",
                                fill: "#374151",
                                fontSize: 12
                            }
                        }}
                    />

                    {/* 🔹 Tooltip */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px"
                        }}
                        labelFormatter={(data) =>
                            new Date(data).toLocaleDateString("pt-BR")
                        }
                    />

                    {/* 🔵 Linha erro m³ */}
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="erro"
                        name="Erro (m³)"
                        stroke="#2563eb"
                        strokeWidth={1}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />

                    {/* 🔴 Linha erro % */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="erroPercentual"
                        name="Erro (%)"
                        stroke="#dc2626"
                        strokeWidth={1}          // 🔻 mais fina
                        strokeOpacity={0.4}      // 🔻 mais transparente
                        dot={false}           // 🔻 ponto menor
                        activeDot={{ r: 4 }}     // 🔻 destaque mais suave
                    />
                </LineChart>
            </ResponsiveContainer>

            {/* 🔻 LEGENDA CUSTOM */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "10px",
                    fontSize: "14px",
                    color: "#374151"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                        style={{
                            width: "14px",
                            height: "3px",
                            backgroundColor: "#2563eb",
                            display: "inline-block"
                        }}
                    />
                    Erro (m³)
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                        style={{
                            width: "14px",
                            height: "3px",
                            backgroundColor: "#dc2626",
                            display: "inline-block"
                        }}
                    />
                    Erro (%)
                </div>
            </div>
        </div>
    );
}

export default GraficoErro;