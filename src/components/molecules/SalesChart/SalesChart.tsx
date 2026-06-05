/**
 * SalesChart
 *
 * @version 1.0.0 - 04 jun. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 04 jun. 2026
 */
import React from 'react'
import SalesBarChart from '../../atoms/charts/SalesBarChart'
import RevenueLineChart from '../../atoms/charts/RevenueLineChart'
import PaymentPieChart from '../../atoms/charts/PaymentPieChart'
import StatCard from '../StatCard/StatCard'
import styles from './SalesChart.module.css'

interface DailySale     { date: string; count: number }
interface DailyRevenue  { date: string; total: number }
interface PaymentMethod { name: string; value: number }
interface TopProduct    { name: string; qty: number }

interface SalesChartProps {
    dailySales:     DailySale[]
    dailyRevenue:   DailyRevenue[]
    paymentMethods: PaymentMethod[]
    topProducts:    TopProduct[]
    barCaption:     string
    lineCaption:    string
    pieCaption:     string
}

const SalesChart: React.FC<SalesChartProps> = ({
    dailySales,
    dailyRevenue,
    paymentMethods,
    topProducts,
    barCaption,
    lineCaption,
    pieCaption,
}) => (
    <div className={styles.grid}>

        <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Ventas por día</h3>
            <SalesBarChart data={dailySales} />
            {barCaption && <p className={styles.chartCaption}>{barCaption}</p>}
        </div>

        <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Ingresos por día</h3>
            <RevenueLineChart data={dailyRevenue} />
            {lineCaption && <p className={styles.chartCaption}>{lineCaption}</p>}
        </div>

        <div className={styles.bottomRow}>

            <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Métodos de pago</h3>
                <PaymentPieChart data={paymentMethods} />
                {pieCaption && <p className={styles.chartCaption}>{pieCaption}</p>}
            </div>

            <div className={styles.topProductsPanel}>
                <h3 className={styles.chartTitle}>Productos más vendidos</h3>
                <div className={styles.topProductsList}>
                    {topProducts.map((p, i) => (
                        <StatCard
                            key={p.name}
                            variant="info"
                            title={p.name}
                            value={`${p.qty} unidades vendidas`}
                            subtitle={`#${i + 1}`}
                        />
                    ))}
                </div>
            </div>

        </div>

    </div>
)

export default SalesChart
