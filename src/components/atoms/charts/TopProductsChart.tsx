/**
 * TopProductsChart
 *
 * @version 1.0.0 - 04 jun. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 04 jun. 2026
 */
import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

interface TopProductsChartProps {
    data: { name: string; qty: number }[]
}

const TopProductsChart: React.FC<TopProductsChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={350}>
        <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" horizontal={false} />
            <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <YAxis
                type="category"
                dataKey="name"
                width={140}
                tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip formatter={(value) => [value ?? 0, 'Unidades vendidas']} />
            <Bar dataKey="qty" name="Unidades" fill="#f59e0b" radius={[0, 4, 4, 0]} />
        </BarChart>
    </ResponsiveContainer>
)

export default TopProductsChart
