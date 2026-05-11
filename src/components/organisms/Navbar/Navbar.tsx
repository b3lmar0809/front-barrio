/**
 * Navbar class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuIcon, NotificacionesIcon } from '../../atoms/icon/Icon'
import ProfileDropdown from '../../molecules/ProfileDropdown/ProfileDropdown'
import styles from './Navbar.module.css'

interface NavbarProps {
    companyName: string
    userName: string
    onMenuClick: () => void
    onLogout: () => void
}

const Navbar: React.FC<NavbarProps> = ({ companyName, userName, onMenuClick, onLogout }) => (
    <header className={styles.navbar}>
        <button
            className={styles.menuBtn}
            onClick={onMenuClick}
            aria-label="Abrir menú"
        >
            <MenuIcon size={22} />
        </button>

        <span className={styles.company}>{companyName}</span>

        <div className={styles.actions}>
            <NavLink
                to="/notificaciones"
                className={({ isActive }) =>
                    `${styles.iconBtn} ${isActive ? styles.iconBtnActive : ''}`
                }
                aria-label="Notificaciones"
            >
                <NotificacionesIcon size={20} />
            </NavLink>

            <ProfileDropdown
                userName={userName}
                companyName={companyName}
                onLogout={onLogout}
            />
        </div>
    </header>
)

export default Navbar
