/**
 * StatCard class
 * @Version: 1.0.0 - 06 may. 2026
 * @Author: Matias Belmar - mati.belmar0625@gmail.com
 * @Since: 1.0.0 - 06 may. 2026
 */
import React from 'react'
import styles from './StatCard.module.css'

interface StatCardProps {
    title: string
    value: string | number
    subtitle?: string
    variant?: 'success' | 'warning' | 'danger' | 'info'
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    subtitle,
    variant = 'info',
}) => {
    return (
        <div className={`${styles.card} ${styles[variant]}`}>
            <p className={styles.title}>{title}</p>
            <p className={styles.value}>{value}</p>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
    )
}

export default StatCard
