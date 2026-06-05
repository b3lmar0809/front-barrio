/**
 * SalesPage class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/Store'
import { getSales } from '../../api/SaleApi'
import type { SaleResponse } from '../../api/SaleApi'
import Spinner from '../../components/atoms/Spinner/Spinner'
import StatCard from '../../components/molecules/StatCard/StatCard'
import SalesChart from '../../components/molecules/SalesChart/SalesChart'
import styles from './SalesPage.module.css'

const formatCLP = (v: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v)

//ordena por timestamp antes de insertar en el Map para que el orden
//de insercion sea cronologico — sin necesidad de re-ordenar al final.
const buildChartData = (sales: SaleResponse[]) => {
    const sorted = [...sales].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const map = new Map<string, { count: number; total: number }>()
    for (const sale of sorted) {
        const d   = new Date(sale.date)
        const key = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
        const prev = map.get(key) ?? { count: 0, total: 0 }
        map.set(key, { count: prev.count + 1, total: prev.total + sale.total })
    }
    return Array.from(map.entries()).map(([date, { count, total }]) => ({ date, count, total }))
}

const buildTopProducts = (sales: SaleResponse[]) => {
    const map = new Map<string, number>()
    for (const sale of sales) {
        for (const item of sale.items) {
            map.set(item.productName, (map.get(item.productName) ?? 0) + item.quantity)
        }
    }
    return Array.from(map.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, qty]) => ({ name, qty }))
}

const SalesPage: React.FC = () => {
    const userId = useSelector((state: RootState) => state.user.id)

    const [sales,   setSales]   = useState<SaleResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState<string | null>(null)

    useEffect(() => {
        if (!userId) return
        const load = async () => {
            try {
                setLoading(true)
                setSales(await getSales(userId))
            } catch {
                setError('No se pudieron cargar las ventas.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [userId])

    const totalVentas    = sales.length
    const totalRecaudado = sales.reduce((acc, s) => acc + s.total, 0)
    const promedio       = totalVentas > 0 ? totalRecaudado / totalVentas : 0

    const grouped        = buildChartData(sales)
    const dailySales     = grouped.map(({ date, count }) => ({ date, count }))
    const dailyRevenue   = grouped.map(({ date, total }) => ({ date, total }))
    const cashCount      = sales.filter(s => s.paymentMethod === 'CASH').length
    const cardCount      = sales.filter(s => s.paymentMethod === 'CARD').length
    const paymentMethods = [
        { name: 'Efectivo', value: cashCount },
        { name: 'Tarjeta',  value: cardCount },
    ].filter(p => p.value > 0)
    const topProducts    = buildTopProducts(sales)

    const barCaption  = grouped.length > 0
        ? `Total de ${totalVentas} ventas entre ${grouped[0].date} y ${grouped[grouped.length - 1].date}`
        : ''
    const dailyAvg    = grouped.length > 0 ? totalRecaudado / grouped.length : 0
    const lineCaption = `Total: ${formatCLP(totalRecaudado)} | Promedio diario: ${formatCLP(dailyAvg)}`
    const pieCaption  = `${cashCount} ventas en efectivo · ${cardCount} ventas con tarjeta`

    return (
        <div className={styles.page}>

            <h2 className={styles.sectionTitle}>Resumen de Ventas</h2>

            {loading && (
                <div className={styles.center}>
                    <Spinner size="lg" />
                </div>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && sales.length === 0 && (
                <p className={styles.empty}>No hay ventas registradas</p>
            )}

            {!loading && !error && sales.length > 0 && (
                <>
                    <div className={styles.summaryGrid}>
                        <StatCard
                            variant="info"
                            title="Total ventas"
                            value={totalVentas}
                            subtitle="ventas registradas"
                        />
                        <StatCard
                            variant="success"
                            title="Total recaudado"
                            value={formatCLP(totalRecaudado)}
                            subtitle="ingresos acumulados"
                        />
                        <StatCard
                            variant="warning"
                            title="Promedio por venta"
                            value={formatCLP(promedio)}
                            subtitle="por transacción"
                        />
                    </div>

                    <SalesChart
                        dailySales={dailySales}
                        dailyRevenue={dailyRevenue}
                        paymentMethods={paymentMethods}
                        topProducts={topProducts}
                        barCaption={barCaption}
                        lineCaption={lineCaption}
                        pieCaption={pieCaption}
                    />
                </>
            )}

        </div>
    )
}

export default SalesPage
