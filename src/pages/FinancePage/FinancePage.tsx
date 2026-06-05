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
import type { RootState } from '../../app/Store'
import {
    getFinances,
    getBalance,
    createFinance,
} from '../../api/FinanceApi'
import type { Finance, Balance } from '../../api/FinanceApi'
import Spinner from '../../components/atoms/Spinner/Spinner'
import Badge from '../../components/atoms/Badge/Badge'
import Button from '../../components/atoms/Button/Button'
import StatCard from '../../components/molecules/StatCard/StatCard'
import FormField from '../../components/molecules/FormField/FormField'
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

    const [type,        setType]        = useState<'INCOME' | 'EXPENSE'>('INCOME')
    const [amount,      setAmount]      = useState('')
    const [description, setDescription] = useState('')
    const [formError,   setFormError]   = useState<string | null>(null)
    const [submitting,  setSubmitting]  = useState(false)

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
        if (!amount || !description) {
            setFormError('Completa todos los campos.')
            return
        }
        if (!userId) return
        setFormError(null)
        setSubmitting(true)
        try {
            await createFinance({ userId, type, amount: Number(amount), description })
            setAmount('')
            setDescription('')
            await loadData()
        } catch {
            setFormError('Error al registrar el movimiento.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Finanzas</h1>

            {loading && (
                <div className={styles.center}>
                    <Spinner size="lg" />
                </div>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && (
                <>
                    <div className={styles.statsGrid}>
                        <StatCard
                            variant="success"
                            title="Ingresos"
                            value={formatCLP(balance?.totalIncome ?? 0)}
                            subtitle={balance?.period}
                        />
                        <StatCard
                            variant="danger"
                            title="Gastos"
                            value={formatCLP(balance?.totalExpense ?? 0)}
                            subtitle={balance?.period}
                        />
                        <StatCard
                            variant={(balance?.balance ?? 0) >= 0 ? 'success' : 'danger'}
                            title="Balance"
                            value={formatCLP(balance?.balance ?? 0)}
                            subtitle="ingresos - gastos"
                        />
                    </div>

                    <div className={styles.contentGrid}>
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Registrar movimiento</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label} htmlFor="type">Tipo</label>
                                <select
                                    id="type"
                                    className={styles.select}
                                    value={type}
                                    onChange={e => setType(e.target.value as 'INCOME' | 'EXPENSE')}
                                >
                                    <option value="INCOME">Ingreso</option>
                                    <option value="EXPENSE">Gasto</option>
                                </select>
                            </div>

                            <FormField
                                label="Monto"
                                name="amount"
                                type="number"
                                placeholder="Ej: 5000"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                required
                            />

                            <FormField
                                label="Descripción"
                                name="description"
                                type="text"
                                placeholder="Ej: Pago de proveedor"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
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
                            <h2 className={styles.cardTitle}>Movimientos</h2>

                            {finances.length === 0 ? (
                                <p className={styles.empty}>No hay movimientos registrados</p>
                            ) : (
                                <ul className={styles.list}>
                                    {finances.map(f => (
                                        <li key={f.id} className={styles.item}>
                                            <div className={styles.itemTop}>
                                                <div className={styles.itemLeft}>
                                                    <Badge
                                                        text={f.type === 'INCOME' ? 'Ingreso' : 'Gasto'}
                                                        variant={f.type === 'INCOME' ? 'success' : 'danger'}
                                                    />
                                                    <span className={styles.itemDesc}>{f.description}</span>
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
                </>
            )}
        </div>
    )
}

export default FinancePage
