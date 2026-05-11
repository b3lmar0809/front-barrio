/**
 *DashboardPage class
 *
 * @version 1.0.1 - 07 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDashboard, getTopProducts } from '../../api/ReportApi'
import type { Dashboard, ProductStats } from '../../api/ReportApi'
import { formatCLP, formatDate } from '../../utils/formatters'
import { useAppSelector } from '../../app/hooks'
import StatCard from '../../components/molecules/StatCard/StatCard'
import TopProductsTable from '../../components/organisms/TopProductsTable/TopProductsTable'
import Spinner from '../../components/atoms/Spinner/Spinner'
import Button from '../../components/atoms/Button/Button'
import styles from './DashboardPage.module.css'

const DashboardPage: React.FC = () => {
    const userId   = useAppSelector((s) => s.user.id)
    const navigate = useNavigate()

    const [dashboard,   setDashboard]   = useState<Dashboard | null>(null)
    const [topProducts, setTopProducts] = useState<ProductStats[]>([])
    const [loading,     setLoading]     = useState(true)
    const [error,       setError]       = useState<string | null>(null)

    useEffect(() => {
        if (!userId) return
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const [dash, tops] = await Promise.all([
                    getDashboard(userId),
                    getTopProducts(userId, 'monthly'),
                ])
                setDashboard(dash)
                setTopProducts(tops.slice(0, 5))
            } catch {
                setError('No se pudo cargar el dashboard. Intenta de nuevo.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [userId])

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <p className={styles.subtitle}>
                    {formatDate(new Date().toISOString())}
                </p>
            </div>

            {loading && (
                <div className={styles.center}>
                    <Spinner size="lg" />
                </div>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && dashboard && (
                <>
                    {/* Sección 1 — StatCards */}
                    <section className={styles.statsGrid}>
                        <StatCard
                            title="Total vendido"
                            value={formatCLP(dashboard.totalSoldMonth)}
                            subtitle={dashboard.currentPeriod}
                            variant="success"
                        />
                        <StatCard
                            title="IVA del mes"
                            value={formatCLP(dashboard.totalIvaMonth)}
                            subtitle={dashboard.currentPeriod}
                            variant="info"
                        />
                        <StatCard
                            title="Ganancia neta"
                            value={formatCLP(dashboard.totalProfitMonth)}
                            subtitle={dashboard.currentPeriod}
                            variant="success"
                        />
                        <StatCard
                            title="Stock bajo"
                            value={dashboard.lowStockCount}
                            subtitle="productos"
                            variant={dashboard.lowStockCount > 0 ? 'danger' : 'warning'}
                        />
                    </section>

                    {/* Sección 2 — Top productos */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Productos más vendidos este mes</h2>
                        <TopProductsTable products={topProducts} />
                    </section>

                    {/* Sección 3 — Accesos rápidos */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Accesos rápidos</h2>
                        <div className={styles.quickAccess}>
                            <Button
                                label="Ir al POS"
                                variant="primary"
                                onClick={() => navigate('/pos')}
                            />
                            <Button
                                label="Ver inventario"
                                variant="secondary"
                                onClick={() => navigate('/inventario')}
                            />
                            <Button
                                label="Ver reportes"
                                variant="secondary"
                                onClick={() => navigate('/reportes')}
                            />
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}

export default DashboardPage
