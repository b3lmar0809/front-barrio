/**
 * PaymentPieChart
 *
 * @version 1.0.0 - 03 jun. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 03 jun. 2026
 */
import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import styles from './PaymentPieChart.module.css'

const COLORS = ['#6366f1', '#10b981']
const RADIAN = Math.PI / 180

interface PaymentPieChartProps {
    data: { name: string; value: number }[]
}

interface LabelProps {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
}

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: LabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

interface TooltipPayload { name: string; value: number }
interface CustomTooltipProps { active?: boolean; payload?: TooltipPayload[] }

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const { name, value } = payload[0]
    return (
        <div className={styles.tooltip}>
            <p className={styles.tooltipName}>{name}</p>
            <p className={styles.tooltipValue}>{value} ventas</p>
        </div>
    )
}

const PaymentPieChart: React.FC<PaymentPieChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={350}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
                label={renderLabel}
                labelLine={false}
            >
                {data.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
)

export default PaymentPieChart