/**
 * SalesPage class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 */
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/Store'
import { getSales } from '../../api/SaleApi'
import type { SaleResponse } from '../../api/SaleApi'
import { formatCLP } from '../../utils/formatters'
import SaleRow from '../../components/molecules/SaleRow/SaleRow'
import SaleRowSkeleton from '../../components/molecules/SaleRowSkeleton/SaleRowSkeleton'
import SaleDetailModal from '../../components/organisms/SaleDetailModal/SaleDetailModal'
import styles from './SalesPage.module.css'

type Period = 'today' | 'week' | 'month' | 'all'

const PERIODS: { value: Period; label: string }[] = [
    { value: 'today', label: 'Hoy' },
    { value: 'week',  label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'all',   label: 'Todas' },
]

const PAGE_SIZE     = 15
const SKELETON_COUNT = 8

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

const filterByPeriod = (sales: SaleResponse[], period: Period): SaleResponse[] => {
    if (period === 'all') return sales
    const now   = new Date()
    const today = startOfDay(now)
    return sales.filter((s) => {
        const d = new Date(s.date)
        if (period === 'today') return d >= today
        if (period === 'week') {
            const weekAgo = new Date(today)
            weekAgo.setDate(weekAgo.getDate() - 6)
            return d >= weekAgo
        }
        return d >= new Date(now.getFullYear(), now.getMonth(), 1)
    })
}

const SalesPage: React.FC = () => {
    const userId = useSelector((state: RootState) => state.user.id)

    const [sales,    setSales]    = useState<SaleResponse[]>([])
    const [loading,  setLoading]  = useState(true)
    const [error,    setError]    = useState<string | null>(null)
    const [selected, setSelected] = useState<SaleResponse | null>(null)
    const [period,   setPeriod]   = useState<Period>('all')
    const [page,     setPage]     = useState(1)

    useEffect(() => {
        if (!userId) return
        const load = async () => {
            try {
                setLoading(true)
                const data = await getSales(userId)
                setSales([...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
            } catch {
                setError('No se pudieron cargar las ventas.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [userId])

    const filtered    = useMemo(() => filterByPeriod(sales, period), [sales, period])
    const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const paginated   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    const periodTotal = filtered.reduce((acc, s) => acc + s.total, 0)

    const handlePeriod = (p: Period) => { setPeriod(p); setPage(1) }

    const rangeStart = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
    const rangeEnd   = Math.min(page * PAGE_SIZE, filtered.length)

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.title}>Ventas</h1>
                <p className={styles.subtitle}>Historial de todas tus ventas registradas.</p>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {/* Toolbar: filtros + resumen del período */}
            <div className={styles.toolbar}>
                <div className={styles.filterGroup}>
                    {PERIODS.map((p) => (
                        <button
                            key={p.value}
                            type="button"
                            className={`${styles.filterBtn} ${period === p.value ? styles.filterActive : ''}`}
                            onClick={() => handlePeriod(p.value)}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
                {!loading && !error && filtered.length > 0 && (
                    <p className={styles.periodSummary}>
                        {filtered.length} {filtered.length === 1 ? 'venta' : 'ventas'}
                        {' · '}
                        <span className={styles.periodTotal}>{formatCLP(periodTotal)}</span>
                    </p>
                )}
            </div>

            {/* Tabla */}
            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Fecha</th>
                            <th className={styles.th}>Hora</th>
                            <th className={styles.th}>Método</th>
                            <th className={`${styles.th} ${styles.right}`}>Total</th>
                            <th className={styles.th} />
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                                <SaleRowSkeleton key={i} />
                            ))
                            : paginated.map((sale) => (
                                <SaleRow
                                    key={sale.id}
                                    sale={sale}
                                    onClick={() => setSelected(sale)}
                                />
                            ))
                        }
                    </tbody>
                </table>

                {!loading && !error && paginated.length === 0 && (
                    <p className={styles.empty}>
                        {sales.length === 0
                            ? 'Aún no has registrado ventas.'
                            : 'No hay ventas en este período.'
                        }
                    </p>
                )}
            </div>

            {/* Paginación */}
            {!loading && totalPages > 1 && (
                <div className={styles.pagination}>
                    <p className={styles.paginationInfo}>
                        Mostrando {rangeStart}–{rangeEnd} de {filtered.length} ventas
                    </p>
                    <div className={styles.paginationControls}>
                        <button
                            type="button"
                            className={styles.pageBtn}
                            onClick={() => setPage((p) => p - 1)}
                            disabled={page === 1}
                        >
                            Anterior
                        </button>
                        <span className={styles.pageIndicator}>Página {page} de {totalPages}</span>
                        <button
                            type="button"
                            className={styles.pageBtn}
                            onClick={() => setPage((p) => p + 1)}
                            disabled={page === totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {selected && (
                <SaleDetailModal
                    sale={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    )
}

export default SalesPage
