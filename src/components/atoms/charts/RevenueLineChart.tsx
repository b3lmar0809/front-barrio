/**
 * RevenueLineChart
 *
 * @version 1.0.0 - 03 jun. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 03 jun. 2026
 */
import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

interface RevenueLineChartProps {
    data: { date: string; total: number }[]
}

const formatCLP = (v: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v)

const abbreviate = (v: number): string => {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
    if (v >= 1_000)     return `$${(v / 1_000).toFixed(0)}K`
    return `$${v}`
}

const RevenueLineChart: React.FC<RevenueLineChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
            <XAxis dataKey="date" tickFormatter={(v: string) => v.slice(0, 5)} tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tickFormatter={abbreviate} tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <Tooltip formatter={(v) => [formatCLP(v as number), 'Ingresos']} />
            <Legend />
            <Line
                type="monotone"
                dataKey="total"
                name="Ingresos"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 4, fill: '#059669' }}
                activeDot={{ r: 6 }}
            />
        </LineChart>
    </ResponsiveContainer>
)

export default RevenueLineChart