/**
 * Navbar class
 * @Version: 1.0.0 - 10 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 10 may. 2026
 */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Calendar, Plus, Bell } from 'lucide-react'
import { useAppSelector } from '../../../app/hooks'
import { getUnreadCount } from '../../../api/NotificationApi'
import ProfileDropdown from '../../molecules/ProfileDropdown/ProfileDropdown'
import styles from './Navbar.module.css'

interface NavbarProps {
    companyName: string
    userName: string
    onMenuClick: () => void
    onLogout: () => void
}

const getFirstName = (fullName: string): string =>
    fullName.trim().split(/\s+/)[0] || ''

const getFormattedDate = (): string => {
    const raw = new Date().toLocaleDateString('es-CL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    return raw.charAt(0).toUpperCase() + raw.slice(1)
}

const Navbar: React.FC<NavbarProps> = ({ companyName, userName, onMenuClick, onLogout }) => {
    const navigate = useNavigate()
    const userId = useAppSelector((s) => s.user.id)
    const [unreadCount, setUnreadCount] = useState(0)

    const firstName = getFirstName(userName)
    const formattedDate = getFormattedDate()

    useEffect(() => {
        if (!userId) return
        getUnreadCount(userId)
            .then(setUnreadCount)
            .catch(() => setUnreadCount(0))
    }, [userId])

    return (
        <header className={styles.navbar}>
            <div className={styles.left}>
                <button
                    className={styles.menuBtn}
                    onClick={onMenuClick}
                    aria-label="Abrir menú"
                >
                    <Menu size={20} />
                </button>
                <div className={styles.greeting}>
                    <p className={styles.greetingText}>
                        ¡Hola{firstName ? `, ${firstName}` : ' de nuevo'}!
                    </p>
                    <p className={styles.greetingDate}>
                        <Calendar size={12} />
                        {formattedDate}
                    </p>
                </div>
            </div>

            <div className={styles.right}>
                <button
                    className={styles.newSaleBtn}
                    onClick={() => navigate('/pos')}
                    aria-label="Nueva venta"
                >
                    <Plus size={15} />
                    <span className={styles.newSaleBtnText}>Nueva venta</span>
                </button>

                <div className={styles.bellWrapper}>
                    <button className={styles.iconCircle} aria-label="Notificaciones">
                        <Bell size={18} />
                    </button>
                    {unreadCount > 0 && (
                        <span
                            className={styles.badge}
                            aria-label={`${unreadCount} notificaciones no leídas`}
                        >
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </div>

                <ProfileDropdown
                    userName={userName}
                    companyName={companyName}
                    onLogout={onLogout}
                />
            </div>
        </header>
    )
}

export default Navbar
