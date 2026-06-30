/**
 * ProfilePage class
 *
 * @version 1.0.0 - 06 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 06 may. 2026
 *
 **/
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setUser } from '../../app/Store'
import { updateProfile } from '../../api/AuthApi'
import { getProducts } from '../../api/ProductApi'
import Input from '../../components/atoms/Input/Input'
import Button from '../../components/atoms/Button/Button'
import styles from './ProfilePage.module.css'

function getInitials(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean)
    if (words.length === 0) return '?'
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
    return (words[0][0] + words[1][0]).toUpperCase()
}

function getPlanLabel(planType: string): string {
    if (planType === 'PRO')   return 'Plan Pro'
    if (planType === 'BASIC') return 'Plan Basic'
    return 'Plan Free'
}

function getPlanBadgeClass(planType: string, s: typeof styles): string {
    if (planType === 'PRO')   return `${s.planBadge} ${s.badgePro}`
    if (planType === 'BASIC') return `${s.planBadge} ${s.badgeBasic}`
    return `${s.planBadge} ${s.badgeFree}`
}

const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch()
    const user     = useAppSelector((s) => s.user)

    // ── Tarjeta 1: Datos del negocio ─────────────────────────────────────────
    const [companyName, setCompanyName] = useState(user.companyName)
    const [saving,      setSaving]      = useState(false)
    const [saveError,   setSaveError]   = useState<string | null>(null)
    const [saveSuccess, setSaveSuccess] = useState(false)

    useEffect(() => {
        setCompanyName(user.companyName)
    }, [user.companyName])

    const handleSave = async () => {
        if (!companyName.trim()) {
            setSaveError('El nombre del negocio no puede estar vacío.')
            return
        }
        setSaving(true)
        setSaveError(null)
        setSaveSuccess(false)
        try {
            const updated = await updateProfile({ companyName: companyName.trim() })
            dispatch(setUser({
                id:          user.id,
                name:        user.name,
                email:       user.email,
                companyName: updated.companyName,
                rut:         user.rut,
                planType:    user.planType,
                planLimit:   user.planLimit,
                declaresIva: user.declaresIva,
            }))
            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), 3000)
        } catch {
            setSaveError('No se pudieron guardar los cambios. Intenta de nuevo.')
        } finally {
            setSaving(false)
        }
    }

    // ── Tarjeta 2: conteo de productos ───────────────────────────────────────
    const [productCount, setProductCount] = useState<number | null>(null)

    useEffect(() => {
        if (!user.id) return
        getProducts(user.id)
            .then((p) => setProductCount(p.length))
            .catch(() => {})
    }, [user.id])

    // ── Tarjeta 3: toggle IVA ────────────────────────────────────────────────
    const [toggling,     setToggling]     = useState(false)
    const [toggleError,  setToggleError]  = useState<string | null>(null)

    const handleToggleIva = async () => {
        const newValue = !user.declaresIva
        setToggling(true)
        setToggleError(null)
        try {
            const updated = await updateProfile({ declaresIva: newValue })
            dispatch(setUser({
                id:          user.id,
                name:        user.name,
                email:       user.email,
                companyName: user.companyName,
                rut:         user.rut,
                planType:    user.planType,
                planLimit:   user.planLimit,
                declaresIva: updated.declaresIva,
            }))
        } catch {
            setToggleError('No se pudo actualizar la configuración. Intenta de nuevo.')
        } finally {
            setToggling(false)
        }
    }

    // ── Datos derivados ──────────────────────────────────────────────────────
    const initials       = getInitials(user.companyName || '?')
    const planLabel      = getPlanLabel(user.planType)
    const planBadgeClass = getPlanBadgeClass(user.planType, styles)

    return (
        <div className={styles.page}>
            <h1 className={styles.pageTitle}>Mi perfil</h1>

            {/* CABECERA — identidad del negocio */}
            <div className={styles.header}>
                <div className={styles.avatar} aria-hidden="true">
                    {initials}
                </div>
                <div className={styles.headerInfo}>
                    <p className={styles.headerName}>{user.companyName}</p>
                    <p className={styles.headerEmail}>{user.email}</p>
                </div>
            </div>

            {/* TARJETA 1 — Datos del negocio */}
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Datos del negocio</h2>
                    <p className={styles.cardSubtitle}>Información de tu cuenta y negocio.</p>
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="companyName">
                        Nombre del negocio
                    </label>
                    <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => { setCompanyName(e.target.value); setSaveError(null) }}
                        placeholder="Nombre de tu negocio"
                    />
                </div>

                <div className={styles.twoCol}>
                    <div className={`${styles.field} ${styles.readOnly}`}>
                        <label className={styles.label} htmlFor="rut">RUT</label>
                        <Input
                            id="rut"
                            value={user.rut}
                            onChange={() => {}}
                            disabled
                        />
                    </div>
                    <div className={`${styles.field} ${styles.readOnly}`}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <Input
                            id="email"
                            value={user.email}
                            onChange={() => {}}
                            disabled
                        />
                    </div>
                </div>

                {saveError   && <p className={styles.error}>{saveError}</p>}
                {saveSuccess && <p className={styles.success}>Cambios guardados correctamente.</p>}

                <div className={styles.saveRow}>
                    <Button
                        label="Guardar cambios"
                        variant="primary"
                        onClick={handleSave}
                        disabled={saving}
                        isLoading={saving}
                    />
                </div>
            </section>

            {/* TARJETA 2 — Plan actual */}
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Plan actual</h2>
                    <p className={styles.cardSubtitle}>Tu plan y límites.</p>
                </div>

                <div className={styles.planRow}>
                    <span className={planBadgeClass}>{planLabel}</span>
                    <p className={styles.planUsage}>
                        <strong>{productCount !== null ? productCount : '—'}</strong>
                        {' '}de{' '}
                        <strong>{user.planLimit ?? '∞'}</strong>
                        {' '}productos usados
                    </p>
                </div>

                <div>
                    <button className={styles.upgradeBtn} type="button">
                        Mejorar plan
                    </button>
                </div>
            </section>

            {/* TARJETA 3 — Configuración fiscal */}
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Configuración fiscal</h2>
                    <p className={styles.cardSubtitle}>
                        Activa esto solo si tu negocio declara IVA ante el SII.
                    </p>
                </div>

                <div className={styles.fiscalRow}>
                    <div className={styles.fiscalText}>
                        <p className={styles.fiscalLabel}>Mi negocio declara IVA (Ley 825)</p>
                        <p className={styles.fiscalDesc}>
                            Si está activo, se mostrará el desglose de IVA en ventas y reportes.
                        </p>
                    </div>
                    <button
                        role="switch"
                        aria-checked={user.declaresIva}
                        aria-label="Declarar IVA"
                        className={`${styles.toggle} ${user.declaresIva ? styles.toggleOn : ''}`}
                        onClick={handleToggleIva}
                        disabled={toggling}
                        type="button"
                    >
                        <span className={styles.toggleKnob} />
                    </button>
                </div>

                {toggleError && <p className={styles.error}>{toggleError}</p>}
            </section>
        </div>
    )
}

export default ProfilePage
