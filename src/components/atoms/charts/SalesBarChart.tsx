/**
 * SalesBarChart
 *
 * @version 1.0.0 - 03 jun. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 03 jun. 2026
 */
import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer,
} from 'recharts'

interface SalesBarChartProps {
    data: { date: string; count: number }[]
}

// date format is dd/MM/yyyy — X axis shows only dd/MM to avoid clutter
const formatXTick = (v: string) => v.slice(0, 5)

const SalesBarChart: React.FC<SalesBarChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
            <XAxis dataKey="date" tickFormatter={formatXTick} tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Ventas" fill="#6366f1" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="count" position="top" style={{ fontSize: 11, fill: '#64748b' }} />
            </Bar>
        </BarChart>
    </ResponsiveContainer>
)

export default SalesBarChart