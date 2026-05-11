/**
 * ProfileDropdown class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { PerfilIcon, LogoutIcon } from '../../atoms/icon/Icon'
import styles from './ProfileDropdown.module.css'

interface ProfileDropdownProps {
    userName: string
    companyName: string
    onLogout: () => void
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

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <button
                className={`${styles.iconBtn} ${open ? styles.iconBtnActive : ''}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Perfil"
            >
                <PerfilIcon size={22} />
            </button>

            {open && (
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
                        onClick={() => setOpen(false)}
                    >
                        <PerfilIcon size={16} />
                        Ver perfil
                    </NavLink>
                    <button className={styles.dropdownItemDanger} onClick={onLogout}>
                        <LogoutIcon size={16} />
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown
