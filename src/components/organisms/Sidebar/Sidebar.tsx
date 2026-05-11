/**
 * Sidebar class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    HomeIcon, PosIcon, InventoryIcon, SalesIcon, FinanceIcon, ReportsIcon, AjustesIcon,
} from '../../atoms/icon/Icon'
import styles from './Sidebar.module.css'

const NAV_LINKS = [
    { to: '/dashboard',  label: 'Inicio',         icon: HomeIcon      },
    { to: '/pos',        label: 'Punto de Venta', icon: PosIcon       },
    { to: '/inventario', label: 'Inventario',     icon: InventoryIcon },
    { to: '/ventas',     label: 'Ventas',         icon: SalesIcon     },
    { to: '/finanzas',   label: 'Finanzas',       icon: FinanceIcon   },
    { to: '/reportes',   label: 'Reportes',       icon: ReportsIcon   },
]

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
            Barrio<span>App</span>
        </div>
        <nav className={styles.nav}>
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={to === '/dashboard'}
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.linkActive : ''}`
                    }
                    onClick={onClose}
                >
                    <Icon size={18} />
                    {label}
                </NavLink>
            ))}
        </nav>
        <NavLink
            to="/ajustes"
            className={({ isActive }) =>
                `${styles.settingsBtn} ${isActive ? styles.linkActive : ''}`
            }
            onClick={onClose}
        >
            <AjustesIcon size={18} />
            Ajustes
        </NavLink>
    </aside>
)

export default Sidebar
