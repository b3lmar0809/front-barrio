/**
 *ReportsPage class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import type { RootState } from '../../app/Store'
import {
    getDashboard,
    getSaleReport,
    getLowStock,
} from '../../api/ReportApi'
import type { Dashboard, SaleReport, LowStockProduct } from '../../api/ReportApi'
import Spinner from '../../components/atoms/Spinner/Spinner'
import Badge from '../../components/atoms/Badge/Badge'
import StatCard from '../../components/molecules/StatCard/StatCard'
import styles from './ReportsPage.module.css'

const formatCLP = (v: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v)

const getCurrentPeriod = () => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

const ReportsPage: React.FC = () => {
    const userId = useSelector((state: RootState) => state.user.id)

    const [dashboard, setDashboard] = useState<Dashboard | null>(null)
    const [lowStock,  setLowStock]  = useState<LowStockProduct[]>([])
    const [loading,   setLoading]   = useState(true)
    const [error,     setError]     = useState<string | null>(null)

    const [period,        setPeriod]        = useState(getCurrentPeriod())
    const [report,        setReport]        = useState<SaleReport | null>(null)
    const [reportLoading, setReportLoading] = useState(true)
    const [reportError,   setReportError]   = useState<string | null>(null)

    useEffect(() => {
        if (!userId) return
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                const [dash, stock] = await Promise.all([
                    getDashboard(userId),
                    getLowStock(userId),
                ])
                setDashboard(dash)
                setLowStock(stock)
            } catch {
                setError('No se pudieron cargar los datos.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [userId])

    useEffect(() => {
        if (!userId) return
        const loadReport = async () => {
            setReportLoading(true)
            setReport(null)
            setReportError(null)
            try {
                const r = await getSaleReport(userId, period)
                setReport(r)
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 404) {
                    setReport(null)
                } else {
                    setReportError('No se pudo cargar el reporte.')
                }
            } finally {
                setReportLoading(false)
            }
        }
        loadReport()
    }, [userId, period])

    const maxRevenue = dashboard?.topProducts?.[0]?.totalRevenue ?? 1

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Reportes</h1>

            {loading && (
                <div className={styles.center}>
                    <Spinner size="lg" />
                </div>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && dashboard && (
                <>
                    <div className={styles.statsGrid}>
                        <StatCard
                            variant="success"
                            title="Ventas del mes"
                            value={formatCLP(dashboard.totalSoldMonth)}
                            subtitle={dashboard.currentPeriod}
                        />
                        <StatCard
                            variant="info"
                            title="IVA del mes"
                            value={formatCLP(dashboard.totalIvaMonth)}
                            subtitle="19% sobre ventas"
                        />
                        <StatCard
                            variant="warning"
                            title="Ganancia neta"
                            value={formatCLP(dashboard.totalProfitMonth)}
                            subtitle="81% sobre ventas"
                        />
                    </div>

                    <div className={styles.contentGrid}>
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Top productos del mes</h2>
                            {dashboard.topProducts.length === 0 ? (
                                <p className={styles.empty}>Sin datos este período</p>
                            ) : (
                                <ul className={styles.list}>
                                    {dashboard.topProducts.map((p, i) => (
                                        <li key={p.productId} className={styles.productItem}>
                                            <div className={styles.productHeader}>
                                                <span className={styles.rank}>#{i + 1}</span>
                                                <span className={styles.productName}>{p.productName}</span>
                                                <span className={styles.productRevenue}>{formatCLP(p.totalRevenue)}</span>
                                            </div>
                                            <p className={styles.productUnits}>{p.totalSold} unidades</p>
                                            <div className={styles.barTrack}>
                                                <div
                                                    className={styles.barFill}
                                                    style={{ width: `${(p.totalRevenue / maxRevenue) * 100}%` }}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Stock bajo</h2>
                            {lowStock.length === 0 ? (
                                <div className={styles.stockOk}>
                                    <Badge variant="success" text="Todo en orden" />
                                </div>
                            ) : (
                                <ul className={styles.list}>
                                    {lowStock.map(p => (
                                        <li key={p.id} className={styles.stockItem}>
                                            <div className={styles.stockHeader}>
                                                <span className={styles.stockName}>{p.name}</span>
                                                <Badge variant="danger" text="Stock bajo" />
                                            </div>
                                            <p className={styles.stockInfo}>
                                                Stock actual: {p.stock} | Mínimo: {p.minStock}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Reporte por período</h2>
                        <div className={styles.periodRow}>
                            <label className={styles.label} htmlFor="period">Período</label>
                            <input
                                id="period"
                                type="month"
                                className={styles.monthInput}
                                value={period}
                                onChange={e => setPeriod(e.target.value)}
                            />
                        </div>

                        {reportLoading ? (
                            <div className={styles.center}>
                                <Spinner size="md" />
                            </div>
                        ) : reportError ? (
                            <p className={styles.error}>{reportError}</p>
                        ) : report ? (
                            <div className={styles.statsGrid}>
                                <StatCard
                                    variant="success"
                                    title="Total vendido"
                                    value={formatCLP(report.totalSold)}
                                />
                                <StatCard
                                    variant="info"
                                    title="IVA"
                                    value={formatCLP(report.totalIva)}
                                />
                                <StatCard
                                    variant="warning"
                                    title="Ganancia neta"
                                    value={formatCLP(report.totalProfit)}
                                />
                            </div>
                        ) : (
                            <p className={styles.empty}>Sin datos para este período</p>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default ReportsPage
