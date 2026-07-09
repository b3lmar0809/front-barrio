/**
 *FinancePage class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ArrowUp, ArrowDown, Scale } from 'lucide-react'
import type { RootState } from '../../app/Store'
import {
    getFinances,
    getBalance,
    createFinance,
} from '../../api/FinanceApi'
import type { Finance, Balance } from '../../api/FinanceApi'
import Skeleton from '../../components/atoms/Skeleton/Skeleton'
import Badge from '../../components/atoms/Badge/Badge'
import KPICardSkeleton from '../../components/molecules/KPICardSkeleton/KPICardSkeleton'
import Button from '../../components/atoms/Button/Button'
import StatCard from '../../components/molecules/StatCard/StatCard'
import FormField from '../../components/molecules/FormField/FormField'
import { capitalize } from '../../utils/formatters'
import styles from './FinancePage.module.css'

const formatCLP = (v: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v)

const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

const FinancePage: React.FC = () => {
    const userId = useSelector((state: RootState) => state.user.id)

    const [finances, setFinances] = useState<Finance[]>([])
    const [balance,  setBalance]  = useState<Balance | null>(null)
    const [loading,  setLoading]  = useState(true)
    const [error,    setError]    = useState<string | null>(null)

    const [type,          setType]          = useState<'INCOME' | 'EXPENSE'>('INCOME')
    const [amount,        setAmount]        = useState('')
    const [displayAmount, setDisplayAmount] = useState('')
    const [description,   setDescription]   = useState('')
    const [formError,     setFormError]     = useState<string | null>(null)
    const [fieldErrors,   setFieldErrors]   = useState<{ amount?: string; description?: string }>({})
    const [submitting,    setSubmitting]    = useState(false)
    const [filter,        setFilter]        = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL')

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\./g, '')
        if (raw === '' || /^\d+$/.test(raw)) {
            setAmount(raw)
            setDisplayAmount(raw === '' ? '' : new Intl.NumberFormat('es-CL').format(Number(raw)))
        }
    }

    const loadData = async () => {
        if (!userId) return
        setLoading(true)
        setError(null)
        const [finResult, balResult] = await Promise.allSettled([
            getFinances(userId),
            getBalance(userId),
        ])
        if (finResult.status === 'fulfilled') {
            setFinances([...finResult.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
        } else {
            setError('No se pudieron cargar los movimientos.')
        }
        if (balResult.status === 'fulfilled') {
            setBalance(balResult.value)
        }
        setLoading(false)
    }

    useEffect(() => { loadData() }, [userId])

    const handleSubmit = async () => {
        const newFieldErrors: typeof fieldErrors = {}

        if (!amount) {
            newFieldErrors.amount = 'El monto es obligatorio'
        } else if (Number(amount) <= 0) {
            newFieldErrors.amount = 'El monto debe ser mayor a 0'
        }

        if (!description.trim()) {
            newFieldErrors.description = 'La descripción es obligatoria'
        } else if (description.trim().length < 3) {
            newFieldErrors.description = 'La descripción debe tener al menos 3 caracteres'
        }

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors)
            return
        }

        setFieldErrors({})
        if (!userId) return
        setFormError(null)
        setSubmitting(true)
        try {
            await createFinance({ userId, type, amount: Number(amount), description })
            setAmount('')
            setDisplayAmount('')
            setDescription('')
            await loadData()
        } catch {
            setFormError('Error al registrar el movimiento.')
        } finally {
            setSubmitting(false)
        }
    }

    const filteredFinances = filter === 'ALL'
        ? finances
        : finances.filter(f => f.type === filter)

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <h1 className={styles.title}>Finanzas</h1>
                <p className={styles.subtitle}>Ingresos, gastos y balance de tu negocio.</p>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {loading ? (
                <div className={styles.statsGrid}>
                    <KPICardSkeleton />
                    <KPICardSkeleton />
                    <KPICardSkeleton />
                </div>
            ) : !error && (
                <div className={styles.statsGrid}>
                    <StatCard
                        title="Ingresos"
                        value={formatCLP(balance?.totalIncome ?? 0)}
                        Icon={ArrowUp}
                        iconBg="#ECFDF5"
                        iconColor="#059669"
                        variant="success"
                        subtitle={balance?.period}
                    />
                    <StatCard
                        title="Gastos"
                        value={formatCLP(balance?.totalExpenses ?? 0)}
                        Icon={ArrowDown}
                        iconBg="#FEE2E2"
                        iconColor="#DC2626"
                        variant="danger"
                        subtitle={balance?.period}
                    />
                    <StatCard
                        title="Balance"
                        value={formatCLP(balance?.balance ?? 0)}
                        Icon={Scale}
                        iconBg="#EEF2FF"
                        iconColor="#4F46E5"
                        variant={(balance?.balance ?? 0) >= 0 ? 'success' : 'danger'}
                        subtitle="ingresos - gastos"
                    />
                </div>
            )}

            {!error && (
                <div className={styles.contentGrid}>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Registrar movimiento</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Tipo</label>
                            <div className={styles.typeToggle}>
                                <button
                                    type="button"
                                    className={`${styles.typeBtn} ${type === 'INCOME' ? styles.typeBtnIncome : ''}`}
                                    onClick={() => setType('INCOME')}
                                >
                                    <ArrowUp size={16} />
                                    Ingreso
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.typeBtn} ${type === 'EXPENSE' ? styles.typeBtnExpense : ''}`}
                                    onClick={() => setType('EXPENSE')}
                                >
                                    <ArrowDown size={16} />
                                    Gasto
                                </button>
                            </div>
                        </div>

                        <FormField
                            label="Monto"
                            name="amount"
                            type="text"
                            placeholder="Ej: 5.000"
                            value={displayAmount}
                            onChange={handleAmountChange}
                            required
                            error={fieldErrors.amount}
                        />

                        <FormField
                            label="Descripción"
                            name="description"
                            type="text"
                            placeholder="Ej: Pago de proveedor"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                            error={fieldErrors.description}
                        />

                        {formError && <p className={styles.formError}>{formError}</p>}

                        <Button
                            label="Registrar"
                            onClick={handleSubmit}
                            isLoading={submitting}
                            disabled={submitting}
                        />
                    </div>

                    <div className={styles.card}>
                        <div className={styles.movementsHeader}>
                            <h2 className={styles.cardTitle}>Movimientos</h2>
                            {!loading && (
                                <div className={styles.filterPills}>
                                    {(['ALL', 'INCOME', 'EXPENSE'] as const).map(f => (
                                        <button
                                            key={f}
                                            type="button"
                                            className={`${styles.filterPill} ${filter === f ? styles.filterPillActive : ''}`}
                                            onClick={() => setFilter(f)}
                                        >
                                            {f === 'ALL' ? 'Todos' : f === 'INCOME' ? 'Ingresos' : 'Gastos'}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <ul className={styles.list}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <li key={i} className={styles.item}>
                                        <div className={styles.itemTop}>
                                            <div className={styles.itemLeft}>
                                                <Skeleton width={60} height={22} className={styles.skeletonPill} />
                                                <Skeleton width={120} height={14} />
                                            </div>
                                            <Skeleton width={70} height={14} />
                                        </div>
                                        <Skeleton width={60} height={11} />
                                    </li>
                                ))}
                            </ul>
                        ) : filteredFinances.length === 0 ? (
                            <p className={styles.empty}>No hay movimientos registrados</p>
                        ) : (
                            <ul className={styles.list}>
                                {filteredFinances.map(f => (
                                    <li key={f.id} className={styles.item}>
                                        <div className={styles.itemTop}>
                                            <div className={styles.itemLeft}>
                                                <Badge
                                                    text={f.type === 'INCOME' ? 'Ingreso' : 'Gasto'}
                                                    variant={f.type === 'INCOME' ? 'success' : 'danger'}
                                                />
                                                <span className={styles.itemDesc}>{capitalize(f.description)}</span>
                                            </div>
                                            <span className={f.type === 'INCOME' ? styles.amountIncome : styles.amountExpense}>
                                                {formatCLP(f.amount)}
                                            </span>
                                        </div>
                                        <p className={styles.itemDate}>{formatDate(f.date)}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FinancePage
