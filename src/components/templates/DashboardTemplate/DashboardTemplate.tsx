/**
 * DashboardTemplate class
 * @Version: 1.0.0 - 06 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    HomeIcon, PosIcon, InventoryIcon, SalesIcon, FinanceIcon, ReportsIcon,
    AjustesIcon, NotificacionesIcon, PerfilIcon, MenuIcon, LogoutIcon,
} from '../../atoms/icon/Icon'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { clearUser } from '../../../app/Store'
import styles from './DashboardTemplate.module.css'

const NAV_LINKS = [
    { to: '/dashboard',  label: 'Inicio',         icon: HomeIcon      },
    { to: '/pos',        label: 'Punto de Venta', icon: PosIcon       },
    { to: '/inventario', label: 'Inventario',     icon: InventoryIcon },
    { to: '/ventas',     label: 'Ventas',         icon: SalesIcon     },
    { to: '/finanzas',   label: 'Finanzas',       icon: FinanceIcon   },
    { to: '/reportes',   label: 'Reportes',       icon: ReportsIcon   },
]

interface DashboardTemplateProps {
    children: React.ReactNode
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ children }) => {
    const dispatch    = useAppDispatch()
    const navigate    = useNavigate()
    const companyName = useAppSelector((s) => s.user.companyName)
    const userName    = useAppSelector((s) => s.user.name)

    const [sidebarOpen,  setSidebarOpen]  = useState(false)
    const [profileOpen,  setProfileOpen]  = useState(false)
    const profileRef = useRef<HTMLDivElement>(null)

    //cierra el dropdown al hacer click fuera
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleLogout = () => {
        dispatch(clearUser())
        navigate('/login')
    }

    return (
        <div className={styles.layout}>
            {/*sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarLogo}>
                    Barrio<span>App</span>
                </div>
                <nav className={styles.nav}>
                    {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/dashboard'}
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            <Icon size={18} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Ajustes — fondo del sidebar */}
                <NavLink
                    to="/ajustes"
                    className={({ isActive }) =>
                        `${styles.sidebarSettingsBtn} ${isActive ? styles.navLinkActive : ''}`
                    }
                    onClick={() => setSidebarOpen(false)}
                >
                    <AjustesIcon size={18} />
                    Ajustes
                </NavLink>
            </aside>

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main */}
            <div className={styles.main}>
                {/* Navbar */}
                <header className={styles.navbar}>
                    <button
                        className={styles.menuBtn}
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Abrir menú"
                    >
                        <MenuIcon size={22} />
                    </button>

                    <span className={styles.navCompany}>{companyName}</span>

                    <div className={styles.navActions}>
                        {/* Notificaciones */}
                        <NavLink
                            to="/notificaciones"
                            className={({ isActive }) =>
                                `${styles.iconBtn} ${isActive ? styles.iconBtnActive : ''}`
                            }
                            aria-label="Notificaciones"
                        >
                                    <NotificacionesIcon size={20} />
                        </NavLink>

                        {/* Perfil dropdown */}
                        <div className={styles.profileWrapper} ref={profileRef}>
                            <button
                                className={`${styles.iconBtn} ${profileOpen ? styles.iconBtnActive : ''}`}
                                onClick={() => setProfileOpen((prev) => !prev)}
                                aria-label="Perfil"
                            >
                                <PerfilIcon size={22} />
                            </button>

                            {profileOpen && (
                                <div className={styles.dropdown}>
                                    <div className={styles.dropdownHeader}>
                                        <PerfilIcon size={32} className={styles.dropdownAvatar} />
                                        <div>
                                            <p className={styles.dropdownName}>{userName}</p>
                                            <p className={styles.dropdownCompany}>{companyName}</p>
                                        </div>
                                    </div>
                                    <hr className={styles.dropdownDivider} />
                                    <NavLink
                                        to="/perfil"
                                        className={styles.dropdownItem}
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <PerfilIcon size={16} />
                                        Ver perfil
                                    </NavLink>
                                    <button className={styles.dropdownItemDanger} onClick={handleLogout}>
                                        <LogoutIcon size={16} />
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardTemplate