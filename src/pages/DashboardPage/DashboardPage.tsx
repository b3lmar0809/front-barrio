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
import { formatCLP, formatMonthYear } from '../../utils/formatters'
import { useAppSelector } from '../../app/hooks'
import { Wallet, Receipt, TrendingUp, AlertTriangle, ShoppingCart, Package, BarChart3 } from 'lucide-react'
import StatCard from '../../components/molecules/StatCard/StatCard'
import TopProductsTable from '../../components/organisms/TopProductsTable/TopProductsTable'
import KPICardSkeleton from '../../components/molecules/KPICardSkeleton/KPICardSkeleton'
import ProductListSkeleton from '../../components/molecules/ProductListSkeleton/ProductListSkeleton'
import QuickAccessSkeleton from '../../components/molecules/QuickAccessSkeleton/QuickAccessSkeleton'
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
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Dashboard</h1>
            </div>

            {loading && (
                <>
                    <section className={styles.statsGrid} aria-label="Métricas del mes">
                        <KPICardSkeleton />
                        <KPICardSkeleton />
                        <KPICardSkeleton />
                        <KPICardSkeleton />
                    </section>

                    <div className={styles.bottomGrid}>
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Productos más vendidos</h2>
                            <ProductListSkeleton rows={5} />
                        </section>

                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Accesos rápidos</h2>
                            <QuickAccessSkeleton />
                        </section>
                    </div>
                </>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && dashboard && (
                <>
                    <section className={styles.statsGrid} aria-label="Métricas del mes">
                        <StatCard
                            title="Total vendido"
                            value={formatCLP(dashboard.totalSoldMonth)}
                            Icon={Wallet}
                            iconBg="#ECFDF5"
                            iconColor="#059669"
                            period={formatMonthYear(dashboard.currentPeriod)}
                        />
                        <StatCard
                            title="IVA del mes"
                            value={formatCLP(dashboard.totalIvaMonth)}
                            Icon={Receipt}
                            iconBg="#EEF2FF"
                            iconColor="#4F46E5"
                            period={formatMonthYear(dashboard.currentPeriod)}
                        />
                        <StatCard
                            title="Ganancia neta"
                            value={formatCLP(dashboard.totalProfitMonth)}
                            Icon={TrendingUp}
                            iconBg="#F0FDFA"
                            iconColor="#0D9488"
                            period={formatMonthYear(dashboard.currentPeriod)}
                        />
                        <StatCard
                            title="Stock bajo"
                            value={dashboard.lowStockCount}
                            Icon={AlertTriangle}
                            iconBg="#FEF3C7"
                            iconColor="#D97706"
                            suffix="productos"
                        />
                    </section>

                    <div className={styles.bottomGrid}>
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Productos más vendidos</h2>
                            <TopProductsTable products={topProducts} />
                        </section>

                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Accesos rápidos</h2>
                            <div className={styles.quickAccess}>
                                <button
                                    className={`${styles.qaBtn} ${styles.qaBtnPrimary}`}
                                    onClick={() => navigate('/pos')}
                                    aria-label="Ir al Punto de Venta"
                                >
                                    <ShoppingCart size={16} />
                                    <span>Ir al Punto de Venta</span>
                                </button>
                                <button
                                    className={styles.qaBtn}
                                    onClick={() => navigate('/inventario')}
                                    aria-label="Ver inventario"
                                >
                                    <Package size={16} color="#059669" />
                                    <span>Ver inventario</span>
                                </button>
                                <button
                                    className={styles.qaBtn}
                                    onClick={() => navigate('/reportes')}
                                    aria-label="Ver reportes"
                                >
                                    <BarChart3 size={16} color="#059669" />
                                    <span>Ver reportes</span>
                                </button>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </div>
    )
}

export default DashboardPage
