/**
 * Sidebar class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, ShoppingCart, Package, BarChart3, DollarSign, PieChart, Store, Sparkles } from 'lucide-react'
import { useAppSelector } from '../../../app/hooks'
import styles from './Sidebar.module.css'

const NAV_GROUPS = [
    {
        groupLabel: 'PRINCIPAL',
        items: [
            { to: '/dashboard', label: 'Inicio', Icon: Home         },
            { to: '/pos', label: 'Punto de Venta', Icon: ShoppingCart },
        ],
    },
    {
        groupLabel: 'GESTIÓN',
        items: [
            { to: '/inventario', label: 'Inventario', Icon: Package   },
            { to: '/ventas', label: 'Ventas', Icon: BarChart3  },
            { to: '/finanzas', label: 'Finanzas', Icon: DollarSign },
            { to: '/reportes', label: 'Reportes', Icon: PieChart   },
        ],
    },
]

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    productCount: number
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, productCount }) => {
    const planType  = useAppSelector((s) => s.user.planType)
    const planLimit = useAppSelector((s) => s.user.planLimit)

    const limit = planLimit ?? 20
    const planLabel    = planType ? `Plan ${planType.charAt(0).toUpperCase()}${planType.slice(1).toLowerCase()}` : 'Plan Free'
    const progressPct  = Math.min((productCount / limit) * 100, 100)

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.logoArea}>
                <div className={styles.logoInner}>
                    <Store size={22} color="#34D399" />
                    <p className={styles.logo}>BarrioApp</p>
                </div>
            </div>

            <nav className={styles.nav} aria-label="Navegación principal">
                {NAV_GROUPS.map(({ groupLabel, items }) => (
                    <div key={groupLabel} className={styles.group}>
                        <p className={styles.groupLabel} aria-hidden="true">{groupLabel}</p>
                        {items.map(({ to, label, Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/dashboard'}
                                className={({ isActive }) =>
                                    [styles.link, isActive ? styles.linkActive : ''].filter(Boolean).join(' ')
                                }
                                onClick={onClose}
                            >
                                <span className={styles.linkIcon}>
                                    <Icon size={18} />
                                </span>
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>

            <div className={styles.planSection}>
                <div className={styles.planCard}>
                    <div className={styles.planCardHeader}>
                        <span className={styles.planName}>{planLabel}</span>
                        <span
                            className={styles.planCount}
                            aria-label={`${productCount} de ${limit} productos usados`}
                        >
                            {productCount}/{limit} productos
                        </span>
                    </div>
                    <div
                        className={styles.planBar}
                        role="progressbar"
                        aria-valuenow={productCount}
                        aria-valuemin={0}
                        aria-valuemax={limit}
                        aria-label={`${productCount} de ${limit} productos usados`}
                    >
                        <div className={styles.planBarFill} style={{ width: `${progressPct}%` }} />
                    </div>
                    <button className={styles.planUpgradeBtn} type="button">
                        <Sparkles size={14} />
                        <span>Mejorar plan</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
