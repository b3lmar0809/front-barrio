/**
 * ProfileDropdown class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { User, Settings, Sparkles, LogOut } from 'lucide-react'
import styles from './ProfileDropdown.module.css'

interface ProfileDropdownProps {
    userName: string
    companyName: string
    onLogout: () => void
}

const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return '?'
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ userName, companyName, onLogout }) => {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const displayName = companyName || userName || ''
    const initials = getInitials(displayName)

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <button
                className={`${styles.avatarBtn} ${open ? styles.avatarBtnActive : ''}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Menú de usuario"
                aria-haspopup="true"
                aria-expanded={open}
            >
                {initials}
            </button>

            {open && (
                <div className={styles.dropdown} role="menu" aria-label="Opciones de usuario">
                    <div className={styles.header}>
                        <div className={styles.headerAvatar} aria-hidden="true">{initials}</div>
                        <div className={styles.headerInfo}>
                            <p className={styles.headerName}>{userName}</p>
                            <p className={styles.headerCompany}>{companyName}</p>
                        </div>
                    </div>

                    <div className={styles.group} role="group">
                        <NavLink
                            to="/perfil"
                            className={styles.item}
                            onClick={() => setOpen(false)}
                            role="menuitem"
                        >
                            <User size={16} />
                            Ver perfil
                        </NavLink>
                        <button className={styles.item} role="menuitem" aria-label="Ajustes">
                            <Settings size={16} />
                            Ajustes
                        </button>
                        <button className={`${styles.item} ${styles.itemHighlight}`} role="menuitem" aria-label="Mejorar plan">
                            <Sparkles size={16} />
                            Mejorar plan
                        </button>
                    </div>

                    <div className={styles.groupBottom} role="group">
                        <button
                            className={`${styles.item} ${styles.itemDanger}`}
                            onClick={onLogout}
                            role="menuitem"
                            aria-label="Cerrar sesión"
                        >
                            <LogOut size={16} />
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown
