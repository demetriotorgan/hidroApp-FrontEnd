import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function GraficoPrevisoes({ data }) {

    // 🔹 formata data apenas para exibição (não transforma dado)
    const formatarData = (value) =>
        new Date(value).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit"
        });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                style={{ backgroundColor: "#ffffff" }}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            >

                {/* 🔹 Grid suave */}
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

                {/* 🔹 Eixo X */}
                <XAxis
                    dataKey="dataReferencia"
                    tickFormatter={formatarData}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={false}
                />

                {/* 🔹 Eixo Y */}
                <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={false}
                    label={{
                        value: "Consumo (m³)",
                        angle: -90,
                        position: "insideLeft",
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
                    labelFormatter={formatarData}
                />

                {/* 🔵 PREVISÃO */}
                <Line
                    type="monotone"
                    dataKey="consumoPrevisto"
                    name="Previsto (m³)"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                />              

            </LineChart>
        </ResponsiveContainer>
    );
}

export default GraficoPrevisoes;